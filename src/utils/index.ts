import config from "@/config";
import argon from "argon2";
import JWT from "jsonwebtoken";

export const generatePassword = async (password: string) => {
  return await argon.hash(password);
};

export const verifyPassword = async ({
  password,
  hashedPassword,
}: {
  hashedPassword: string;
  password: string;
}) => {
  return await argon.verify(hashedPassword, password);
};

export const createToken = (payload: any) => {
  return JWT.sign(payload, config.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });
};

export const verifyToken = () => {};
