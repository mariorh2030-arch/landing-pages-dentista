import pool from "../config/db.js";

const obtenerPacientePorTelefono = async (telefono) => {
    const [rows] = await pool.query("SELECT id FROM pacientes WHERE telefono = ?", [telefono]);
    return rows;
}


const insertarCita = async (
    pacienteId,
    tratamientoId,
    fecha,
    hora
) => {
    const [rows] = await pool.query(
        `INSERT INTO citas
        (pacienteId, tratamientoId, fecha, hora, estado)
        VALUES (?, ?, ?, ?, ?)`,
        [
            pacienteId,
            tratamientoId,
            fecha,
            hora,
            "Pendiente"
        ]
    );

    return rows;
}
export { obtenerPacientePorTelefono, insertarCita}