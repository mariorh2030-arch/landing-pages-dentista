import express from "express";
import {getPacientes} from "../Controllers/pacientes.controller.js";
import { postPacientes } from "../Controllers/pacientes.controller.js";
import { deletePacientes } from "../Controllers/pacientes.controller.js";
import { putPacientes } from "../Controllers/pacientes.controller.js";

const router = express.Router();

router.get("/", getPacientes);
router.post("/", postPacientes);
router.delete("/:id", deletePacientes);
router.put("/:id", putPacientes);

export default router;

