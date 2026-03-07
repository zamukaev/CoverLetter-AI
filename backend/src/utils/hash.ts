import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export const hashPassword = (rawPassword: string): Promise<string> => {
  return bcrypt.hash(rawPassword, SALT_ROUNDS);
};

export const comparePassword = (rawPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(rawPassword, hashedPassword);
};
