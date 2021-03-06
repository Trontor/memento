import { ObjectType, Field, ID } from "type-graphql";
import { User } from "../../user/dto/user.dto";

/**
 * GraphQL class for returning Family objects.
 * Equivalent to a Data Transfer Object (DTO).
 */
@ObjectType()
export class Family {
    @Field(type => ID)
    familyId!: string;

    @Field()
    name!: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    imageUrl?: string;

    @Field(type => [User])
    members?: User[];

    @Field({ nullable: true })
    colour?: string;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}
