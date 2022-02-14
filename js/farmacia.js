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
  medicamentos.push(...articulos.filter((articulo) => articulo.tipo === "Medicamento")
  );

  updateDisplay();
}


getData();



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

var favorites = JSON.parse(localStorage.getItem("favoritos")) || [];

function getID(event){
  favorites.push(event);
  const unicoFav = new Set(favorites); 
  var clearFav = [...unicoFav];

 
    var badge = ""  
    // var vallabel = JSON.parse(localStorage.getItem('carrito'))  
    console.log(clearFav.length)
    
    if(clearFav.length >= 0){
      console.log("diferenre de 0")
        badge = `
        <h1 id="elh1" class="elh1s" >${clearFav.length}</h1>
        `
        document.querySelector("#elh1").innerHTML = badge
        
  
    }
    else if(clearFav.length == 0){
        console.log("es 0")
         h1s.style.visibility = "hidden"
        }

  

 
  localStorage.setItem("carrito", JSON.stringify(clearFav));
 
}
function search(event) {
  let buscador = "";
  buscador = event.target.value;
  console.log(buscador);
  if (buscador == "") {
    data = [];
    data.push(...medicamentos);
  
  } else {
    data = [];
    data.push(...medicamentos.filter((medicamentos) =>medicamentos.nombre.toLowerCase().includes(buscador.toLowerCase())));
  }
  updateDisplay(data);
  console.log(data);
}

