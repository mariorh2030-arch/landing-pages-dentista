const btnGuardar = document.getElementById("btn_guardar");
const inputNombre = document.getElementById("nombre");
const inputDescripcion = document.getElementById("descripcion");
const inputPrecio = document.getElementById("precio");
const tabla = document.getElementById("tablaTratamientos");
let tratamientoEditando = null;

const URL_API = "http://localhost:3000/api/tratamientos";

export const obtenerTratamientos = async () => {
    const response = await fetch(URL_API);
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensaje || "No se pudo obtener los tratamientos");
    return data;
};

export const crearTratamiento = async () => {

    const tratamiento = {
        nombre: inputNombre.value.trim(),
        descripcion: inputDescripcion.value.trim(),
        precio: Number(inputPrecio.value)
    };
    const response = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tratamiento)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensaje || "No se pudo crear el tratamiento");
    return data;
};



const mostrarTratamientoForm = (tratamiento) => {
    inputNombre.value = tratamiento.nombreTratamiento;
    inputDescripcion.value = tratamiento.descripcion;
    inputPrecio.value = tratamiento.precio;
};

const limpiarFormulario = () => {
    inputNombre.value = "";
    inputDescripcion.value = "";
    inputPrecio.value = "";
};

const actualizarTratamiento = async (id) => {
    const tratamiento = {
        nombre: inputNombre.value.trim(),
        descripcion: inputDescripcion.value.trim(),
        precio: Number(inputPrecio.value)
    };
    const response = await fetch(`${URL_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tratamiento)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensaje || "No se pudo editar el tratamiento");
    tratamientoEditando = null;
    return data;
};
const eliminarTratamiento = async (id) => {
    const response = await fetch(`${URL_API}/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensaje || "No se pudo eliminar el tratamiento");
    return data;
};

const mostrarTratamientos = (tratamientos) => {
    tabla.innerHTML = "";
    if (!Array.isArray(tratamientos)) return;

    tratamientos.forEach((tratamiento) => {
        const fila = document.createElement("tr");
        const botones = document.createElement("td");
        const btnEliminar = document.createElement("button");
        const btnEditar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEditar.textContent = "Editar";
        fila.innerHTML = `
            <td>${tratamiento.nombreTratamiento}</td>
            <td>${tratamiento.descripcion}</td>
            <td>$${Number(tratamiento.precio).toFixed(2)}</td>
        `;
        btnEliminar.addEventListener("click", async () => {
            try {
                await eliminarTratamiento(tratamiento.id);
                await cargarTratamientos();
            } catch (error) { alert(error.message); }
        });
        btnEditar.addEventListener("click", () => {
            tratamientoEditando = tratamiento.id;
            mostrarTratamientoForm(tratamiento);
        });
        botones.append(btnEliminar, btnEditar);
        fila.appendChild(botones);
        tabla.appendChild(fila);
    });
};

const cargarTratamientos = async () => {
    try {
        mostrarTratamientos(await obtenerTratamientos());
    } catch (error) {
        tabla.innerHTML = `<tr><td colspan="4">${error.message}</td></tr>`;
    }
};

cargarTratamientos();

btnGuardar.addEventListener("click", async () => {
    try {
        if (tratamientoEditando) {
            await actualizarTratamiento(tratamientoEditando);
        } else {
            await crearTratamiento();
        }
        await cargarTratamientos();
        limpiarFormulario();
    } catch (error) { alert(error.message); }
});
