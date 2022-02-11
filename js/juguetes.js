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
        <div class="box">
                  <img src="${item.imagen}">
                    <div class="texto">
                        <h2>${item.nombre}</h2>
                        <h3>precio: $${item.precio}</h3>
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

