import {
  NotFoundException,
  InternalServerErrorException
} from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super("User not found");
  }
}

export class UpdateRoleException extends InternalServerErrorException {
  constructor() {
    super("Could not update user role");
  }
}
