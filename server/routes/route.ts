import express, { type Request, type Response, type Router } from "express";
import { verifyToken } from "../middleware/middleware";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/controllers";

const router: Router = express.Router();

router.get("/health", (_: Request, res: Response) => {
  res.status(200).json({
    success: true,
    isRunning: true,
    message: "Server is working fine...",
  });
});
router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
