import {
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super("Account does not exist D:");
  }
}

export class CreateRoleException extends InternalServerErrorException {
  constructor() {
    super("Could not create a user role");
  }
}
