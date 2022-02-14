var articulos = [];
var imagenes = [];
var juguetes = [];
let toDisplay = [];
let data = [];
var alerta = document.querySelector("#alerta");
let buscador = document.querySelector("#buscar");
buscador.addEventListener("keyup", search);
async function getData() {
  await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then((response) => response.json())
    .then((json) => articulos.push(...json.response));
  juguetes.push(...articulos.filter((articulo) => articulo.tipo === "Juguete"));

  updateDisplay();
}

getData();

function updateDisplay(data) {
  if (data) {
    toDisplay = [];
    toDisplay.push(...data);
  } else {
    toDisplay.push(...juguetes);
  }
  var templateHTML = "";
  toDisplay.map((item) => {
    let alerta =
      item.stock <= 5
        ? `<div class="stock">
      <p class="stockP">Ultimas</p>
      <p class="stockP">unidades!</p>
      </div>`
        : ` `;

    templateHTML += `
      <div class="card">
        ${alerta}
        <div class="cardImg">
          <a href="./detalle.html?id=${item._id}">
            <img src="${item.imagen}" alt="" />
          </a>
        </div>
        <div class="data">
          <div class="content">
            <p class="title">
              <a href="./detalle.html?id=${item._id}"> ${item.nombre} </a>
            </p>
            <p class="price">
              <a href="./detalle.html?id=${item._id}"> Precio: $${item.precio} </a>
            </p>
            <div class="botones">
              <button
                onClick="getID('${item._id}')"
                id="${item._id}"
                class="btn btn-primary enviar"
              >
                Añadir al carrito
              </button>
              <a href="./shop.html"
                ><button
                  onClick="getID('${item._id}')"
                  id="${item._id}"
                  class="btn btn-primary enviar"
                >
                  comprar ahora
                </button></a
              >
            </div>
          </div>
        </div>
      </div>
`;

    // console.log(juguetes)
    document.querySelector("#cartas").innerHTML = templateHTML;
  });
}

var favorites = JSON.parse(localStorage.getItem("favoritos")) || [];

function getID(event) {
  favorites.push(event);
  const unicoFav = new Set(favorites);
  var clearFav = [...unicoFav];

  var badge = "";
  // var vallabel = JSON.parse(localStorage.getItem('carrito'))
  console.log(clearFav.length);

  if (clearFav.length >= 0) {
    console.log("diferenre de 0");
    badge = `
        <h1 id="elh1" class="elh1s" >${clearFav.length}</h1>
        `;
    document.querySelector("#elh1").innerHTML = badge;
  } else if (clearFav.length == 0) {
    console.log("es 0");
    h1s.style.visibility = "hidden";
  }

  localStorage.setItem("carrito", JSON.stringify(clearFav));
}
function search(event) {
  let buscador = "";
  buscador = event.target.value;
  console.log(buscador);
  if (buscador == "") {
    data = [];
    data.push(...juguetes);
  } else {
    data = [];
    data.push(
      ...juguetes.filter((juguetes) =>
        juguetes.nombre.toLowerCase().includes(buscador.toLowerCase())
      )
    );
  }
  updateDisplay(data);
  console.log(data);
}
