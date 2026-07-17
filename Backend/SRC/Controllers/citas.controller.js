import { obtenerPacientePorTelefono } from "../Models/citas.model";
import { insertarPacientes } from "../Models/paciente.model";

const agendarCita = async (req, res) => {

    const {telefono} = req.body
    const paciente = await obtenerPacientePorTelefono(telefono);
    let pacienteId;

    if(paciente.length > 0){
        pacienteId = paciente[0].id;

        
    } else if(paciente.length === 0) {

        const {
            nombre,
            apellidos,
            telefono,
            correo,
            fechaNacimiento
        } = req.body;

        const nuevoPaciente = await insertarPacientes(
            nombre,
            apellidos,
            telefono,
            correo,
            fechaNacimiento
        )
    }
} 
