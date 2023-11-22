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

function loadAdminContent(){
    // Obtén el formulario
    var form = document.getElementById('loginForm');
        
    // Simula el envío del formulario (puedes agregar validaciones aquí si es necesario)
    form.submit();

    // Redirige a la página view-admin-panel
    window.location.href = 'view-admin-panel.html';
}