import { BadRequestException, NotFoundException } from "@nestjs/common";

export class InviteExpiredException extends BadRequestException {
  constructor() {
    super("Invite has expired");
  }
}

export class InviteNotFoundException extends NotFoundException {
  constructor() {
    super("Invite not found");
  }
}
