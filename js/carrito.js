const d = document;
let btnProduct = d.querySelectorAll(".btn-product");
let contadorCarrito = d.querySelector(".contar-pro");
let listadoCarrito = d.querySelector(".list-cart tbody");

document.addEventListener("DOMContentLoaded", () => {
    cargarProLocalStorage();
    actualizarContadorCarrito();
});

btnProduct.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        infoProducto(i);
        actualizarContadorCarrito();
    });
});

function agregarProducto(info) {
    let fila = d.createElement("tr");
    fila.innerHTML = `
    <td>${listadoCarrito.children.length + 1}</td>
    <td><img src="${info.imagen}" width="80px"></td>
    <td>${info.nombre}</td>
    <td>$${info.precio}</td>
    <td> <span onclick="borrarProducto(this);" class="btn btn-danger">X</span></td>
    `;
    listadoCarrito.appendChild(fila);
}

function infoProducto(pos) {
    let producto = btnProduct[pos].parentElement.parentElement.parentElement;
    let info = {
        imagen: producto.querySelector("img").src,
        nombre: producto.querySelector("h3").textContent,
        precio: producto.querySelector("h5").textContent.split("$")[1],
        cantidad: 1
    };
    agregarProducto(info);
    guardarProLocalStorage(info);
}

function borrarProducto(btn) {
    let fila = btn.parentElement.parentElement;
    let index = Array.from(listadoCarrito.children).indexOf(fila);
    fila.remove();
    actualizarContadorCarrito();
    eliminarProLocalStorage(index);
    actualizarNumerosProductos();
}

function guardarProLocalStorage(producto) {
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    todosProductos.push(producto);
    localStorage.setItem("list-cart", JSON.stringify(todosProductos));
}

function eliminarProLocalStorage(index) {
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    todosProductos.splice(index, 1);
    localStorage.setItem("list-cart", JSON.stringify(todosProductos));
}

function cargarProLocalStorage() {
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    todosProductos.forEach((info) => {
        agregarProducto(info);
    });
    actualizarNumerosProductos();
    actualizarContadorCarrito();
}

contadorCarrito.parentElement.addEventListener("click", () => {
    listadoCarrito.parentElement.classList.toggle("ocultar");
});

function actualizarNumerosProductos() {
    let filas = listadoCarrito.querySelectorAll("tr");
    filas.forEach((fila, index) => {
        fila.firstElementChild.textContent = index + 1;
    });
}

function actualizarContadorCarrito() {
    contadorCarrito.textContent = listadoCarrito.children.length;
}