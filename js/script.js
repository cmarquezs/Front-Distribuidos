const header = document.querySelector("header");
const footer = document.querySelector("footer");

// Función para cargar el contenido del footer desde un archivo externo
function loadHeaderContent() {
    fetch('view-header.html')
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data;
        })
        .catch(error => console.error('Error fetching footer content:', error));
}
function loadFooterContent() {
    fetch('view-footer.html')
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data;
        })
        .catch(error => console.error('Error fetching footer content:', error));
}
loadHeaderContent();
loadFooterContent();



//  Script login
function loadAdminContent() {

    // Obtener los valores ingresados
    var email = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;
  
    // Validaciones
    if(email == "admin@motofacil.co" && password == "1234") {
       
      // Redirige a la página view-admin-panel.html 
      window.location.href = 'view-admin-panel.html';
  
    } else {
       
      // Si falla la validación, mostrar mensaje de error
      alert("Datos de acceso incorrectos");
  
    }
  
  }
loadAdminContent();



// *********** Funciones Motos ************** 
function obtenerDatosMotos() {
    // Cuando la ventana está completamente cargada, realiza la solicitud al servidor
    fetch('http://localhost:3000/motos')
        .then(response => {
            console.log('Server Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Data from Server:', data);
            llenarTablaMotos(data);
        })
        .catch(error => console.error('Error fetching data:', error));
};

function llenarTablaMotos(datos) {
    var tablaBody = document.getElementById('tablaMotosBody');

    // Limpiar el contenido previo de la tabla
    tablaBody.innerHTML = '';

    // Iterar sobre los datos y agregar filas a la tabla
    datos.forEach(moto => {
        var fila = document.createElement('tr');

        // Crear celdas y asignar valores
        var idMotoCell = document.createElement('td');
        var modeloCell = document.createElement('td');
        var marcaCell = document.createElement('td');
        var precioCell = document.createElement('td');
        var accionesMotoCell = document.createElement('td');

        idMotoCell.textContent = moto.Id_moto;
        modeloCell.textContent = moto.Modelo;
        marcaCell.textContent = moto.Marca;
        precioCell.textContent = moto.Precio;

        // Crear botones de editar y borrar
        var botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.className = 'btn btn-outline-info';
        botonEditar.style.marginRight = '8px';
        botonEditar.addEventListener('click', function () {
            // Lógica para editar la moto
            alert('Editar Moto con ID ' + moto.Id_moto);

        });
        accionesMotoCell.appendChild(botonEditar);

        var botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'Borrar';
        botonBorrar.className = 'btn btn-outline-danger';
        botonBorrar.addEventListener('click', function () {
            // Lógica para borrar el moto
            alert('Eliminar Moto con ID ' + moto.Id_moto);
            borrarMotos(moto.Id_moto);
        });

        // Agregar botones a la celda de acciones
        accionesMotoCell.appendChild(botonEditar);
        accionesMotoCell.appendChild(botonBorrar);

        // Agregar celdas a la fila
        fila.appendChild(idMotoCell);
        fila.appendChild(modeloCell);
        fila.appendChild(marcaCell);
        fila.appendChild(precioCell);
        fila.appendChild(accionesMotoCell);

        // Agregar la fila a la tabla
        tablaBody.appendChild(fila);
    });
}

function contarMotos() {
    fetch('http://localhost:3000/contar/motos')
        .then(response => response.json())
        .then(data => {
            // Imprime la respuesta completa para entender su estructura
            console.log('Respuesta del servidor:', data);

            const valorContador = parseInt(data.valor, 10);
            console.log(valorContador);

            // Actualizar el contenido del h3 con el nuevo valor
            document.getElementById('ctd-motos').textContent = valorContador;
        })
        .catch(error => console.error('Error al obtener el valor:', error));
}

function borrarMotos(idMoto) {
    var urlBorrar = 'http://localhost:3000/motos/delete/' + idMoto;

    fetch(urlBorrar, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            console.log('Moto borrada:', data);
            obtenerDatosMotos();
        })
        .catch(error => console.error('Error al borrar la Moto:', error));
}

obtenerDatosMotos();
contarMotos();

