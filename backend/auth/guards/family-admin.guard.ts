import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  BadRequestException
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "../../user/dto/user.dto";
import { isFamilyAdmin } from "../../user/user.util";

/**
 * Authorizes family admins
 */
@Injectable()
export class FamilyAdminGuard implements CanActivate {
  private readonly logger = new Logger(FamilyAdminGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user: User = req.user;
    this.logger.debug(user);
    let familyId: string;
    try {
      familyId = ctx.getArgs().input.familyId;
    } catch (err) {
      this.logger.error(`Format required: { input: { familyId: "..."} }`);
      throw new BadRequestException();
    }
    const shouldActivate = isFamilyAdmin(user, familyId);
    if (shouldActivate) {
      this.logger.log(
        `Activate: user ${user.userId} is an admin of family ${familyId}`
      );
    } else {
      this.logger.log(
        `Do not activate: user ${user.userId} is NOT admin of family ${familyId}`
      );
    }
    return shouldActivate;
  }
}
