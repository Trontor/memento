import { WithFirebaseFirestore } from "../utils/firebase/admin";
import { CreateFamilyInput } from "../generated/graphql";
import { ApolloError } from "apollo-server-core";

export interface FamilyDocument {
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

  async getFamilyById(id: string) {
    try {
      const snap = await this.db
        .collection(FamilyModel.FAMILIES_COLLECTION)
        .doc(id)
        .get();
      return snap.data();
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

    // create family
    const newFamDoc: FamilyDocument = {
      name: name,
      users: [userId],
      numArtifacts: 0,
      numMembers: 1,
      createdAt: new Date().toISOString()
    };
    if (description) {
      newFamDoc.description = description;
    }
    // TODO: upload imageUrl
    if (imageUrl) {
      newFamDoc.imageUrl = imageUrl;
    }

    batch.create(famRef, newFamDoc);
    return newFamDoc;
  }
}
