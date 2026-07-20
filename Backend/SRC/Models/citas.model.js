import pool from "../config/db.js";

const obtenerPacientePorTelefono = async (telefono) => {
    const [rows] = await pool.query("SELECT id FROM pacientes WHERE telefono = ?", [telefono]);
    return rows;
}

const obtenerCita = async () => {
    const [rows] = await pool.query(
        `SELECT 
        c.id,
        p.nombre,
        p.apellidos,
        t.nombreTratamiento as tratamiento,
        c.fecha,
        c.hora,
        c.estado
        FROM citas c
        INNER JOIN pacientes p
            ON c.pacienteId = p.id
        INNER JOIN tratamientos t
            ON c.tratamientoId = t.id;`
    )
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
export { obtenerPacientePorTelefono, insertarCita, obtenerCita}