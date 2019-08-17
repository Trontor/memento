import { WithFirebaseFirestore } from "../utils/firebase/admin";
import { CreateFamilyInput } from "../generated/graphql";

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
    const newFamDoc: {
      name: string;
      users: string[];
      description?: string;
      imageUrl?: string;
    } = {
      name: name,
      users: [userId]
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
