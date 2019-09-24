import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthService } from "../auth.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { mapDocumentToUserDTO } from "../../user/schema/user.mapper";
import { ExtractJwt } from "passport-jwt";
import { User } from "../../user/dto/user.dto";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: any = this.getRequest(context);

    // extract JWT bearer token
    const token: string | null = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    this.logger.log(token);
    if (!token) return false;

    try {
      const user: User = await this.authService.validateToken(token);
      this.logger.log(`JWT: Activate for user ${user.userId}`);
      req.user = user;
      return true;
    } catch (err) {
      this.logger.error(err);
      this.logger.log(`JWT: Do NOT activate`);
      return false;
    }
  }

  private getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }
}
