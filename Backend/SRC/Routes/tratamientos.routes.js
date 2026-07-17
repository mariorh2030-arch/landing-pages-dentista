import express from "express";
import { getTratamientos } from "../Controllers/tratamientos.controller.js";
import { postTratamientos } from "../Controllers/tratamientos.controller.js";
import { deleteTratamientos } from "../Controllers/tratamientos.controller.js";
import { putTratamientos } from "../Controllers/tratamientos.controller.js";

const router = express.Router();

router.get("/", getTratamientos);
router.post("/", postTratamientos);
router.delete("/:id", deleteTratamientos);
router.put("/:id", putTratamientos);

export default router;
