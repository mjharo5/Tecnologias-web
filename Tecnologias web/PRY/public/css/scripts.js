
function obtenerTipoYLongitud() {
    const radioSeleccionado = document.querySelector('input[name="tipoID"]:checked');
    const tipo = radioSeleccionado ? radioSeleccionado.value : 'CI';
    
    let maxLongitud, mensaje;
    
    switch (tipo) {
        case 'CI':
            maxLongitud = 10;
            mensaje = 'debe tener exactamente 10 dígitos (Cédula).';
            break;
        case 'RUC':
            maxLongitud = 13;
            mensaje = 'debe tener exactamente 13 dígitos (RUC).';
            break;
        case 'Pasaporte':
            maxLongitud = 99; // Límite alto para no restringir
            mensaje = 'puede tener cualquier longitud (Pasaporte).';
            break;
        default:
            maxLongitud = 10;
            mensaje = 'debe tener 10 dígitos.';
    }

    return { tipo: tipo, max: maxLongitud, msg: mensaje };
}

function actualizarValidacion() {
    const inputID = document.getElementById('id_numero');
    const { tipo, max } = obtenerTipoYLongitud();

    if (tipo === 'Pasaporte') {
        inputID.removeAttribute('maxlength');
        inputID.placeholder = 'Número de Pasaporte (Cualquier longitud)';
    } else {
        inputID.setAttribute('maxlength', max); 
        inputID.placeholder = `Número de ${tipo} (Máx. ${max} dígitos)`;
    }
    
    inputID.value = ''; // Limpiar campo al cambiar el tipo
    validarLongitud(inputID);
}

function validarLongitud(input) {
    const { tipo, max, msg } = obtenerTipoYLongitud();
    const mensajeDiv = document.getElementById('mensajeID');
    const valor = input.value.trim();

    if (tipo === 'Pasaporte') {
        input.classList.remove('is-invalid', 'is-valid');
        mensajeDiv.textContent = `El número de identificación ${msg}`;
        return;
    }

    // Validación de solo dígitos para CI y RUC
    if (!/^\d*$/.test(valor)) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        mensajeDiv.textContent = `Error: Solo se permiten dígitos para ${tipo}.`;
        return;
    }
    
    // Comprobación de longitud exacta
    if (valor.length === 0) {
        input.classList.remove('is-invalid', 'is-valid');
        mensajeDiv.textContent = `El número de identificación ${msg}`; 
    } else if (valor.length !== max) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        mensajeDiv.textContent = `Error: El ${tipo} ${msg} Actualmente tiene ${valor.length}.`;
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        mensajeDiv.textContent = 'Validación OK: Longitud correcta.';
    }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', actualizarValidacion);
 
// funcion para botones activos
function marcarBotonActivo(botonPresionado) {
    const contenedor = botonPresionado.parentElement;
    const todosLosBotones = contenedor.querySelectorAll('.btn');
    
    todosLosBotones.forEach(btn => {
        btn.classList.remove('active');
    });
    
    botonPresionado.classList.add('active');
}

// simulacion de registrar y guardar
function guardarDatosCliente() {
    const inputID = document.getElementById('id_numero');
    validarLongitud(inputID);
    if (inputID.classList.contains('is-invalid')) {
        alert('No se puede registrar. Corrija el ID antes de continuar.');
        return;
    }

    const datos = {
        tipoID: document.querySelector('input[name="tipoID"]:checked').value,
        id_numero: inputID.value,
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        email: document.getElementById('email').value
    };

    console.log('Datos listos para enviar al servidor:', datos);
    alert('¡Registro simulado! (Se asume que el backend guardaría esta información)');
}

// simulacion de busqueda
function buscarDatosCliente() {
    const idBusqueda = document.getElementById('id_numero').value;

    if (idBusqueda.length === 0) {
        alert('Por favor, ingrese un ID en el campo superior para buscar.');
        return;
    }
    
    // ID de prueba para cargar datos (simulación de base de datos)
    if (idBusqueda === '1712345678' || idBusqueda === '1716788276') { // He incluido los dos IDs que usamos
        const datosEncontrados = {
            nombres: 'Andrea',
            apellidos: 'López Pérez',
            pais: 'EC',
            provincia: 'PICHINCHA',
            ciudad: 'QUITO',
            direccion: 'Av. Gran Colombia, N20',
            telefono: '22-555-444',
            celular: '098-765-4321',
            email: 'andrea.lopez@ejemplo.com',
        };

        // Rellenar el formulario
        document.getElementById('nombres').value = datosEncontrados.nombres;
        document.getElementById('apellidos').value = datosEncontrados.apellidos;
        document.getElementById('email').value = datosEncontrados.email;
        document.getElementById('pais').value = datosEncontrados.pais;
        document.getElementById('provincia').value = datosEncontrados.provincia;
        document.getElementById('ciudad').value = datosEncontrados.ciudad;
        document.getElementById('direccion').value = datosEncontrados.direccion;
        document.getElementById('telefono').value = datosEncontrados.telefono;
        document.getElementById('celular').value = datosEncontrados.celular;
        
        // Forzar estado de validación OK para el ID buscado
        document.getElementById('id_numero').classList.add('is-valid');
        document.getElementById('id_numero').classList.remove('is-invalid');
        document.getElementById('mensajeID').textContent = 'Validación OK: Datos cargados.';
        
        alert(`Cliente Andrea López encontrado y datos cargados.`);
        
    } else {
        alert('Cliente no encontrado. Intente con el ID "1712345678" para ver la simulación de carga de datos.');
    }
}

// limpiar formulario
function limpiarFormulario() {
    document.querySelector('form').reset(); 
    document.getElementById('id_numero').classList.remove('is-valid', 'is-invalid');
    actualizarValidacion(); 
}