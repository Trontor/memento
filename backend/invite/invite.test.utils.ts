export interface IInviteModelInput {
  _id: string;
  inviterId: string;
  familyId: string;
  createdAt: Date;
  expiresAt: Date;
}

export class MockInviteDocument implements IInviteModelInput {
  _id: string;
  inviterId: string;
  familyId: string;
  createdAt: Date;
  expiresAt: Date;

  constructor(args: IInviteModelInput) {
    console.log(args);
    this._id = args._id;
    this.inviterId = args.inviterId;
    this.familyId = args.familyId;
    this.createdAt = args.createdAt;
    this.expiresAt = args.expiresAt;
  }

  get id() {
    return this._id;
  }

  async save() {
    return this;
  }
}
