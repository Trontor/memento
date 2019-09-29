import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  BadRequestException,
  Inject,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "../../user/dto/user.dto";
import { isFamilyAdmin } from "../../user/user.util";
import {
  MEMENTO_LOADER_BY_ID,
  MementoDataLoaderById,
} from "../memento.dataloader";
import { UpdateMementoInput } from "../inputs/memento.inputs";

/**
 * Authorizes family admins and original uploaders to update
 * an existing Memento.
 */
@Injectable()
export class UpdateMementoGuard implements CanActivate {
  private readonly logger = new Logger(UpdateMementoInput.name);

  constructor(
    @Inject(MEMENTO_LOADER_BY_ID)
    private readonly mementoLoaderById: MementoDataLoaderById,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user: User = req.user;
    if (!user) {
      // cannot activate guard if user is not authenticated
      return false;
    }
    let mementoId: string;
    try {
      mementoId = ctx.getArgs().input.mementoId;
    } catch (err) {
      this.logger.error(`Format required: { input: { mementoId: "..."} }`);
      throw new BadRequestException();
    }
    const { uploadedBy, inFamily } = await this.mementoLoaderById.load(
      mementoId,
    );

    // Check if user is family admin
    if (isFamilyAdmin(user, inFamily.toHexString())) {
      this.logger.log(`Can update: user ${user.userId} is an admin of family`);
      return true;
    } else if (user.userId === uploadedBy.toHexString()) {
      // Check if user was uploader
      this.logger.log(
        `Can update: user ${user.userId} is original uploader of memento`,
      );
      return true;
    } else {
      this.logger.log(
        `Cannot update: user ${user.userId} is NOT family admin or uploader`,
      );
      return false;
    }
  }
}
