import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import pacientesRoutes from "./Routes/paciente.routes.js";
const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/pacientes", pacientesRoutes);


app.use(express.static(path.join(__dirname, "../../Frontend")));

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

export default app;

