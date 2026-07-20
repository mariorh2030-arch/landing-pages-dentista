import express from "express";
import { agendarCita } from "../Controllers/citas.controller.js";
const router = express.Router();
export default router;

router.post("/", agendarCita);