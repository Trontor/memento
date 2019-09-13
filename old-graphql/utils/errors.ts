import { ApolloError } from "apollo-server-express";
export const AUTH_ERROR_MESSAGE: string = "Could not authenticate user";
export const EMAIL_IN_USE_ERROR_MESSAGE: string =
  "The email address is already in use by another account.";
export const INVALID_ARGS_ERROR_MESSAGE: string = "Invalid input arguments";
export const USER_NOT_FOUND_ERROR_MESSAGE: string = "User not found";
export const AUTHORIZATION_ERROR_MESSAGE: string = "Unauthorized";
export const NOT_LOGGED_IN_ERROR_MESSAGE: string = "Not logged in";
export const MUST_BE_FAMILY_ADMIN_ERROR_MESSAGE: string =
  "Must be a family admin";
export const CANNOT_CHANGE_OWN_ROLE_ERROR_MESSAGE: string =
  "Cannot change own role";

export class AuthorizationError extends ApolloError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, "UNAUTHORIZED", properties);

    Object.defineProperty(this, "name", { value: "AuthorizationError" });
  }
}
