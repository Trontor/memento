import { WithFirebaseFirestore } from "../utils/firebase/admin";
import { ApolloError } from "apollo-server-express";
import { get24HoursFromNow } from "../utils/date";

export interface InvitationDocument {
  id: string;
  familyId: string;
  createdAt: string;
  expiresAt: string;
}

export default class InvitationModel {
  static INVITATION_COLLECTION: string = "invitations";
  db: FirebaseFirestore.Firestore;

  constructor({ db }: WithFirebaseFirestore) {
    this.db = db;
  }

  async getInvitationById(id: string): Promise<InvitationDocument> {
    try {
      const snap = await this.db
        .collection(InvitationModel.INVITATION_COLLECTION)
        .doc(id)
        .get();
      const data = snap.data();
      if (!data) {
        throw new ApolloError("Invitation not found");
      }
      return {
        id: snap.id,
        familyId: data.familyId,
        createdAt: data.createdAt,
        expiresAt: data.expiresAt
      };
    } catch (err) {
      console.error(err);
      throw new ApolloError("Firestore error");
    }
  }

  async createInvitation(familyId: string): Promise<InvitationDocument> {
    try {
      const data = {
        familyId,
        createdAt: new Date().toISOString(),
        expiresAt: get24HoursFromNow().toISOString()
      };
      const docRef = await this.db
        .collection(InvitationModel.INVITATION_COLLECTION)
        .add(data);
      return {
        id: docRef.id,
        ...data
      };
    } catch (err) {
      console.error(err);
      throw new ApolloError("Firestore error");
    }
  }
}
