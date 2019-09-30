import { Injectable, ExecutionContext, Logger, Inject } from "@nestjs/common";
import { isUserInFamily } from "../../user/user.util";
import { MementoGuard } from "./abstract-memento.guard";
import {
  MEMENTO_LOADER_BY_ID,
  MementoDataLoaderById,
} from "../memento.dataloader";
import { GqlExecutionContext, GraphQLExecutionContext } from "@nestjs/graphql";
import { User } from "../../user/dto/user.dto";

/**
 * Authorizes user in the same family to read a Memento.
 */
@Injectable()
export class ReadMementoGuard extends MementoGuard {
  constructor(
    @Inject(MEMENTO_LOADER_BY_ID) mementoLoaderById: MementoDataLoaderById,
  ) {
    super(mementoLoaderById, new Logger(ReadMementoGuard.name));
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    const { inFamily } = await this.loadMementoFromContext(ctx);
    const authenticatedUser: User = this.extractUserFromContext(ctx);
    this.logger.debug(inFamily);
    this.logger.debug(authenticatedUser);
    return isUserInFamily(authenticatedUser, inFamily.toHexString());
  }
}
