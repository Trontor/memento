import { WithFirebaseFirestore } from "../utils/firebase/admin";
import { CreateFamilyInput } from "../generated/graphql";
import { ApolloError } from "apollo-server-express";
import { admin } from "../utils/firebase/admin";

export interface FamilyDocument {
  id: string;
  name: string;
  users: string[];
  description?: string;
  numMembers: number;
  numArtifacts: number;
  imageUrl?: string;
  createdAt: string;
}

export default class FamilyModel {
  static FAMILIES_COLLECTION: string = "families";
  db: FirebaseFirestore.Firestore;

  constructor({ db }: WithFirebaseFirestore) {
    this.db = db;
  }

  async getFamilyById(id: string): Promise<FamilyDocument> {
    try {
      const snap = await this.db
        .collection(FamilyModel.FAMILIES_COLLECTION)
        .doc(id)
        .get();
      const data = snap.data();
      if (!data) {
        throw new ApolloError("Family not found");
      }
      return {
        id: id,
        name: data.name,
        users: data.users,
        description: data.description,
        numArtifacts: data.numArtifacts,
        numMembers: data.numMembers,
        createdAt: data.createdAt
      };
    } catch (err) {
      console.error(err);
      throw new ApolloError("Firestore error");
    }
  }

  batchCreateFamily(
    batch: FirebaseFirestore.WriteBatch,
    userId: string,
    familyId: string,
    { name, description, imageUrl }: CreateFamilyInput
  ) {
    const famRef = this.db
      .collection(FamilyModel.FAMILIES_COLLECTION)
      .doc(familyId);

    const newFamDoc = {
      name: name,
      users: [userId],
      numArtifacts: 0,
      numMembers: 1,
      createdAt: new Date().toISOString(),
      imageUrl: imageUrl ? imageUrl : undefined,
      description: description ? description : undefined
    };

    batch.create(famRef, newFamDoc);
    return { id: familyId, ...newFamDoc };
  }

  batchUpdateFamily(
    batch: FirebaseFirestore.WriteBatch,
    userId: string,
    familyId: string
  ) {
    const famRef = this.db
      .collection(FamilyModel.FAMILIES_COLLECTION)
      .doc(familyId);
    batch.update(famRef, {
      numMembers: admin.firestore.FieldValue.increment(1),
      users: admin.firestore.FieldValue.arrayUnion(userId)
    });
  }
}
