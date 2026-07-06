const btn_agendar = document.getElementById("btn_agendar");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora")
const inputTelefono = document.getElementById("numero");
const error = document.getElementById("error");


const limpiarInputs = () => {
    inputNombre.value = "";
    inputApellidos.value = "";
    inputFecha.value = "";
    inputHora.value = "";
    inputTelefono.value = "";
}

btn_agendar.addEventListener('click', () => {

    if(inputNombre.value.trim() === "" ||
        inputApellidos.value.trim() === "" ||
        inputFecha.value === "" ||
        inputHora.value === "" ||
        inputTelefono.value.trim() === "" 
    )
    {
        return error.textContent = "alguno de los campos esta vacio"
    }

    if(inputTelefono.value.length !== 10)
    {
       return error.textContent = "El telefono debe de contener 10 digitos";
    }
    error.textContent = ""

    const citas = {
        id: crypto.randomUUID(),
        nombre: inputNombre.value.trim(),
        apellidos: inputApellidos.value.trim(),
        fecha: inputFecha.value.trim(),
        hora: inputHora.value.trim(),
        telefono: inputTelefono.value.trim(),
        estado: "pendiente"
    }

    let listaCitas = JSON.parse(localStorage.getItem('citas')) || [];
    listaCitas.push(citas);
    localStorage.setItem('citas', JSON.stringify(listaCitas));
    limpiarInputs();
    

});

