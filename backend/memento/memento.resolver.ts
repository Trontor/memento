import { Resolver, Query } from "@nestjs/graphql";
import { MementoService } from "./memento.service";
import { Mutation, Args } from "@nestjs/graphql";
import { UseGuards, Logger, NotImplementedException } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Memento } from "./dto/memento.dto";
import { User } from "../user/dto/user.dto";
import { FamilyMemberGuard } from "../auth/guards/family-member.guard";
import { CreateMementoInput } from "./inputs/memento.inputs";

/**
 * Resolves GraphQL mutations and queries related to Mementos.
 */
@Resolver(Memento)
export class MementoResolver {
  private readonly logger = new Logger(MementoResolver.name);

  constructor(private readonly mementoService: MementoService) {}

  @Mutation(returns => Memento)
  @UseGuards(JwtAuthGuard, FamilyMemberGuard)
  async createMemento(
    @CurrentUser() user: User,
    @Args("input") input: CreateMementoInput,
  ) {
    return this.mementoService.createMemento(user, input);
  }

  @Query(returns => Memento, { name: "memento" })
  @UseGuards(JwtAuthGuard)
  async getMemento(
    @CurrentUser() user: User,
    @Args("mementoId") mementoId: string,
  ) {
    throw new NotImplementedException();
  }
}
