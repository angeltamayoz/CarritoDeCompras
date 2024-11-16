const d = document;
let tablaCarrito = d.querySelector(".cart-table tbody");
let resumenSubtotal = d.querySelector(".sub-total");
let resumenDescuento = d.querySelector(".promo");
let resumenTotal = d.querySelector(".total");
let destino = d.querySelector(".destino");
let resumenDomicilio = d.querySelector(".valor-domi");
let btnResumen = d.querySelector(".btn-resumen");
document.addEventListener("DOMContentLoaded", ()=> {
    cargarProducto();
    actualizarContadorCarrito();
});

function cargarProducto() {
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    tablaCarrito.innerHTML = "";
    if(todosProductos.length != 0) {
        todosProductos.forEach((info, i) => {
            let fila = d.createElement("tr");
        fila.innerHTML = `
        <td class="d-flex justify-content-around align-items-center">
            <span onclick="borrarProducto(${i});" class="btn btn-danger">X</span>
            <img src="${info.imagen}" width="80px">
            ${info.nombre}
        </td>
        <td>$${info.precio}</td>
        <td> 
            <div class="quantity quantity-wrap">
                <div class="decrement" onclick="actualizarCantidad(${i}, -1)"> <i class="fa-solid fa-minus"></i> </div>
                <input class="number" type="text" name="quantity" value="${info.cantidad || 1}" maxlenght="2" size="1" readonly>
                <div class="increment" onclick="actualizarCantidad(${i}, 1)"> <i class="fa-solid fa-plus"></i> </div>
            </div>
        </td>
        <td> $${(info.precio * info.cantidad).toFixed(3)} </td>
        `;
        tablaCarrito.appendChild(fila);
        });
    }else{
        let fila = d.createElement("tr");
        fila.innerHTML = `<td colspan="4"><p class="text-center  fs-3">No hay productos en el carrito</p></td>`;
        tablaCarrito.appendChild(fila);
    }
    resumenCompra();
}

function actualizarCantidad(pos, cambio){
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    if(todosProductos[pos]){
        todosProductos[pos].cantidad = (todosProductos[pos].cantidad || 1) + cambio;

        if(todosProductos[pos].cantidad < 1){
            todosProductos[pos].cantidad = 1;
        }
        localStorage.setItem("list-cart", JSON.stringify(todosProductos));
        actualizarContadorCarrito();
        cargarProducto();
    }
}

function borrarProducto(pos) {
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    todosProductos.splice(pos, 1);
    localStorage.setItem("list-cart", JSON.stringify(todosProductos));
    actualizarContadorCarrito();
    cargarProducto();
}

function resumenCompra() {
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    let subtotal = 0;
    todosProductos.forEach(info => {
        subtotal += info.precio * info.cantidad;
    });
    let descuento = (subtotal > 100.000) ? subtotal * 0.1 : 0;
    let domicilio = 0;
    switch (destino.value) {
        case "Medellín": default: domicilio = 0; break;    
        case "Bello": domicilio = 10.000; break;
        case "Copacabana": case "Caldas": case "La Estrella": domicilio = 20.000; break;
        case "Envigado": case "Itagui": case "Sabaneta": domicilio = 15.000; break;
    }

    let total = subtotal - descuento + domicilio;
    
    resumenSubtotal.textContent = `${subtotal.toFixed(3)}`;
    resumenDescuento.textContent = `${descuento.toFixed(3)}`;
    resumenTotal.textContent = `${total.toFixed(3)}`;
    resumenDomicilio.textContent = `${domicilio.toFixed(3)}`;
}

destino.addEventListener("change", ()=>{
    resumenCompra();
});

btnResumen.addEventListener("click", ()=>{
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    let resumen = {
        ...todosProductos,
    }
    resumen.subtotal = resumenSubtotal.textContent;
    resumen.descuento = resumenDescuento.textContent;
    resumen.destino = destino.value;
    resumen.domicilio = resumenDomicilio.textContent;
    resumen.total = resumenTotal.textContent;

    localStorage.setItem("pro-resumen", JSON.stringify(resumen));

    location.href = "checkout.html";
});