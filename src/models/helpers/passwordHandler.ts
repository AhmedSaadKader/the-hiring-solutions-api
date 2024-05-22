import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export const hashPassword = (password: string) =>
  bcrypt.hashSync(
    (password + BCRYPT_PASSWORD) as string,
    parseInt(SALT_ROUNDS as string)
  );

export const comparePassword = (password: string, password_digest: string) => {
  if (bcrypt.compareSync(password + BCRYPT_PASSWORD, password_digest)) {
    return true;
  }
  return false;
};
