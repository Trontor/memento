import { Injectable, ExecutionContext, Logger, Inject } from "@nestjs/common";
import { GqlExecutionContext, GraphQLExecutionContext } from "@nestjs/graphql";
import { User } from "../../user/dto/user.dto";
import { isFamilyAdmin } from "../../user/user.util";
import {
  MEMENTO_LOADER_BY_ID,
  MementoDataLoaderById,
} from "../memento.dataloader";
import { UpdateMementoInput } from "../inputs/memento.inputs";
import { MementoGuard } from "./abstract-memento.guard";

/**
 * Authorizes family admins and original uploaders to update
 * an existing Memento.
 */
@Injectable()
export class UpdateMementoGuard extends MementoGuard {
  constructor(
    @Inject(MEMENTO_LOADER_BY_ID)
    mementoLoaderById: MementoDataLoaderById,
  ) {
    super(mementoLoaderById, new Logger(UpdateMementoInput.name));
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    const { uploadedBy, inFamily } = await this.loadMementoFromContext(ctx);
    const authenticatedUser: User = this.extractUserFromContext(ctx);

    // Check if user is family admin
    if (isFamilyAdmin(authenticatedUser, inFamily.toHexString())) {
      this.logger.log(
        `Can update: user ${authenticatedUser.userId} is an admin of family`,
      );
      return true;
    } else if (authenticatedUser.userId === uploadedBy.toHexString()) {
      // Check if user was uploader
      this.logger.log(
        `Can update: user ${authenticatedUser.userId} is original uploader of memento`,
      );
      return true;
    } else {
      this.logger.log(
        `Cannot update: user ${authenticatedUser.userId} is NOT family admin or uploader`,
      );
      return false;
    }
  }
}
