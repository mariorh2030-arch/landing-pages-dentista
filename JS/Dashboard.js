

const tbody = document.getElementById("tablaCitas");
const listaCitas = JSON.parse(localStorage.getItem("citas")) || [];


const mostrarCitas = () => {
    if(listaCitas && Array.isArray(listaCitas))
    {
        const listaCitas = JSON.parse(localStorage.getItem("citas")) || [];
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

            const btn_eliminar = document.createElement("button");
            btn_eliminar.textContent = "🗑️";
            const btn_editar = document.createElement("button");
            btn_editar.textContent = "✏️"

            const tdAcciones = document.createElement("td")


            btn_eliminar.addEventListener('click', () => {
                const newList = listaCitas.filter(citas => citas.id !== cita.id )
                localStorage.setItem('citas', JSON.stringify(newList));
                mostrarCitas();
            });

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

mostrarCitas();