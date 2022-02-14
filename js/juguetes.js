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

  async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
      .then(response => response.json())
      .then(json => articulos.push(...json.response))
    juguetes.push(...articulos.filter(articulos => articulos.tipo === "Juguete"))

    updateDisplay()

  }

}getData();



function updateDisplay(buscado){
    if(buscado){
        toDisplay = [];
        toDisplay.push(...buscado)
    }else{  
        toDisplay.push(...juguetes)
    }
    let templateHTML = ""
    toDisplay.forEach(item=>{

        let alerta = item.stock <= 5 ? `<p class="date">Ultimas unidades!</p>`:` `
        
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
            <p class="title">${item.nombre}</p>
            <p class="price">Precio: $${item.precio}</p>
            <div class="botones">
              <button
                onClick="getID('${item._id}')"
                id="${item._id}"
                class="btn btn-primary"
              >
                Añadir al carrito
              </button>
              <a href="./shop.html"
                ><button
                  onClick="getID('${item._id}')"
                  id="${item._id}"
                  class="btn btn-primary"
                >
                  comprar ahora
                </button></a
              >
            </div>
          </div>
        </div>
      </div>
        `;

    document.querySelector("#cartas").innerHTML = templateHTML;
  });
}
var lista = JSON.parse(localStorage.getItem("carrito")) || [];
var Limpiar;

function getID(event){
    // console.log(e.target)
    lista.push(event)
    const unicoCarrito = new Set(lista) 
    var limpiar = [...unicoCarrito]

    var badge = ""  
    // var vallabel = JSON.parse(localStorage.getItem('carrito'))  
    console.log(limpiar.length)
    
    if(limpiar.length >= 0){
      console.log("diferenre de 0")
        badge = `
        <h1 id="elh1" class="elh1s" >${limpiar.length}</h1>
        `
        document.querySelector("#cartitas").innerHTML = badge
        
  
    }
    else if(limpiar.length == 0){
        console.log("es 0")
        h1s.style.visibility = "hidden"
        }

    
    
    localStorage.setItem('carrito', JSON.stringify(limpiar));

    
}

function search(event){
    let datitos = []
    let buscar = ""
    buscar = event.target.value
    console.log(buscar)

    if(buscar == ""){
        datitos = [];
        datitos.push(...juguetes)
    }else{
        datitos.push(...juguetes.filter(juguete => juguete.nombre.toLowerCase().includes(buscar.toLowerCase())))
    }
    console.log(datitos);
    updateDisplay(datitos)

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
