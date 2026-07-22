import { 
    obtenerPacientePorTelefono, 
    insertarCita, obtenerCita, 
    eliminarCita,
    obtenerCitaPorId,
    editarCita
 } from "../Models/citas.model.js";
import { insertarPacientes } from "../Models/paciente.model.js";


export const getCitas = async (req, res) => {
    try{
        const citas = await obtenerCita();
        res.status(200).json(citas);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener las citas"
        });
    }
}
export const getCitasById = async (req, res) => {
    try{
        const { id } = req.params;
        const citasPorId = await obtenerCitaPorId(id);
        res.status(200).json(citasPorId);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener las citas"
        });
    }
}

export const agendarCita = async (req, res) => {

    try{
        const { 
            nombre,
            apellidos,
            telefono,
            correo,
            fechaNacimiento, 
            tratamientoId, 
            hora, 
            fecha 
        } = req.body
    const paciente = await obtenerPacientePorTelefono(telefono);
    let pacienteId;

    if(paciente.length > 0){
        pacienteId = paciente[0].id;
    } else if(paciente.length === 0) {
        

        const nuevoPaciente = await insertarPacientes(
            nombre,
            apellidos,
            telefono,
            correo,
            fechaNacimiento
        )
        pacienteId = nuevoPaciente.insertId;

    }
    await insertarCita(
            pacienteId,
            tratamientoId,
            fecha,
            hora
        )
     res.status(201).json({
            mensaje: "cita registrada correctamente"
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({
            mensaje:"No se pudo editar al paciente"
        });
    }
} 
export const deleteCita = async (req, res) =>{
    try{
        const id = req.params.id;
        const response = await eliminarCita(id);

        if (response.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Cita no encontrada"
            });
        }
        res.status(200).json(response);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            mensaje:"No se pudo editar al paciente"
        });

    }
}
export const putCita = async (req, res) => {
    try{
        const { id } = req.params;
        const {
            tratamientoId,
            fecha,
            hora
        } = req.body;

        const response = await editarCita(id, {
            tratamientoId, 
            fecha, 
            hora
        })

        if(response.affectedRows === 0){
            return res.status(404).json({
                mensaje: "Paciente no encontrado"
            });
        }

        res.status(200).json(response);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            mensaje:"No se pudo editar al paciente"
        });
    }
}
