const d = document;
let tablaResumen = d.querySelector(".cart-summary-detail");
let totalPedido = d.querySelector("#total");
let tipoPago = d.querySelectorAll(".radio");
let pagoSeleccion = 2;
let totales = JSON.parse(localStorage.getItem("pro-resumen")) || {};
let divSobrecosto = d.querySelector("#sobrecosto");

document.addEventListener("DOMContentLoaded", ()=> {
    cargarProducto();
});

function cargarProducto() {
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    tablaResumen.innerHTML = "";
    if(todosProductos.length != 0) {
        todosProductos.forEach((info, i) => {
                let fila = d.createElement("div");
                fila.className = "d-flex justify-content-between align-items-center mb-24";
                fila.innerHTML = `
                <p class="lead color-black">${info.nombre}</p>
                <p class="lead">$${info.precio}</p>
                `;
                tablaResumen.appendChild(fila);
        });

        let fila = d.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center mb-24";
        fila.innerHTML = `
        <p class="lead color-black">VALOR DOMICILIO</p>
        <p class="lead">$${totales.domicilio}</p>
        `;
        tablaResumen.appendChild(fila);

        fila = d.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center mb-24";
        fila.innerHTML = `
        <p class="lead color-black">DESCUENTO PROMO</p>
        <p class="lead">$${totales.descuento}</p>
        `;
        tablaResumen.appendChild(fila);

        fila = d.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center mb-24";
        fila.innerHTML = `
        <p class="lead color-black">SUBTOTAL</p>
        <p class="lead">$${totales.subtotal}</p>
        `;
        tablaResumen.appendChild(fila);

        totalPedido.innerHTML = `$${totales.total}`;
    }else{
        let fila = d.createElement("tr");
        fila.innerHTML = `<td colspan="4"><p class="text-center  fs-3">No hay productos en el carrito</p></td>`;
        tablaResumen.appendChild(fila);
    }
}

tipoPago.forEach((input, i) => {
    input.addEventListener("click", () => {
        seleccionarTipoPago(i);
    });
});

function seleccionarTipoPago(pos) {
    if (pos === 0) {
        pagoSeleccion = 1;
        let sobrecosto = (totales.total * 0.05).toFixed(3);
        divSobrecosto.innerHTML = `$${sobrecosto}`;
    }else if (pos === 1) {
        pagoSeleccion = 2;
        divSobrecosto.innerHTML = `$0.00`;
    } else if (pos === 2) {
        pagoSeleccion = 3;
        divSobrecosto.innerHTML = `$0.00`;
    }
}