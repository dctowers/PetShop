let articulos = []
let juguetes = []


let buscador = document.querySelector("#buscador")

async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
    .then(response => response.json())
    .then(json => articulos.push(...json.response))
    juguetes.push(...articulos.filter(articulos=>articulos.tipo === "Juguete"))
    console.log(juguetes);

    updateDisplay()
}

getData()

//console.log(juguetes)

function updateDisplay(buscado){
    let toDisplay = []
    if(buscado == undefined){
        toDisplay.push(...juguetes)
    }else{  
        toDisplay.push(...buscado)
    }
    let templateHTML = ""
    toDisplay.map(item=>{
        templateHTML += `
        <div class="row">
      <div class="example-1 card">
        <div class="wrapper">
          <div class="date">
            <span class="year">Stock ${item.stock<5}</span>
            <span class="month">Limitado:</span>
            <span class="day">5</span>
          </div>
          <div class="data">
            <div class="content">
              <span class="precio">Precio: ${item.precio}</span>
              <h1 class="title">
                <a href="#">${item.nombre}</a>
              </h1>
              <p class="text">
                ${item.descripcion}
              </p>
              <label for="show-menu" class="menu-button"><span></span></label>
            </div>
            <input type="checkbox" id="show-menu" />
            <ul class="menu-content">
              <li>
                <a href="#" class="fa fa-bookmark-o"></a>
              </li>
              <li>
                <a href="#" class="fa fa-heart-o"><span>47</span></a>
              </li>
              <li>
                <a href="#" class="fa fa-comment-o"><span>8</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>      
        `

        document.querySelector("#cartas").innerHTML = templateHTML

    })
    //console.log(templateHTML)
 

}


function search(event){
    let data = []
    let buscar = ""
    buscar = event.target.value
    console.log(buscar)

    if(buscar == ""){
        data.push(...juguetes)
    }else{
        data.push(...juguetes.filter(juguete => juguete.nombre.toLowerCase().includes(buscar.toLowerCase())))
    }
    console.log(data);
    updateDisplay(data)

}

buscador.addEventListener("keyup", search)

