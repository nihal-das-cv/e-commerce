import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import type { Request, Response } from "express";

import { generateTokenAndSetCookie } from "../utils/utils";
import User, { type IUserDocument } from "../models/user.model";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../email/resend";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  const {
    email,
    password,
    name,
  }: { email: string; password: string; name: string } = req.body;

  try {
    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });

      return;
    }

    const existingUser: IUserDocument | null = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const verificationToken: string = uuid();
    const verificationTokenExpiresAt: Date = new Date(Date.now() + 3600000);

    const newUser: IUserDocument = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt,
    });

    const savedUser: IUserDocument = await newUser.save();

    generateTokenAndSetCookie(res, savedUser._id.toString());

    if (savedUser.verificationToken) {
      await sendVerificationEmail(savedUser.email, savedUser.verificationToken);
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        isVerified: savedUser.isVerified,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
    });
  } catch (error: unknown) {
    const err: Error = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { code }: { code: string } = req.body;

  try {
    const user: IUserDocument | null = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });

      return;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user.toObject(),
        password: undefined,
      },
    });
  } catch (error: unknown) {
    const err: Error = error as Error;

    console.error("error in verifyEmail:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
      return;
    }

    const user: IUserDocument | null = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    generateTokenAndSetCookie(res, user._id.toString());

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error: unknown) {
    const err: Error = error as Error;

    console.error("Error in login:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const logout = async (_: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const user: IUserDocument | null = await User.findById(req.userId).select(
      "-password"
    );

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, user });
  } catch (error: unknown) {
    const err: Error = error as Error;
    console.error("Error in checkAuth:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email }: { email: string } = req.body;

  try {
    const user: IUserDocument | null = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const resetToken: string = uuid();
    const resetTokenExpiresAt: Date = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error: unknown) {
    const err: Error = error as Error;

    console.error("Error in forgotPassword:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params as { token: string };
    const { password }: { password: string } = req.body;

    const user: IUserDocument | null = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error: unknown) {
    const err: Error = error as Error;

    console.error("Error in resetPassword:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
