import {
  CanActivate,
  ExecutionContext,
  NotImplementedException,
  Injectable,
  BadRequestException,
  Logger,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { GraphQLExecutionContext } from "@nestjs/graphql";
import {
  MementoDataLoaderById,
  MEMENTO_LOADER_BY_ID,
} from "../memento.dataloader";
import { User } from "../../user/dto/user.dto";
import { MementoDocument } from "../schema/memento.schema";

@Injectable()
export abstract class MementoGuard implements CanActivate {
  constructor(
    @Inject(MEMENTO_LOADER_BY_ID)
    private readonly mementoLoaderById: MementoDataLoaderById,
    protected readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    throw new NotImplementedException();
  }

  /**
   * Loads the Memento using the specified `mementoId`
   * in the request context.
   *
   * @param context context of incoming GraphQL request
   */
  // @ts-ignore
  protected async loadMementoFromContext(
    context: GraphQLExecutionContext,
  ): Promise<MementoDocument> {
    let mementoId: string;
    const args: any = context.getArgs();
    try {
      if (args.mementoId) {
        mementoId = args.mementoId;
      } else {
        mementoId = args.input.mementoId;
      }
    } catch (err) {
      const msg = `Required format of args: { mementoId: "..." } or { input: { mementoId: "..."} }`;
      this.logger.error(msg);
      throw new BadRequestException(msg);
    }
    return await this.mementoLoaderById.load(mementoId);
  }

  protected extractUserFromContext(context: GraphQLExecutionContext): User {
    const req = context.getContext().req;
    const user = req.user;
    this.logger.debug(user);
    if (!user) {
      // cannot activate guard if user is not authenticated
      throw new UnauthorizedException();
    }
    return user;
  }
}
