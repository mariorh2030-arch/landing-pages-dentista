import { obtenerPacientes } from "../Models/paciente.model.js";
import { insertarPacientes } from "../Models/paciente.model.js";

const getPacientes = async (req, res) => {
    try{
        const pacientes = await obtenerPacientes();

        res.status(200).json(pacientes);


    } catch (error){

        res.status(500).json({
            mensaje: "Error al obtener los pacientes"
        });

    }
}

const postPacientes = async (req, res) => {

    try {

        const {
            nombre,
            apellidos,
            telefono,
            correo,
            fechaNacimiento
        } = req.body;

        const resultado = await insertarPacientes(
            nombre,
            apellidos,
            telefono,
            correo,
            fechaNacimiento
        );

        res.status(201).json(resultado);

    } catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:"Error al insertar paciente"
        });

    }

}
export {getPacientes, postPacientes}