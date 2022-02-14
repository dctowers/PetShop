var articulos = [];
var imagenes = [];
var medicamentos = [];
let toDisplay = [];
let data = [];
var alerta = document.querySelector("#alerta");
let buscador = document.querySelector("#buscar");
buscador.addEventListener("keyup", search);
async function getData() {
  await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then((response) => response.json())
    .then((json) => articulos.push(...json.response));
  medicamentos.push(
    ...articulos.filter((articulo) => articulo.tipo === "Medicamento")
  );

  updateDisplay();
  bajoStock();
}
getData();
console.log(medicamentos);
function updateDisplay(data) {
  if (data) {
    toDisplay = [];
    toDisplay.push(...data);
  } else {
    toDisplay.push(...medicamentos);
  }
  var templateHTML = "";
  toDisplay.map((item) => {
    let alerta =
      item.stock <= 5 ? `<p class="text-danger">Ultimas unidades!</p>` : ` `;

    templateHTML += `
    <a href="./detalle.html?id=${item._id}">
    <div class="row">
        <div class="example-1 card">
            <div class="wrapper">
                    <p>${alerta}</p>
                    <div class="imgdentro">
                        <img src="${item.imagen}" alt="">
                    </div>
                    <div class="date">
                    </div>
                <div class="data">
                <div class="content">    
                        <h1 class="title">
                            <a class="titulo" href="#">${item.nombre}</a>
                        </h1>
                        <span class="precio">Precio: $${item.precio}</span>
                        <div class="botones">
                            <button onClick="getID('${item._id}')" id="${item._id}" class="btn-carrito">Añadir al carrito</button>
                            <a href="./shop.html"><button onClick="getID('${item._id}')" id="${item._id}" class="btn-comprarnow" >comprar ahora</button></a>
                        </div>
                </div>
            </div>
        </div>
    </div>
</a>`;

    // console.log(medicamentos)
    document.querySelector("#cartas").innerHTML = templateHTML;
  });
}
console.log(articulos);

var favorites = JSON.parse(localStorage.getItem("favoritos")) || [];

function getID(event){S
  console.log(event);
  favorites.push(event);
  const unicoFav = new Set(favorites); //Dado al recorrer el array anterios me va a dar todas las propiedades, con el metodo set elimino los repetidos y dejo solo el primer elemento encontrado, el resto lo descarta
  var clearFav = [...unicoFav];

  localStorage.setItem("carrito", JSON.stringify(clearFav));
  // init()
}
function search(event) {
  let buscador = "";
  buscador = event.target.value;
  console.log(buscador);
  if (buscador == "") {
    data = [];
    data.push(...medicamentos);
    console.log("if");
  } else {
    data = [];
    data.push(
      ...medicamentos.filter((medicamentos) =>
        medicamentos.nombre.toLowerCase().includes(buscador.toLowerCase())
      )
    );
    console.log("else");
  }
  updateDisplay(data);
  console.log(data);
}

function bajoStock() {
  var alertastock = document.querySelectorAll(".unidadesultimas");
  // console.log(alertastock)
  var pocos = toDisplay.filter((juguetes) => juguetes.stock <= 5);
  console.log(pocos);
  var templateHTML = "Ultimos en stock";

  // juguetes.forEach(items=>{
  //     if(items.stock <= 5){

  //     }

  // var alertapocos = document.querySelector(".lowstock")
  // var alert = document.createElement("span")

  // alert.append(templateHTML)
  // alertapocos.append(alert)
  // })
}
