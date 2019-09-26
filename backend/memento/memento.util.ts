import {
  CreateMementoDateInput,
  CreateMementoInput,
} from "./inputs/memento.inputs";
import { BadRequestException } from "@nestjs/common";

const validateMementoDate = (date: CreateMementoDateInput): boolean => {
  if (!date.day && !date.month && !date.year) {
    // cannot all be null
    throw new BadRequestException(
      "`Day`, `month` and `year` cannot all be empty",
    );
  } else if (date.day && !date.month && !date.year) {
    throw new BadRequestException("Cannot only specify `day` field");
  }
  return true;
};

const validateMementoDates = (dates: CreateMementoDateInput[]): boolean => {
  return dates.every(validateMementoDate);
};

export const validateMementoInput = (input: CreateMementoInput): boolean => {
  if (input.dates && !validateMementoDates(input.dates)) return false;
  return true;
};
