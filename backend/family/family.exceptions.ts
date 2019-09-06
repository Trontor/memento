import {
  NotFoundException,
  InternalServerErrorException
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
