import pool from "../config/db.js";

const obtenerPacientes = async () => {
    const [rows] = await pool.query("SELECT * FROM pacientes");
    return rows;
}
const insertarPacientes = async (nombre, apellidos, telefono, corre, fechaNacimiento) =>{
    const [rows] = await pool.query("INSERT INTO pacientes(nombre, apellidos, telefono, correo, fechaNacimiento) values(?, ?, ?, ?, ?)"), 
    [nombre, apellidos, telefono, corre, fechaNacimiento];
    return rows;
    
}
export {obtenerPacientes, insertarPacientes};

