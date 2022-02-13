var articulos = []
var imagenes = []
var medicamentos = []
let toDisplay = []
var alerta = document.querySelector("#alerta")
let buscador = document.querySelector("#buscar")
buscador.addEventListener("keyup", search)
async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
        .then(response => response.json())
        .then(json => articulos.push(...json.response))
         medicamentos.push(...articulos.filter(articulo=>articulo.tipo === "Medicamento"))
    
         updateDisplay()
         bajoStock()   

}
getData()
console.log(medicamentos)
function updateDisplay(buscado){
        
    

        if(buscado == undefined){            
            toDisplay.push(...medicamentos)
        }
        else{
            toDisplay.push(...buscado)
            
        }
        var templateHTML = ""
            toDisplay.map(item=>{
                templateHTML += `
                <a href="./detalle.html?id=${item._id}">
                <div class="box">
                <div class="lowstock">
                </div>
                            <h4 id="alerta" class="unidadesultimas">Ultimas unidades disponibles</h4>
                            <img class"imgdentro" src="${item.imagen}">
                            <div class="texto">
                                <h2>${item.nombre}</h2>
                                <h3>precio: $${item.precio}</h3>
                            </div>
                      </div>
                </a>      
                `
            
    
    // console.log(medicamentos)
    document.querySelector("#cartas").innerHTML = templateHTML
})
}
console.log(articulos)

function search(event){
    let data = []
    let buscar = ""
    buscar = event.target.value
    console.log(buscar)
    if(buscar == ""){
        data.push(...medicamentos)
    }
    else{
        data.push(...medicamentos.filter(medicamentos=>medicamentos.nombre.toLowerCase().includes(buscar.toLowerCase())))
    }
    console.log(data)
    
}

function bajoStock(){
    var alertastock = document.querySelectorAll(".unidadesultimas")
    console.log(alertastock)
    var pocos = toDisplay.filter(juguetes=>juguetes.stock <= 5 )
    console.log(pocos)
    var templateHTML = "Ultimos en stock"


    // juguetes.forEach(items=>{
    //     if(items.stock <= 5){

    //     }
        
        
        // var alertapocos = document.querySelector(".lowstock")
        // var alert = document.createElement("span")

        // alert.append(templateHTML)
        // alertapocos.append(alert)
    // })
}

    

 




