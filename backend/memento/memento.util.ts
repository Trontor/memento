import {
  CreateMementoDateInput,
  CreateMementoInput,
  UpdateMementoInput,
} from "./inputs/memento.inputs";
import { BadRequestException } from "@nestjs/common";

const validateMementoDate = (date: CreateMementoDateInput): void => {
  if (!date.day && !date.month && !date.year) {
    // cannot all be null
    throw new BadRequestException(
      "`Day`, `month` and `year` cannot all be empty",
    );
  } else if (date.day && !date.month && !date.year) {
    throw new BadRequestException("Cannot only specify `day` field");
  }
};

const validateMementoDates = (dates: CreateMementoDateInput[]): void => {
  dates.every(validateMementoDate);
};

/**
 * Validates input fields for CreateMementoInput.
 * Throws error if input is not allowed.
 *
 * @param input fields for creating a new Memento
 */
export const validateMementoInput = (input: CreateMementoInput): void => {
  if (input.dates) validateMementoDates(input.dates);
};

/**
 * Validates input fields for UpdateMementoInput.
 * Throws error if input is not allowed.
 *
 * @param input fields for updating an existing Memento
 */
export const validateUpdateMementoInput = (input: UpdateMementoInput): void => {
  const { mementoId, ...data } = input;
  if (Object.keys(data).length === 0)
    throw new BadRequestException("No data provided to update Memento.");
};
