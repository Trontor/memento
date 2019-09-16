import { createParamDecorator } from "@nestjs/common";

/**
 * A decorator that allows current user to be extracted from
 * the arguments to a resolver handler.
 */
export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user
);
