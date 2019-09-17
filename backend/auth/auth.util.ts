import bcrypt from "bcrypt";

/**
 * Checks if the user's password provided matches the user's password hash
 *
 * @param {string} password The password to attempt
 * @param {string} hashedPwd The hash of the real salted password
 * @returns {Promise<boolean>} result of the match. Will throw an error if one exists from bcrypt
 */
export const checkPassword = async (
  password: string,
  hashedPwd: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPwd, (error, isMatch) => {
      if (error) {
        reject(error);
      }
      resolve(isMatch);
    });
  });
};
