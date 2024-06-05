let productos = [];
fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    });

const contenedorProductos = document.querySelector(".obras-artistas");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <div class="product-card h-100" style="width: 18rem;" data-product-id="${producto.id}">
                <div class="product-card__container">
                    <div class="product-card__img">
                        <img src="${producto.images}" alt="${producto.name}" />
                    </div>
                </div>
                <br>
                <div class="product-card__description">
                    <h3 class="card-title">${producto.name}</h3>
                    <br>
                    <p class="card-artist">${producto.artist}</p>
                    <p class="card-text">${producto.description}</p>
                    <div class="card">
                     <div class="card-header"> Ficha Técnica </div>
                         <ul class="list-group list-group-flush" id="ficha-tecnica">
                             <li class="list-group-item"> Técnica: ${producto.tecnica}</li>
                             <li class="list-group-item"> Materiales: ${producto.materiales}</li>
                             <li class="list-group-item"> Dimensiones: ${producto.ancho} x ${producto.altura} x ${producto.profundidad}</li>
                          </ul>     
                    </div>
                    <br>
                    <div class="product-card__price">$${producto.price}</div>
                    <button class="producto-agregar" id="${producto.id}" type="submit" >Agregar al carrito</button>
               </div>
          </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}
function actualizarBotonesAgregar() {
    document.querySelectorAll(".producto-agregar").forEach(boton => {
        boton.addEventListener("click", function () {


            if (localStorage.getItem('productosEnCarrito') == null) {
                console.log("Disponible")

                const productCard = this.closest('.product-card');
                const productoId = productCard.dataset.productId;
                const producto = productos.find(p => p.id == productoId);
                console.log(producto);
                localStorage.setItem('Producto', productoId);
                localStorage.setItem('productosEnCarrito', 1);
                actualizarNumeroCarrito();

                Toastify({
                    text: "Producto agregado",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #4b33a8, #785ce9)",
                        borderRadius: "2rem",
                        textTransform: "uppercase",
                        fontSize: ".75rem"
                    },
                    offset: {
                        x: '1.5rem',
                        y: '1.5rem'
                    },
                    onClick: function () { }
                }).showToast();
            } else {
                console.log("No disponible");
                Toastify({
                    text: "Ya tienes un producto en tu carrito",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #4b33a8, #785ce9)",
                        borderRadius: "2rem",
                        textTransform: "uppercase",
                        fontSize: ".75rem"
                    },
                    offset: {
                        x: '1.5rem',
                        y: '1.5rem'
                    },
                    onClick: function () { }
                }).showToast();
            }
        });

    });
}

function actualizarNumeroCarrito() {
    const productosEnCarrito = localStorage.getItem("productosEnCarrito");
    const contenedorNumCarrito = document.querySelector("#numerito");
    contenedorNumCarrito.innerHTML = productosEnCarrito || 0;
}

window.addEventListener('storage', actualizarNumeroCarrito);

actualizarNumeroCarrito();
