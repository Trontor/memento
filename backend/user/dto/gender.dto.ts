import { registerEnumType } from "type-graphql";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

// required to work with type-graphql
registerEnumType(Gender, {
  name: "Gender",
});
