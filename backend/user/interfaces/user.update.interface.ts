import { Gender } from "../dto/gender.dto";
import { PlaceInput } from "../input/place.input";

/**
 * Interface for data to initialize a UserModel
 * when updating a user profile.
 */
export interface IUpdateUserData {
  gender?: Gender;
  dateOfBirth?: string;
  location?: string;
  imageUrl?: string;
  hometown?: string;
  placesLived?: PlaceInput[];
}
