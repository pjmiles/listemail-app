import express from "express";
import { verifyToken } from "../services/auth.js";
import { createAdminUser, listAdmin } from "../services/tenant.js";
import { login } from "../services/auth.js";
import { createEmail, createBukEmail } from "../services/mail.js";

export const router = express.Router();

router.get("/", verifyToken, listAdmin);
router.post("/", createAdminUser);
router.post("/", verifyToken, createEmail);
router.post("/login", verifyToken, login);
router.post("/bulk", verifyToken, createBukEmail);
