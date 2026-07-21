
const tbody = document.getElementById("tablaCitas");
const btn_guardar = document.getElementById("btn_guardar");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora")
const inputTelefono = document.getElementById("numero");
const inputEmail = document.getElementById("email");
const selectTratamiento = document.getElementById("tratamiento");
const form = document.getElementById("formulario");
const buscar = document.getElementById("buscar");
const btnAbrirModal = document.getElementById("btn_abrir");
const btnCancelar = document.getElementById("btn_cancelar");

let citaEditado = null;
const URL_TRATAMIENTOS = "/api/tratamientos";
const URL_CITAS = "/api/citas";

const cargarTratamientosEnSelect = async () => {
    try {
        const response = await fetch(URL_TRATAMIENTOS);
        const tratamientos = await response.json();

        if (!response.ok) {
            throw new Error(tratamientos.mensaje || "No se pudieron cargar los tratamientos");
        }

        selectTratamiento.innerHTML = '<option value="" selected disabled>Selecciona un tratamiento</option>';

        tratamientos.forEach((tratamiento) => {
            const opcion = document.createElement("option");
            opcion.value = tratamiento.id;
            opcion.textContent = tratamiento.nombreTratamiento || tratamiento.nombre;
            selectTratamiento.appendChild(opcion);
        });

        selectTratamiento.disabled = false;
    } catch (error) {
        selectTratamiento.innerHTML = '<option value="">No se pudieron cargar los tratamientos</option>';
        console.error("Error al cargar tratamientos:", error);
    }
};

const obtenerCitas = async () => {
    const response = await fetch(URL_CITAS);

    if(!response.ok){
        throw new Error("Error al obtener las citas");
    }
    return await response.json();
}
const obtenerCitasPorId = async (id) => {
    const response = await fetch(`${URL_CITAS}/${id}`);

    if(!response.ok){
        throw new Error("Error al obtener las citas");
    }
    return await response.json();
}
const actualizarTarjeta = async () => {
    const cita = await obtenerCitas();

    const totales = cita.length;

    const pendiente = cita.filter(cita => cita.estado === "Pendiente").length;

    const confirmadas = cita.filter(cita => cita.estado === "Confirmada").length;

    const canceladas = cita.filter(cita => cita.estado === "Cancelada").length;

    document.getElementById("totales").textContent = totales;
    document.getElementById("pendientes").textContent = pendiente;
    document.getElementById("confirmadas").textContent = confirmadas;
    document.getElementById("canceladas").textContent = canceladas;


}
const buscarCita = async () => {
    const listaCitas = await obtenerCitas();
    let buscarNombre = buscar.value.toLowerCase();
    return listaCitas.filter(nombrePaciente => nombrePaciente.nombre.toLowerCase().includes(buscarNombre));
}
// let citaFiltrada = buscarCita();
const eliminarCita = async (id) => {
    const response = await fetch(`${URL_CITAS}/${id}`, {
        method: "DELETE"
    });
    return await response.json();
}
const editarElemento = (cita) => {
    form.style.display = "flex";
}
const mostrarCitasEnFormulario = async (id) => {
    const citaResult = await obtenerCitasPorId(id);
    const cita = Array.isArray(citaResult) ? citaResult[0] : citaResult;

    if (!cita) {
        console.error("No se encontró la cita para editar", id);
        return;
    }

    citaEditado = cita;
    inputNombre.value = cita.nombre || "";
    inputApellidos.value = cita.apellidos || "";
    inputFecha.value = cita.fecha ? cita.fecha.split("T")[0] : "";
    inputHora.value = cita.hora || "";
    inputTelefono.value = cita.telefono || "";
    inputEmail.value = cita.correo || "";
    selectTratamiento.value = cita.tratamientoId || "";
}

// const guardarElemento = () => {
//     const listaCitas = obtenerCitas();
//     const newCita = listaCitas.map((cita) => {
//         if(cita.id === citaEditado.id) {
//             return {
//                 id: cita.id,
//                 nombre: inputNombre.value,
//                 apellidos: inputApellidos.value,
//                 fecha: inputFecha.value,
//                 hora: inputHora.value,
//                 estado: citaEditado.estado,
//                 telefono: inputTelefono.value
            
//             }
//         } else {
//             return cita;
//         }
//     });
//     localStorage.setItem('citas', JSON.stringify(newCita));
//     mostrarCitas(buscarCita());
// }


const mostrarCitas = (citas) => {
    
    if(Array.isArray(citas))
    {
        tbody.innerHTML = "";
        citas.forEach((cita) => {
            
            const fila = document.createElement("tr");

            const tdNombre = document.createElement("td");
            tdNombre.textContent = cita.nombre;

            const tdApellidos = document.createElement("td");
            tdApellidos.textContent = cita.apellidos;

            const tdFecha = document.createElement("td")
            tdFecha.textContent = cita.fecha.split("T")[0];
            
            const tdHora = document.createElement("td");
            tdHora.textContent = cita.hora;

            const tdTelefono = document.createElement("td");
            tdTelefono.textContent = cita.telefono;

            const tdTratamiento = document.createElement("td");
            tdTratamiento.textContent = cita.tratamiento;

            const tdEstado = document.createElement("td");
            tdEstado.textContent = cita.estado;

            const btn_editar = document.createElement("button");
            const btn_eliminar = document.createElement("button");
            btn_eliminar.innerHTML = `<svg class="icons" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                `;
            btn_editar.innerHTML = `<svg class="icons" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                `;
            btn_eliminar.classList.add("btn_eliminar");
            btn_editar.classList.add("btn_editar");

            const tdAcciones = document.createElement("td")


            const id = cita.id;
            btn_eliminar.addEventListener('click',async  () => {
                await eliminarCita(id);
                await cargarCitas();
            });
            btn_editar.addEventListener('click', async () => {
                await mostrarCitasEnFormulario(id);
                form.style.display = "flex"
            });


            tdAcciones.appendChild(btn_editar);
            tdAcciones.appendChild(btn_eliminar)
            fila.appendChild(tdNombre);
            fila.appendChild(tdApellidos);
            fila.appendChild(tdFecha);
            fila.appendChild(tdHora);
            fila.appendChild(tdTelefono);
            fila.appendChild(tdTratamiento);
            fila.appendChild(tdEstado)
            fila.appendChild(tdAcciones);
            tbody.appendChild(fila);
        })
    }
}
btn_guardar.addEventListener('click', () => { guardarElemento(); form.style.display = "none"});
btnAbrirModal.addEventListener('click', () => form.style.display = "flex");
btnCancelar.addEventListener('click', () => form.style.display ="none");


const cargarCitas = async () => {
    const citas = await buscarCita();
    mostrarCitas(citas);
}
buscar.addEventListener('input', cargarCitas);
actualizarTarjeta();
cargarCitas();
cargarTratamientosEnSelect();
