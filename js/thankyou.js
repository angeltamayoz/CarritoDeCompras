document.addEventListener("DOMContentLoaded", () => {
    // se captura el contenedor donde se mostrarán los datos
    const resumenContainer = document.querySelector(".contenido");

    // se obtiene los datos del localStorage
    let datosEntrega = JSON.parse(localStorage.getItem("datosEntrega"));
    let carritoItems = JSON.parse(localStorage.getItem("list-cart"));
    
    if (datosEntrega && carritoItems) {
        let contenido = '<h5 class="mb-32">Resumen de Orden</h5>';

        // Verificamos si existe datosEntrega.resumen
        if (datosEntrega != null) {
            contenido += `
                <hr>
                <div class="row">
                    <div class="col-12">
                        <p><strong>Subtotal:</strong> $${datosEntrega[0].resumen.subtotal}</p>
                        <p><strong>Valor Domicilio:</strong> $${datosEntrega[0].resumen.domicilio}</p>
                        <p><strong>Descuento:</strong> $${datosEntrega[0].resumen.descuento}</p>
                        <p><strong>Total:</strong> $${datosEntrega[0].resumen.total}</p>
                        <p><strong>Sobrecosto:</strong> $${datosEntrega[0].resumen.sobrecosto}</p>
                    </div>
                </div>
                <hr>
            `;
        } else {
            contenido += '<p>No se encontró información del resumen de la orden.</p>';
        }

        contenido += `
            <div class="row">
                <h5 class="mt-32 mb-32 text-center">Datos de Entrega</h5>
                    <div class="col-6 text-center">
                        <p><strong>Nombres:</strong> ${datosEntrega[0].nombres || 'N/A'}</p>
                    </div>
                    <div class="col-6 text-center">
                        <p><strong>Apellidos:</strong> ${datosEntrega[0].apellidos || 'N/A'}</p>
                    </div>
                    <div class="col-6 text-center">
                        <p><strong>Email:</strong> ${datosEntrega[0].email || 'N/A'}</p>
                    </div>
                    <div class="col-6 text-center">
                        <p><strong>Teléfono:</strong> ${datosEntrega[0].telefono || 'N/A'}</p>
                    </div>
                    <div class="col-6 text-center">
                        <p><strong>Dirección:</strong> ${datosEntrega[0].direccion || 'N/A'}</p>
                    </div>
                    <div class="col-6 text-center">
                        <p><strong>Dirección 2:</strong> ${datosEntrega[0].direccion2 || 'No proporcionada'}</p>
                    </div>
                    <div class="col-12 text-center">
                        <p><strong>Notas:</strong> ${datosEntrega[0].notas || 'Sin notas adicionales'}</p>
                    </div>
            </div>
            <hr>

            <h5 class="mt-32 mb-32">Productos Comprados</h5>
        `;

        // Agregar los productos comprados al resumen
        carritoItems.forEach(item => {
            contenido += `
                <p><strong>${item.nombre || 'Producto sin nombre'}</strong> - Cantidad: ${item.cantidad || 'N/A'}, Precio: $${item.precio || 'N/A'}</p>
            `;
        });

        // se muestra los datos en la página
        resumenContainer.innerHTML = contenido;

        console.log("Contenido generado:", contenido);
    } else {
        // si no hay datos se muestra un mensaje de error
        resumenContainer.innerHTML = "<p>Error: No se encontraron datos de la orden o del carrito.</p>";
        console.log("No se encontraron datos en el localStorage");
    }

    let btnFinalizar = document.querySelector(".btnFinalizar");

    btnFinalizar.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
    });
});