import pool from "../config/db.js";

const obtenerPacientes = async () => {
    const [rows] = await pool.query("SELECT * FROM pacientes");
    return rows;
}
const insertarPacientes = async (nombre, apellidos, telefono, correo, fechaNacimiento) =>{
    const [rows] = await pool.query(`INSERT INTO pacientes
        (nombre, apellidos, telefono, correo, fechaNacimiento)
        VALUES (?, ?, ?, ?, ?)`,
        [nombre, apellidos, telefono, correo, fechaNacimiento]);
    return rows;
    
}

const eliminarPaciente = async (id) =>{
    const [rows] = await pool.query(`DELETE FROM pacientes WHERE id = ?`, [id]);
    return rows;
}
export {obtenerPacientes, insertarPacientes, eliminarPaciente};

