import {
  NotFoundException,
  InternalServerErrorException,
  BadRequestException
} from "@nestjs/common";

export class FamilyNotFoundException extends NotFoundException {
  constructor() {
    super("Family not found");
  }
}

export class CreateFamilyException extends InternalServerErrorException {
  constructor() {
    super("Family document could not be created");
  }
}

export class AlreadyJoinedFamilyException extends BadRequestException {
  constructor() {
    super("Already joined family");
  }
}
