import { registerEnumType } from "type-graphql";

export enum Gender {
  Male = "MALE",
  Female = "FEMALE"
}

// required to work with type-graphql
registerEnumType(Gender, {
  name: "Gender"
});
