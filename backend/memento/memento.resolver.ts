import { Resolver, Query, ResolveProperty, Parent } from "@nestjs/graphql";
import { MementoService } from "./memento.service";
import { Mutation, Args } from "@nestjs/graphql";
import { UseGuards, Logger, Inject } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Memento } from "./dto/memento.dto";
import { User } from "../user/dto/user.dto";
import { FamilyMemberGuard } from "../auth/guards/family-member.guard";
import { CreateMementoInput } from "./inputs/memento.inputs";
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

  @Mutation(returns => Memento)
  @UseGuards(JwtAuthGuard, FamilyMemberGuard)
  async createMemento(
    @CurrentUser() user: User,
    @Args("input") input: CreateMementoInput,
  ) {
    return this.mementoService.createMemento(user, input);
  }

  @Query(returns => [Memento], { name: "mementos" })
  @UseGuards(JwtAuthGuard, FamilyMemberGuard)
  async getMementos(
    @Args({ name: "familyId", type: () => ID }) familyId: string,
    @Args({ name: "lastId", type: () => ID, nullable: true }) lastId?: string,
    @Args({ name: "tags", type: () => [String], nullable: true })
    tags?: string[],
  ): Promise<Memento[]> {
    // TODO: pagination
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

  @ResolveProperty("family", returns => Family)
  async resolveFamily(@Parent() { mementoId }: Memento): Promise<Family> {
    // TODO: use dataloader pattern as re-fetching is inefficient
    const memento = await this.mementoLoaderById.load(mementoId);
    const family = await this.familyLoaderById.load(
      memento.inFamily.toHexString(),
    );
    return family.toDTO();
  }

  @ResolveProperty("uploader", returns => User)
  async resolveUploader(@Parent() { mementoId }: Memento): Promise<User> {
    const memento = await this.mementoLoaderById.load(mementoId);
    const user = await this.userLoaderById.load(
      memento.uploadedBy.toHexString(),
    );
    return user.toDTO();
  }
}
