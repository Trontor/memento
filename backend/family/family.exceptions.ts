import { NotFoundException } from "@nestjs/common";

export class FamilyNotFoundException extends NotFoundException {
  constructor() {
    super("Family not found");
  }
}
