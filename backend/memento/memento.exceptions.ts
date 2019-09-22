import { BadRequestException } from "@nestjs/common";

export class InvalidMediaTypeException extends BadRequestException {
  constructor() {
    super("Invalid media type");
  }
}
