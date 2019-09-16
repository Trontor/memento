import { Gender } from "../dto/gender.dto";

export interface IUpdateUserData {
  gender?: Gender;
  dateOfBirth?: string;
  location?: string;
  imageUrl?: string;
}
