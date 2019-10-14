import { CreateMementoInput } from "../inputs/memento.inputs";
import { Types } from "mongoose";
import faker from "faker";
import { MediaType } from "../dto/media.dto";
import { MediaDocument, mapMediaDocumentToDTO } from "../schema/memento.schema";

export interface IMementoModelInput {
  familyId: string;
  title: string;
  type: string;
  maxDetectedPerMedia: number;
  detectObjects: boolean;
  location?: string;
  description?: string;
}

export class MockMementoDocument implements IMementoModelInput {
  familyId: string;
  title: string;
  type: string;
  maxDetectedPerMedia: number;
  detectObjects: boolean;
  _id: Types.ObjectId;
  location?: string;
  description?: string;

  tags?: string[];
  _media: MediaDocument[] = [];
  _beneficiaries: Types.ObjectId[] = [];

  constructor(args: IMementoModelInput) {
    this.familyId = args.familyId;
    this.title = args.title;
    this.type = args.type;
    this.maxDetectedPerMedia = args.maxDetectedPerMedia;
    this.detectObjects = args.detectObjects;
    this._id = Types.ObjectId();
    this.location = args.location;
    this.description = args.description;
  }

  get id() {
    return this._id.toHexString();
  }

  async save() {
    return this;
  }

  toDTO() {
    return {
      // mongodb id
      mementoId: this.id,
      title: this.title,
      location: this.location,
      type: this.type,
      // dates: this._dates.map((date: any) => date.toDTO()),
      media: this._media.map((m: MediaDocument) => mapMediaDocumentToDTO(m)),
      // dummy: resolved if requested
      // family: this.family,
      // dummy: resolved if requested
      // uploader: this.uploader,
      // dummy: resolved if requested
      bookmarkedBy: [],
      // dummy: resolved if requested
      beneficiaries: this._beneficiaries,
      // dummy: resolved if requested
      people: [],
      // detectedLabels: this.detectedLabels,
      description: this.description,
      tags: this.tags,
      // timestamps
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export const CREATE_MEMENTO_INPUT: CreateMementoInput = {
  familyId: Types.ObjectId().toHexString(),
  title: faker.lorem.words(10),
  type: "event",
  maxDetectedPerMedia: 0,
  detectObjects: false,
  location: "brisbane australia",
  description: faker.lorem.lines(3),
  beneficiaries: [
    Types.ObjectId().toHexString(),
    Types.ObjectId().toHexString(),
  ],
};

export const CREATE_MEMENTO_INPUT_WITH_TAGS: CreateMementoInput = {
  familyId: Types.ObjectId().toHexString(),
  title: faker.lorem.words(10),
  type: "event",
  maxDetectedPerMedia: 0,
  detectObjects: false,
  location: "brisbane australia",
  description: faker.lorem.lines(3),
  tags: ["Tag1", "Tag2", "tag3"],
};

export const CREATE_MEMENTO_INPUT_WITH_MEDIA: CreateMementoInput = {
  familyId: Types.ObjectId().toHexString(),
  title: faker.lorem.words(10),
  type: "event",
  maxDetectedPerMedia: 0,
  detectObjects: false,
  location: "brisbane australia",
  description: faker.lorem.lines(3),
  media: [
    {
      caption: faker.lorem.words(10),
      file: {},
      type: MediaType.Image,
    },
  ],
};
