import argon from "argon2";
import JWT from "jsonwebtoken";

export const generatePassword = async (password: string) => {
  return await argon.hash(password);
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string,
) => {
  return await argon.verify(hashedPassword, password);
};

export const createToken = () => {};

export const verifyToken = () => {};
