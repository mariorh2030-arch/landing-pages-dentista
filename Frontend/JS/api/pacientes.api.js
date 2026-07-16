const btn_guardar = document.getElementById("btn_guardar");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputFecha = document.getElementById("fecha");
const inputCorreo = document.getElementById("correo")
const inputTelefono = document.getElementById("numero");
const tabla = document.getElementById("tablaPacientes");
let pacienteEditando = null;

const URL_API = "http://localhost:3000/api/pacientes";

export const obtenerPacientes = async () => {
    const response = await fetch(URL_API);

    if(!response.ok)
    {
        throw new Error("Error al obtener los pacientes");
    }

    return await response.json();
}

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

const eliminarPacientes = async (id) => {
    const respuesta = await fetch(`http://localhost:3000/api/pacientes/${id}`, {
        method: "DELETE"
    });

    return await respuesta.json();
    mostrarPacientes();
}
const mostrarPacientesForm = (paciente) => {
        inputNombre.value = paciente.nombre;
        inputApellidos.value = paciente.apellidos;
        inputTelefono.value = paciente.telefono;
        inputCorreo.value = paciente.correo;
        inputFecha.value = paciente.fechaNacimiento.split("T")[0];
}
const limpiarFormulario = () => {
    inputNombre.value = "";
    inputApellidos.value = "";
    inputTelefono.value = "";
    inputCorreo.value = "";
    inputFecha.value = ""
}

const actualizarPaciente = async (id) => {
    const paciente = {
        nombre: inputNombre.value,
        apellidos: inputApellidos.value,
        telefono: inputTelefono.value,
        correo: inputCorreo.value,
        fechaNacimiento: inputFecha.value
    }
    const response = await fetch(`http://localhost:3000/api/pacientes/${id}`, {
        method: "PUT",
         headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paciente)
    });

    const data = response.json();
    console.log("error backen: ", data);
    if(!response.ok){
        throw new Error(data.mensaje);
    }
    pacienteEditando = null;
}
const mostrarPacientes = (pacientes) => {
    tabla.innerHTML= "";

    if (!Array.isArray(pacientes)) {
        console.error("Se esperaba un arreglo:", pacientes);
        return;
    }

    pacientes.forEach((paciente) => {
        const id = paciente.id;
        const fila = document.createElement("tr");
        const btn_eliminar = document.createElement("button");
        const btn_editar = document.createElement("button");
        const botones = document.createElement("td");
        btn_eliminar.textContent = "eliminar";
        btn_editar.textContent = "editar";

        fila.innerHTML = `
            <td>${paciente.nombre}</td>
            <td>${paciente.apellidos}</td>
            <td>${paciente.telefono}</td>
            <td>${paciente.correo}</td>
            <td>${paciente.fechaNacimiento.split("T")[0]}</td>
        `;

        btn_eliminar.addEventListener('click', async () => { 
            await eliminarPacientes(id); 
            await cargarPacientes() 
        });

        btn_editar.addEventListener('click', async () => { 
            pacienteEditando = id; 
            mostrarPacientesForm(paciente); 
        });

        botones.appendChild(btn_eliminar);
        botones.appendChild(btn_editar);
        fila.appendChild(botones);
        tabla.appendChild(fila);
    });

}
const cargarPacientes = async () => {
    const pacientes = await obtenerPacientes();
    mostrarPacientes(pacientes);
}
cargarPacientes();
btn_guardar.addEventListener('click', async () => { 
    if(pacienteEditando){
        await actualizarPaciente(pacienteEditando);
        await cargarPacientes();
    } else {
        await crearPaciente();
        await cargarPacientes();
    }
    limpiarFormulario();
});
