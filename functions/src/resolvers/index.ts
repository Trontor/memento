import { db } from "../utils/firebase/admin";
import { ApolloError, ValidationError } from "apollo-server-core";

export const resolvers = {
  Query: {
    me: () => "me",
    user: async (_: any, { id }: { id: string }) => {
      try {
        const snap = await db
          .collection("users")
          .doc(id)
          .get();
        if (!snap.exists) throw new ValidationError("User ID not found");
        console.log(snap.data());
        return "jane";
      } catch (err) {
        console.error(err);
        throw new ApolloError(err);
      }
    }
  }
};
