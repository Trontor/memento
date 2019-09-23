import { Resolver, Query, ResolveProperty, Parent } from "@nestjs/graphql";
import { MementoService } from "./memento.service";
import { Mutation, Args } from "@nestjs/graphql";
import { UseGuards, Logger, NotImplementedException } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Memento } from "./dto/memento.dto";
import { User } from "../user/dto/user.dto";
import { FamilyMemberGuard } from "../auth/guards/family-member.guard";
import { CreateMementoInput } from "./inputs/memento.inputs";
import { Family } from "../family/dto/family.dto";
import { MementoDocument } from "./schema/memento.schema";
import { FamilyService } from "../family/family.service";
import { Types } from "mongoose";
import { mapDocumentToFamilyDTO } from "../family/schema/family.mapper";

/**
 * Resolves GraphQL mutations and queries related to Mementos.
 */
@Resolver(Memento)
export class MementoResolver {
  private readonly logger = new Logger(MementoResolver.name);

  constructor(
    private readonly mementoService: MementoService,
    private readonly familyService: FamilyService,
  ) {}

  @Mutation(returns => Memento)
  @UseGuards(JwtAuthGuard, FamilyMemberGuard)
  async createMemento(
    @CurrentUser() user: User,
    @Args("input") input: CreateMementoInput,
  ) {
    return this.mementoService.createMemento(user, input);
  }

  @Query(returns => [Memento], { name: "memento" })
  @UseGuards(JwtAuthGuard, FamilyMemberGuard)
  async getMementos(@Args("familyId") familyId: string): Promise<Memento[]> {
    const res = await this.mementoService.getAllFamilyMementos(familyId);
    this.logger.debug(res);
    return res;
  }

  @ResolveProperty("family", returns => Family)
  async resolveFamily(@Parent() { mementoId }: Memento): Promise<Family> {
    // TODO: use dataloader pattern as re-fetching is inefficient
    const doc: MementoDocument = await this.mementoService.findById(mementoId);
    this.logger.debug(doc);

    return mapDocumentToFamilyDTO(
      await this.familyService.getFamily(
        (doc.inFamily as Types.ObjectId).toHexString(),
      ),
    );
  }
}
