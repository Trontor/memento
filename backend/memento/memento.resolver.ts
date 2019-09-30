import { Resolver, Query, ResolveProperty, Parent } from "@nestjs/graphql";
import { MementoService } from "./memento.service";
import { Mutation, Args } from "@nestjs/graphql";
import { UseGuards, Logger, Inject } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Memento } from "./dto/memento.dto";
import { User } from "../user/dto/user.dto";
import { FamilyMemberGuard } from "../auth/guards/family-member.guard";
import {
  CreateMementoInput,
  UpdateMementoInput,
} from "./inputs/memento.inputs";
import { Family } from "../family/dto/family.dto";
import { MementoDocument } from "./schema/memento.schema";

import {
  FAMILY_LOADER_BY_ID,
  FamilyDataLoaderById,
} from "../family/family.dataloader";
import { USER_LOADER_BY_ID, UserDataLoaderById } from "../user/user.dataloader";
import {
  MEMENTO_LOADER_BY_ID,
  MementoDataLoaderById,
} from "./memento.dataloader";
import { ID } from "type-graphql";
import { UpdateMementoGuard } from "./guards/update-memento.guard";
import { ReadMementoGuard } from "./guards/read-memento.guard";

/**
 * Resolves GraphQL mutations and queries related to Mementos.
 */
@Resolver(Memento)
export class MementoResolver {
  private readonly logger = new Logger(MementoResolver.name);

  constructor(
    private readonly mementoService: MementoService,
    @Inject(MEMENTO_LOADER_BY_ID)
    private readonly mementoLoaderById: MementoDataLoaderById,
    @Inject(FAMILY_LOADER_BY_ID)
    private readonly familyLoaderById: FamilyDataLoaderById,
    @Inject(USER_LOADER_BY_ID)
    private readonly userLoaderById: UserDataLoaderById,
  ) {}

  /**
   * Creates a new Memento.
   *
   * @param user current logged in user
   * @param input fields to create memento
   */
  @Mutation(returns => Memento)
  @UseGuards(JwtAuthGuard, FamilyMemberGuard)
  async createMemento(
    @CurrentUser() user: User,
    @Args("input") input: CreateMementoInput,
  ) {
    return this.mementoService.createMemento(user, input);
  }

  /**
   * Updates a Memento.
   *
   * @param user current logged in user
   * @param input input to update an existing memento
   */
  @Mutation(returns => Memento)
  @UseGuards(JwtAuthGuard, UpdateMementoGuard)
  async updateMemento(@Args("input") input: UpdateMementoInput) {
    const memento = await this.mementoService.updateMemento(input);
    this.mementoLoaderById.clear(memento.mementoId);
    this.logger.debug(memento);
    return memento;
  }

  /**
   * Fetches an existing Memento by its `id`.
   *
   * @param user current logged in user
   * @param mementoId id of memento
   */
  @Query(returns => Memento, { name: "memento" })
  @UseGuards(JwtAuthGuard, ReadMementoGuard)
  async getMemento(
    @Args({ name: "mementoId", type: () => ID }) mementoId: string,
  ) {
    const memento = await this.mementoLoaderById.load(mementoId);
    this.logger.debug(memento);
    return memento.toDTO();
  }

  /**
   * Fetches and optionally filters a family's Mementos.
   * The responses are paginated using `ObjectId`.
   *
   * @param familyId the id of the family whose Mementos need to be fetched
   * @param lastId (optional) id the last Memento in the previous page of results
   * @param tags (optional) filter by array of strings
   */
  @Query(returns => [Memento], { name: "mementos" })
  @UseGuards(JwtAuthGuard, FamilyMemberGuard)
  async getMementos(
    @Args({ name: "familyId", type: () => ID }) familyId: string,
    @Args({ name: "lastId", type: () => ID, nullable: true }) lastId?: string,
    @Args({ name: "tags", type: () => [String], nullable: true })
    tags?: string[],
  ): Promise<Memento[]> {
    const mementos: MementoDocument[] = await this.mementoService.getAllFamilyMementos(
      familyId,
      tags,
      lastId,
    );
    this.logger.log(
      `Retrieved ${mementos.length} mementos for family ${familyId}`,
    );
    // cache mementos in the memento dataloader for use in:
    // - resolveFamily
    // - resolveUploader
    mementos.forEach(m => this.mementoLoaderById.prime(m.mementoId, m));
    return mementos.map(m => m.toDTO());
  }

  /**
   * Resolves a nested query on the `family` property.
   */
  @ResolveProperty("family", returns => Family)
  async resolveFamily(@Parent() { mementoId }: Memento): Promise<Family> {
    // TODO: use dataloader pattern as re-fetching is inefficient
    const memento = await this.mementoLoaderById.load(mementoId);
    const family = await this.familyLoaderById.load(
      memento.inFamily.toHexString(),
    );
    return family.toDTO();
  }

  /**
   * Resolves a nested query on the `uploader` property.
   */
  @ResolveProperty("uploader", returns => User)
  async resolveUploader(@Parent() { mementoId }: Memento): Promise<User> {
    const memento = await this.mementoLoaderById.load(mementoId);
    const user = await this.userLoaderById.load(
      memento.uploadedBy.toHexString(),
    );
    return user.toDTO();
  }

  /**
   * Creates a new user bookmark on a Memento.
   *
   * @param user user creating the new bookmark
   * @param mementoId id of memento being bookmarked
   */
  @Mutation(returns => Memento, { name: "bookmark" })
  @UseGuards(JwtAuthGuard, ReadMementoGuard)
  async createBookmark(
    @CurrentUser() user: User,
    @Args({ name: "mementoId", type: () => ID }) mementoId: string,
  ) {
    const { memento, user: userDoc } = await this.mementoService.createBookmark(
      user,
      mementoId,
    );
    this.logger.debug(memento);
    this.logger.debug(userDoc);
    this.mementoLoaderById.clear(mementoId).prime(mementoId, memento);
    this.userLoaderById.clear(user.userId).prime(user.userId, userDoc);
    return memento.toDTO();
  }

  @Mutation(returns => Memento, { name: "deleteBookmark" })
  @UseGuards(JwtAuthGuard, ReadMementoGuard)
  async deleteBookmark(
    @CurrentUser() user: User,
    @Args({ name: "mementoId", type: () => ID }) mementoId: string,
  ) {
    const { memento, user: userDoc } = await this.mementoService.deleteBookmark(
      user,
      mementoId,
    );
    this.mementoLoaderById.clear(mementoId).prime(mementoId, memento);
    this.userLoaderById.clear(user.userId).prime(user.userId, userDoc);
    return memento.toDTO();
  }

  /**
   * Resolves the `bookmarkedBy` property on a `Memento`.
   */
  @ResolveProperty("bookmarkedBy", returns => [User])
  async resolveBookmarkedBy(@Parent() { mementoId }: Memento) {
    const memento = await this.mementoLoaderById.load(mementoId);
    this.logger.debug(memento);
    const users = await this.userLoaderById.loadMany(
      memento._bookmarkedBy.map(id => id.toHexString()),
    );
    return users.map(doc => doc.toDTO());
  }
}
