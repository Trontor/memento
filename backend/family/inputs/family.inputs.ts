import { InputType, Field, ID } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";

/**
 * GraphQL input for joining a family
 */
@InputType()
export class JoinFamilyInput {
    @Field(type => ID)
    inviteId!: string;
}

/**
 * GraphQL input for creating a family
 */
@InputType()
export class CreateFamilyInput {
    @Field()
    name!: string;

    @Field(type => GraphQLUpload, { nullable: true })
    image?: any;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    colour?: string;
}

/**
 * GraphQL input for updating a family
 */
@InputType()
export class UpdateFamilyInput {
    @Field(type => ID)
    familyId!: string;

    @Field({ nullable: true })
    name?: string;

    @Field(type => GraphQLUpload, { nullable: true })
    image?: any;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    colour?: string;
}
