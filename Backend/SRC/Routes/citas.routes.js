import express from "express";
import { 
    agendarCita, 
    getCitas, 
    deleteCita, 
    getCitasById, 
    putCita,
    putEstadoCita
} from "../Controllers/citas.controller.js";
const router = express.Router();
export default router;

router.post("/", agendarCita);
router.get("/", getCitas);
router.get("/:id", getCitasById);
router.delete("/:id", deleteCita);
router.put("/:id", putCita);
router.patch("/:id/estado", putEstadoCita);