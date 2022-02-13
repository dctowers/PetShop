let items = [];
var guardado = [];
var array = [];

async function data() {
  await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then((response) => response.json())
    .then((json) => items.push(...json.response));
  items.map((items) => {
    items.cantidad = 1;
  });

  init();
}
data();
function init() {
  var dataLocal = JSON.parse(localStorage.getItem("carrito"));
  if (dataLocal != null) {
    guardado = dataLocal;
  } else {
    guardado = [];
  }

  console.log(guardado);

  var toDisplayCarrito = [];
  // console.log(items)
  guardado.map((idguardado) => {
    toDisplayCarrito.push(
      ...items.filter((objetos) => objetos._id == idguardado)
    );
  });
  var templateHTMLcarrito = "";

  toDisplayCarrito.map((item) => {
    templateHTMLcarrito += `    
        <div class="box">
        <div class="lowstock">
        </div>
                    <h4 id="alerta" class="unidadesultimas">Ultimas unidades disponibles</h4>
                    <img class"imgdentro" src="${item.imagen}">
                    <div class="texto">
                        <h2>${item.nombre}</h2>
                        <h3>precio: $${item.precio}</h3>
                    </div>
                    <div class="botones">
                    <button onClick="removeID('${item._id}')" id="${item._id}" class="btn-carrito">Quitar del carrito</button>
                    <button onClick="getID('${item._id}')" id="${item._id}" class="btn-carrito">Añadir al carrito</button>
                    </div>
              </div>
        `;
  });

  document.querySelector("#cartascarrito").innerHTML = templateHTMLcarrito;
}

init();
function removeID(event) {
  guardado = guardado.filter((idguardado) => idguardado != event);
  localStorage.setItem("carrito", JSON.stringify(guardado));
  //localStorage.setItem("cargaControl", "Secargo")
  init();
  console.log(guardado);
}
