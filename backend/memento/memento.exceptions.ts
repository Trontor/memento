import { BadRequestException, NotFoundException } from "@nestjs/common";

export class InvalidMediaTypeException extends BadRequestException {
  constructor() {
    super("Invalid media type");
  }
}

export class MementoNotFoundException extends NotFoundException {
  constructor() {
    super("Memento not found");
  }
}
