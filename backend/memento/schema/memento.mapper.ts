import { MementoDocument } from "./memento.schema";
import { Memento } from "../dto/memento.dto";

/**
 * Maps Mongoose `MementoDocument` to GraphQL `Memento` type.
 */
export const mapDocumentToMementoDTO = (doc: MementoDocument): Memento => {
  return {
    // mongodb id
    mementoId: doc.id,
    location: doc.location,
    type: doc.type,
    dates: doc.dates,
    // dummy: resolved if requested
    family: doc.family,
    // dummy: resolved if requested
    uploader: doc.uploader,
    media: doc.media,
    description: doc.description,
    // timestamps
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};
