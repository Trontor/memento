import { createParamDecorator } from "@nestjs/common";
import { mapDocumentToUserDTO } from "../../user/schema/user.mapper";

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => mapDocumentToUserDTO(ctx.req.user)
);
