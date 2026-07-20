const btn_agendar = document.getElementById("btn_agendar");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputFechaNacimiento = document.getElementById("fechaNacimiento");
const inputCorreo = document.getElementById("correo");
const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora")
const inputTelefono = document.getElementById("numero");
const selectTratamiento = document.getElementById("tratamiento");
const error = document.getElementById("error");

const URL_TRATAMIENTOS = "/api/tratamientos";
const URL_CITAS = "/api/citas";

const cargarTratamientosEnSelect = async () => {
    try {
        const response = await fetch(URL_TRATAMIENTOS);
        const tratamientos = await response.json();

        if (!response.ok) {
            throw new Error(tratamientos.mensaje || "No se pudieron cargar los tratamientos");
        }

        selectTratamiento.innerHTML = "";

        const opcionInicial = document.createElement("option");
        opcionInicial.value = "";
        opcionInicial.textContent = "Selecciona un tratamiento";
        opcionInicial.selected = true;
        opcionInicial.disabled = true;
        selectTratamiento.appendChild(opcionInicial);

        tratamientos.forEach(({ id, nombreTratamiento }) => {
            const opcion = document.createElement("option");
            opcion.value = id;
            opcion.textContent = nombreTratamiento;
            selectTratamiento.appendChild(opcion);
        });

        selectTratamiento.disabled = false;
    } catch (err) {
        selectTratamiento.innerHTML = "<option value=\"\">No se pudieron cargar los tratamientos</option>";
        error.textContent = err.message;
    }
};

cargarTratamientosEnSelect();



const limpiarInputs = () => {
    inputNombre.value = "";
    inputApellidos.value = "";
    inputFecha.value = "";
    inputHora.value = "";
    inputCorreo.value = "";
    inputTelefono.value = "";
    inputFechaNacimiento.value = "";
    selectTratamiento.value = "";
}

const insertarCita = async () => {
    const nuevaCita = {
        nombre: inputNombre.value,
        apellidos: inputApellidos.value,
        telefono: inputTelefono.value,
        correo: inputCorreo.value,
        fechaNacimiento: inputFechaNacimiento.value,
        tratamientoId: selectTratamiento.value,
        fecha: inputFecha.value,
        hora: inputHora.value
    }
    const response = await fetch(URL_CITAS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaCita)
    });


    if (!response.ok) {
        throw new Error("No se pudo registrar la cita");
    }

    const data = await response.json();
    console.log(data);
    console.log(nuevaCita);
}

btn_agendar.addEventListener('click', async () => {
    await insertarCita();
    limpiarInputs();
});

