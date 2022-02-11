var articulos = []
var imagenes = []
var juguetes = []
async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
    .then(response => response.json())
    .then(json => articulos.push(...json.response))
    juguetes.push(...articulos.filter(articulos=>articulos.tipo === "Juguete"))
    console.log(juguetes);

    updateDisplay()
}

getData()

console.log(juguetes)

function updateDisplay(){
        var templateHTML = ""
        juguetes.map(item=>{
        templateHTML += `
        <div class="box">
                  <img src="${item.imagen}">
                    <div class="texto">
                        <h2>${item.nombre}</h2>
                        <h3>precio: $${item.precio}</h3>
                    </div>
              </div>
        `
    })
    console.log(templateHTML)
    document.querySelector("#cartas").innerHTML = templateHTML
}

