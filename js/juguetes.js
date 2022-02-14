let articulos = [];
let juguetes = [];
let toDisplay = [];

let buscador = document.querySelector("#buscador");

async function getData() {
  await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then((response) => response.json())
    .then((json) => articulos.push(...json.response));
  juguetes.push(
    ...articulos.filter((articulos) => articulos.tipo === "Juguete")
  );
  // console.log(juguetes);

  updateDisplay();
  bajoStock();
}

getData();

//console.log(juguetes)

function updateDisplay(buscado) {
  if (buscado == undefined) {
    toDisplay.push(...juguetes);
  } else {
    toDisplay.push(...buscado);
  }
  let templateHTML = "";
  toDisplay.forEach((item) => {
    let alerta =
      item.stock <= 5 ? `<p class="stock ">¡Ultimas unidades!</p>` : ` `;

    templateHTML += `
      <div class="card">
        <a href="./detalle.html?id=${item._id}">
          ${alerta}
          <div class="cardImg">
            <img src="${item.imagen}" alt="" />
          </div>
          <div class="data">
            <div class="content">
              <p class="title">Antiparasitario Interno Total Full CG Perros - 15 Cc
</p>
              <p class="price">Precio: $${item.precio}</p>
              <div class="botones">
                <button
                  onClick="getID('${item._id}')"
                  id="${item._id}"
                  class="btn btn-primary"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </a>
      </div>
        `;

    document.querySelector("#cartas").innerHTML = templateHTML;
  });
}
var lista = JSON.parse(localStorage.getItem("carrito")) || [];
var Limpiar;

function getID(e) {
  console.log(e.target);
  lista.push(e);
  const unicoCarrito = new Set(lista);
  var limpiar = [...unicoCarrito];

  localStorage.setItem("carrito", JSON.stringify(limpiar));
  init();
}

function search(event) {
  let data = [];
  let buscar = "";
  buscar = event.target.value;
  console.log(buscar);

  if (buscar == "") {
    data.push(...juguetes);
  } else {
    data.push(
      ...juguetes.filter((juguete) =>
        juguete.nombre.toLowerCase().includes(buscar.toLowerCase())
      )
    );
  }
  console.log(data);
  updateDisplay(data);
}

buscador.addEventListener("keyup", search);
