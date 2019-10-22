import {
  CreateMementoDateInput,
  CreateMementoInput,
  UpdateMementoInput,
} from "./inputs/memento.inputs";
import { BadRequestException } from "@nestjs/common";

const validateMementoDate = (date: CreateMementoDateInput): boolean => {
  console.log(date);
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

const validateMementoDates = (dates: CreateMementoDateInput[]): void => {
  dates.every(validateMementoDate);
};

const validatePeople = (people: string[]): void => {
  if (people.length > 10)
    throw new BadRequestException(
      "Over maximum limit of 10 people tagged in Memento.",
    );
};

const validateBeneficiaries = (beneficiaries: string[]): void => {
  if (beneficiaries.length > 10)
    throw new BadRequestException(
      "Over maximum limit of 10 beneficiaries for Memento.",
    );
};

const validateMaxDetectedPerMedia = (maxDetected: number): void => {
  if (maxDetected <= 0)
    throw new BadRequestException(
      "maxDetectedPerMedia must be a positive integer",
    );
};

/**
 * Validates input fields for CreateMementoInput.
 * Throws error if input is not allowed.
 *
 * @param input fields for creating a new Memento
 */
export const validateMementoInput = (input: CreateMementoInput): void => {
  if (input.dates) validateMementoDates(input.dates);
  if (input.people) validatePeople(input.people);
  if (input.beneficiaries) validateBeneficiaries(input.beneficiaries);
  if (input.maxDetectedPerMedia)
    validateMaxDetectedPerMedia(input.maxDetectedPerMedia);
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
  if (data.beneficiaries) validateBeneficiaries(data.beneficiaries);
  if (data.people) validatePeople(data.people);
  if (data.dates) {
    console.log("==========================");
    validateMementoDates(data.dates);
  }
};

/**
 * Returns an array of unique strings given an array of strings.
 * @param values array of strings which may contain duplicates
 */
export const uniqueValues = (values: string[] | undefined): string[] => {
  return values ? Array.from(new Set<string>(values)) : [];
};

export const preprocessTags = (tags: string[]): string[] => {
  return tags.map(t => t.toLowerCase());
};
