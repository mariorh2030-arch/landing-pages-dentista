import { obtenerPacientePorTelefono, insertarCita } from "../Models/citas.model.js";
import { insertarPacientes } from "../Models/paciente.model.js";

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
