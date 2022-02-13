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
                
                <div class="box">
                <div class="lowstock">
                </div>
                            <h4 id="alerta" class="unidadesultimas">Ultimas unidades disponibles</h4>
                            <img class"imgdentro" src="${item.imagen}">
                            <div class="texto">
                                <h2>${item.nombre}</h2>
                                <h3>precio: $${item.precio}</h3>
                            </div>
                            <div class="botones">
                            <button onClick="getID('${item._id}')" id="${item._id}" class="btn-carrito">Añadir al carrito</button>
                            </div>
                      </div>
                     
                `
            
    
    // console.log(medicamentos)
    document.querySelector("#cartas").innerHTML = templateHTML
})
}
console.log(articulos)

var favorites = JSON.parse(localStorage.getItem('favoritos')) || []

function getID(event){


        console.log(event)
    favorites.push(event)
    const unicoFav = new Set(favorites) //Dado al recorrer el array anterios me va a dar todas las propiedades, con el metodo set elimino los repetidos y dejo solo el primer elemento encontrado, el resto lo descarta
    var clearFav = [...unicoFav]
    
    
    localStorage.setItem('carrito', JSON.stringify(clearFav));
    init()
    
}
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
    // console.log(alertastock)
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

    

 




