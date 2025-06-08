import * as bycrypt from 'bcrypt';

const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
  const salt = await bycrypt.genSalt(saltRounds);
  const hashedPassword = await bycrypt.hash(password, salt);
  return hashedPassword;
}

async function verifyPassword(
  password: string,
  storedPassword: string,
): Promise<boolean> {
  return await bycrypt.compare(password, storedPassword);
}

export { hashPassword, verifyPassword };
