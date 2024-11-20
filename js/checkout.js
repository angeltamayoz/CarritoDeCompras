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
                <p class="lead" id="precio">$${info.precio}</p>
                `;
                tablaResumen.appendChild(fila);
        });

        let fila = d.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center mb-24";
        fila.innerHTML = `
        <p class="lead color-black">VALOR DOMICILIO</p>
        <p class="lead" id="domicilio">$${totales.domicilio}</p>
        `;
        tablaResumen.appendChild(fila);

        fila = d.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center mb-24";
        fila.innerHTML = `
        <p class="lead color-black">DESCUENTO PROMO</p>
        <p class="lead" id="descuento">$${totales.descuento}</p>
        `;
        tablaResumen.appendChild(fila);

        fila = d.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center mb-24";
        fila.innerHTML = `
        <p class="lead color-black">SUBTOTAL</p>
        <p class="lead" id="subtotal">$${totales.subtotal}</p>
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

const btnPagar = document.querySelector(".btnPagar");
    
// evento para capturar datos al hacer clic en "Pagar Orden"
btnPagar.addEventListener("click", () => {
     // se captura datos del formulario
const nombres = document.querySelector("input[name='f-name']").value;
const apellidos = document.querySelector("input[name='l-name']").value;
const email = document.querySelector("input[name='email']").value;
const telefono = document.querySelector("input[name='phone']").value;
const direccion = document.querySelector("input[name='address']").value;
const direccion2 = document.querySelector("input[name='address2']").value || "No especificada";
const notas = document.querySelector("textarea[name='noe']").value || "Sin notas";

// se captura resumen de la orden
let resumen = {
    subtotal: document.querySelector("#subtotal").textContent,
    domicilio: document.querySelector("#domicilio").textContent,
    descuento: document.querySelector("#descuento").textContent,
    total: document.querySelector("#total").textContent,
    sobrecosto: document.querySelector("#sobrecosto").textContent
};

// se combina datos del formulario y resumen
const datosEntrega = {
    nombres,
    apellidos,
    email,
    telefono,
    direccion,
    direccion2,
    notas,
    resumen
};

// se guarda los datos en localStorage
// localStorage.setItem("datosEntrega", JSON.stringify(datosEntrega));
let datosDeEntrega = JSON.parse(localStorage.getItem("datosEntrega")) || [];
datosDeEntrega.push(datosEntrega);
localStorage.setItem("datosEntrega", JSON.stringify(datosDeEntrega));

// se redirige al archivo thankyou.html
location.href = "thankyou.html";
});