var articulos = []
var imagenes = []
var medicamentos = []
var alerta = document.querySelector("#alerta")
async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
        .then(response => response.json())
        .then(json => articulos.push(...json.response))
         medicamentos.push(...articulos.filter(articulo=>articulo.tipo === "Medicamento"))
    
    
updateDisplay()
}
getData()
console.log(medicamentos)
function updateDisplay(){
    
        var templateHTML = ""
        medicamentos.map(item=>{
        templateHTML += `
        <a href="./detalle.html?id=${item._id}">
        <div class="box">
                    <h4 id="alerta" class="unidadesultimas">Ultimas unidades disponibles</h4>
                    <img class"imgdentro" src="${item.imagen}">
                    <div class="texto">
                        <h2>${item.nombre}</h2>
                        <h3>precio: $${item.precio}</h3>
                    </div>
              </div>
        </a>      
        `
    })
    
    console.log(medicamentos)
    document.querySelector("#cartas").innerHTML = templateHTML
}
console.log(articulos)

function alerta(){
    articulos.forEach(articulos=>{
        articulos.stock.map
    })
}