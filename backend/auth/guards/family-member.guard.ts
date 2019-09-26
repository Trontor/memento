import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  BadRequestException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "../../user/dto/user.dto";
import { isUserInFamily } from "../../user/user.util";

/**
 * Authorizes family members by using the `familyId` arg or nested
 * `input: {familyId: "..." }` arg of an incoming GraphQL query or mutation
 * to check if the current authenticated user is a family member
 * of this specific family.
 */
@Injectable()
export class FamilyMemberGuard implements CanActivate {
  private readonly logger = new Logger(FamilyMemberGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user: User = req.user;
    let familyId: string;
    try {
      const args = ctx.getArgs();
      if (args.familyId) {
        familyId = args.familyId;
      } else {
        familyId = args.input.familyId;
      }
    } catch (err) {
      this.logger.error(
        `Format required: mutation(familyId: "...") or mutation({ input: { familyId: "..."} })`,
      );
      throw new BadRequestException(
        `Format required: mutation(familyId: "...") or mutation({ input: { familyId: "..."} })`,
      );
    }
    const shouldActivate = isUserInFamily(user, familyId);
    if (shouldActivate) {
      this.logger.log(
        `Activate: user ${user.userId} is a member of family ${familyId}`,
      );
    } else {
      this.logger.log(
        `Do not activate: user ${user.userId} is NOT a member of family ${familyId}`,
      );
    }
    return shouldActivate;
  }
}
