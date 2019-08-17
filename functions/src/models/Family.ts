import { WithFirebaseFirestore } from "../utils/firebase/admin";
import { CreateFamilyInput } from "../generated/graphql";

interface FamilyDocument {
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

  async batchCreateFamily(
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
      numMembers: 0,
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
    return batch;
  }
}
