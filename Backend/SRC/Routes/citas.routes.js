import express from "express";
import { agendarCita, getCitas } from "../Controllers/citas.controller.js";
const router = express.Router();
export default router;

router.post("/", agendarCita);
router.get("/", getCitas);