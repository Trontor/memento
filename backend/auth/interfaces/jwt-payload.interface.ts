/**
 * JWT token contains the following fields.
 */
export interface JwtPayload {
  email: string;
  expiration?: Date;
}
