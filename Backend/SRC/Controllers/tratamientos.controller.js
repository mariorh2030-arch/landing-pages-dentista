import {insertarTratamientos, obtenerTratamientos, eliminarTratamientos, editarTratamientos} from "../Models/tratamientos.model.js";

export const getTratamientos = async (req, res) => {
    try{
        const tratamientos = await obtenerTratamientos();

        res.status(200).json(tratamientos);


    } catch (error){

        res.status(500).json({
            mensaje: "Error al obtener los tratamientos"
        });

    }
}

export const postTratamientos = async (req, res) => {

    try {

        const {
            nombre,
            descripcion,
            precio
        } = req.body;

        if(
            !nombre ||
            !descripcion ||
            !precio
        ){
            return res.status(400).json({
                mensaje: "Alguno de los campos esta vacio"
            });
        }
        const resultado = await insertarTratamientos(
            nombre,
            descripcion,
            precio
        );
        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje: "Tratamiento no encontrado"
            });
        }
        res.status(201).json(resultado);

    } catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:"Error al insertar tratamiento"
        });

    }

}
export const deleteTratamientos = async (req, res) => {
    try{
        const id = req.params.id;

        const response = await eliminarTratamientos(id);

        if (response.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Tratamiento no encontrado"
            });
        }

        res.status(200).json(response);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            mensaje:"No se pudo eliminar el tratamiento"
        });
    }
}
 export const putTratamientos = async (req, res) => {
    try{
        const { id } = req.params;
        const  {
            nombre,
            descripcion,
            precio
        } = req.body

        if(
            !nombre ||
            !descripcion ||
            !precio
        ){
            return res.status(400).json({
                mensaje: "Alguno de los campos esta vacio"
            });
        }

        const response = await editarTratamientos(id, {
            nombre,
            descripcion,
            precio
        });

        if(response.affectedRows === 0){
            return res.status(404).json({
                mensaje: "Tratamiento no encontrado"
            });
        }

        res.status(200).json(response);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje:"No se pudo editar el tratamiento"
        });
    }
}
          