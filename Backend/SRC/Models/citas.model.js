import pool from "../config/db";

export const obtenerPacientePorTelefono = async (telefono) => {
    const [rows] = await pool.query("SELECT FROM pacientes WHERE telefono = ?", [telefono]);
    return rows;
}

export const insertarCita = async (pacienteid,{hora, fecha}) => {
    const [rows] = await pool.query("INSERT INTO citas()")
}