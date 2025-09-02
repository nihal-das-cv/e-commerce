import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const secret: string | undefined = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const decoded: DecodedToken = jwt.verify(token, secret) as DecodedToken;

    if (!decoded?.userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
