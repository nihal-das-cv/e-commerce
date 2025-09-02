import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { type Response } from "express";

dotenv.config();

interface JwtPayload {
  userId: string;
}

export const generateTokenAndSetCookie = (
  response: Response,
  userId: string
): void => {
  const secret: string = process.env.JWT_SECRET || "";

  if (!secret) {
    throw new Error("JWT_SECRET not found");
  }

  const token = jwt.sign({ userId } as JwtPayload, secret, {
    expiresIn: "7d",
  });

  response.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
