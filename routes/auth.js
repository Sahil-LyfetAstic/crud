import express from "express";
const router = express.Router();
import {
  signUp,
  getSignUp,
  getHome,
  login,
  getLogin,
  logout    
} from "../controllers/authController.js";
import { isAuthenticatedUser } from "../middlewares/authMiddleware.js";

router.get("/", isAuthenticatedUser, getHome);
router.get("/login",getLogin);
router.post('/login',login)
router.get("/logout");
router.get("/signup", getSignUp);
router.post("/signup", signUp);
router.get("/home", getHome);
router.get('/logout',logout)

export default router;
