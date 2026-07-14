import express from "express";
import {getPacientes} from "../Controllers/pacientes.controller.js";
import { postPacientes } from "../Controllers/pacientes.controller.js";

const router = express.Router();

router.get("/", getPacientes);
router.post("/", postPacientes);

export default router;

