const btn_guardar = document.getElementById("btn_guardar");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputFecha = document.getElementById("fecha");
const inputCorreo = document.getElementById("correo")
const inputTelefono = document.getElementById("numero");

const URL_API = "http://localhost:3000/api/pacientes";

export const crearPaciente = async () => {

    const paciente = {
        nombre: inputNombre.value,
        apellidos: inputApellidos.value,
        telefono: inputTelefono.value,
        correo: inputCorreo.value,
        fechaNacimiento: inputFecha.value
    }

    const response = await fetch(URL_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paciente)
    });

    const data = await response.json();
    console.log(data);
}

btn_guardar.addEventListener('click', () => crearPaciente());