import { Schema, Document, Query } from "mongoose";
import * as bcrypt from "bcrypt";
import { User } from "../dto/user.dto";
import { FamilyRole, Role } from "../dto/role.dto";

/**
 * Use GraphQL `User` type as a single source of truth by extending the Mongoose
 * `UserDocument` from the `User` class.
 */
export interface UserDocument extends User, Document {
  // Declaring everything that is not in the GraphQL Schema for a User
  password: string;
  lowercaseEmail: string;
  roles: Role[];

  /**
   * Converts `UserDocument` to `User` to return to the client
   */
  toDTO(): User;
}

/**
 * Subdocument schema for a `role`
 */
const RoleSchema: Schema = new Schema(
  {
    familyId: {
      type: String,
      required: true,
    },
    familyRole: {
      type: String,
      enum: [FamilyRole.Normal, FamilyRole.Admin],
      required: true,
    },
  },
  {
    _id: false,
  },
);

/**
 * The actual structure of the MongoDB collection.
 */
export const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lowercaseEmail: {
      type: String,
      unique: true,
    },
    roles: {
      type: [RoleSchema],
      default: [],
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    location: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.toDTO = function(): User {
  return {
    // mongodb id
    userId: this.id,
    // user details
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    gender: this.gender,
    imageUrl: this.imageUrl,
    dateOfBirth: this.dateOfBirth,
    location: this.location,
    // family roles
    familyRoles: this.roles,
    // dummy array - resolver will deal with this
    families: [],
    // timestamps
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    lastSeenAt: this.lastSeenAt,
  };
};

function validateEmail(email: string) {
  // tslint:disable-next-line:max-line-length
  // const expression = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return true;
}

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre<UserDocument>("save", function(next) {
  const user = this;

  user.lowercaseEmail = user.email.toLowerCase();

  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified("password")) {
    return next();
  }

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (genSaltError, salt) => {
    if (genSaltError) {
      return next(genSaltError);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.pre<Query<UserDocument>>("findOneAndUpdate", function(next) {
  const updateFields = this.getUpdate();

  if (updateFields.email) {
    this.update(
      {},
      { $set: { lowercaseEmail: updateFields.email.toLowerCase() } },
    );
  }
  next();
});

// Mongoose Static Method - added so a service can validate an email with the same criteria the schema is using
UserSchema.statics.validateEmail = function(email: string): boolean {
  return validateEmail(email);
};
