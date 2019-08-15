import { UserSignupInput } from "../generated/graphql";

export interface UserSignupErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

export const isEmpty = (s: string) => {
  return s.trim() === "";
};

const isEmail = (email: string) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regEx);
};

export const validateUserSignupInput = (
  input: UserSignupInput
): [UserSignupErrors, boolean] => {
  const errors: UserSignupErrors = {};
  console.log(input);
  if (isEmpty(input.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(input.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(input.password)) {
    errors.password = "Must not be empty";
  }
  if (input.password !== input.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  if (isEmpty(input.firstName)) {
    errors.firstName = "Must not be empty";
  }
  if (isEmpty(input.lastName)) {
    errors.lastName = "Must not be empty";
  }
  const isValid = Object.keys(errors).length === 0;

  return [errors, isValid];
};
