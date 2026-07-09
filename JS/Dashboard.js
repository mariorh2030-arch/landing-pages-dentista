
const tbody = document.getElementById("tablaCitas");
const btn_guardar = document.getElementById("btn_guardar");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora")
const inputTelefono = document.getElementById("numero");
const form = document.getElementById("formulario");
const buscar = document.getElementById("buscar");
const btnAbrirModal = document.getElementById("btn_abrir");
const btnCancelar = document.getElementById("btn_cancelar");

let citaEditado = null;

const obtenerCitas = () => {
    return JSON.parse(localStorage.getItem("citas")) || [];
}
const buscarCita = () => {
    const listaCitas = obtenerCitas();
    let buscarNombre = buscar.value.toLowerCase();
    return listaCitas.filter(nombrePaciente => nombrePaciente.nombre.toLowerCase().includes(buscarNombre));
}
let citaFiltrada = buscarCita();
const eliminarElemento = (cita) => {
    const listaCitas = obtenerCitas();
    const newList = listaCitas.filter(citas => citas.id !== cita.id )
    localStorage.setItem('citas', JSON.stringify(newList));
    mostrarCitas(buscarCita());
}
const editarElemento = (cita) => {
    const listaCitas = obtenerCitas();
    const citaEditar = listaCitas.find(citas => citas.id === cita.id)

    form.style.display = "flex";

    inputNombre.value = citaEditar.nombre;
    inputApellidos.value = citaEditar.apellidos;
    inputFecha.value = citaEditar.fecha;
    inputHora.value = citaEditar.hora;
    inputTelefono.value = citaEditar.telefono;

    citaEditado = citaEditar;
}

const guardarElemento = () => {
    const listaCitas = obtenerCitas();
    const newCita = listaCitas.map((cita) => {
        if(cita.id === citaEditado.id) {
            return {
                id: cita.id,
                nombre: inputNombre.value,
                apellidos: inputApellidos.value,
                fecha: inputFecha.value,
                hora: inputHora.value,
                estado: citaEditado.estado,
                telefono: inputTelefono.value
            
            }
        } else {
            return cita;
        }
    });
    localStorage.setItem('citas', JSON.stringify(newCita));
    mostrarCitas(buscarCita());
}


const mostrarCitas = (citaFiltrada) => {
    const listaCitas = citaFiltrada;
    if(listaCitas && Array.isArray(listaCitas))
    {
        tbody.innerHTML = "";
        listaCitas.forEach((cita) => {
            
            const fila = document.createElement("tr");

            const tdNombre = document.createElement("td");
            tdNombre.textContent = cita.nombre;

            const tdApellidos = document.createElement("td");
            tdApellidos.textContent = cita.apellidos;

            const tdFecha = document.createElement("td")
            tdFecha.textContent = cita.fecha;
            
            const tdHora = document.createElement("td");
            tdHora.textContent = cita.hora;

            const tdTelefono = document.createElement("td");
            tdTelefono.textContent = cita.telefono;

            const tdEstado = document.createElement("td");
            tdEstado.textContent = cita.estado;

            const btn_editar = document.createElement("button");
            const btn_eliminar = document.createElement("button");
            btn_eliminar.textContent = "🗑️";
            btn_editar.textContent = "✏️";

            const tdAcciones = document.createElement("td")


            btn_eliminar.addEventListener('click', () => eliminarElemento(cita));
            btn_editar.addEventListener('click', () => editarElemento(cita));


            tdAcciones.appendChild(btn_editar);
            tdAcciones.appendChild(btn_eliminar)
            fila.appendChild(tdNombre);
            fila.appendChild(tdApellidos);
            fila.appendChild(tdFecha);
            fila.appendChild(tdHora);
            fila.appendChild(tdTelefono);
            fila.appendChild(tdEstado)
            fila.appendChild(tdAcciones);
            tbody.appendChild(fila);
        })
    }
}
btn_guardar.addEventListener('click', () => { guardarElemento(); form.style.display = "none"});
btnAbrirModal.addEventListener('click', () => form.style.display = "flex");
btnCancelar.addEventListener('click', () => form.style.display ="none");
buscar.addEventListener('input', () => mostrarCitas(buscarCita()));


mostrarCitas(citaFiltrada);