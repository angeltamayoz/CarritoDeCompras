function actualizarContadorCarrito() {
    let todosProductos = JSON.parse(localStorage.getItem("list-cart")) || [];
    let totalProductos = todosProductos.reduce((total, producto) => total + (producto.cantidad || 1), 0);
    localStorage.setItem("cartCount", totalProductos);
    
    // Actualizar el contador en la interfaz si existe
    let contadorElement = document.querySelector(".cart-count");
    if (contadorElement) {
        contadorElement.textContent = totalProductos;
    }
}

function obtenerContadorCarrito() {
    return localStorage.getItem("cartCount") || "0";
}