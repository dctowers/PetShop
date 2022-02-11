var articulos = []
var imagenes = []
var medicamentos = []
async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
        .then(response => response.json())
        .then(json => articulos.push(...json.response))
    
    farmacia = articulos.filter(articulos=>articulos.tipo === "Medicamento")
    medicamentos.push(...farmacia)
updateDisplay()
}
getData()
console.log(medicamentos)
function updateDisplay(medicamentos){
        var templateHTML = ""
        articulos.map(item=>{
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

