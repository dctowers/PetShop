let articulos = []
let juguetes = []
let toDisplay = []


let buscador = document.querySelector("#buscador")

async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
    .then(response => response.json())
    .then(json => articulos.push(...json.response))
    juguetes.push(...articulos.filter(articulos=>articulos.tipo === "Juguete"))
    console.log(juguetes);

    updateDisplay()
    bajoStock()
}

getData()

//console.log(juguetes)

function updateDisplay(buscado){
    if(buscado == undefined){
        toDisplay.push(...juguetes)
    }else{  
        toDisplay.push(...buscado)
    }
    let templateHTML = ""
    toDisplay.forEach(item=>{
        
        templateHTML += `
<a href="./detalle.html?id=${item._id}">
<div class="row">
    <div class="example-1 card">
        <div class="wrapper">
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
                    <button onClick= "getID(${item._id})" id="${item._id}">Añadir al carrito</button>
                    <button onClick= "compraDirecta()" id="comprar" data-open="modal">Comprar ahora</button>
                </div>
        </div>
        </div>
    </div>
</div>
</a>
        `

        document.querySelector("#cartas").innerHTML = templateHTML
        
    })
    //console.log(templateHTML)
 

}
var lista = JSON.parse(localStorage.getItem('carrito')) || []
var Limpiar 

function getID(event){


    lista.push(event)
    const unicoCarrito = new Set(lista) 
    var limpiar = [...unicoCarrito]
    
    
    localStorage.setItem('carrito', JSON.stringify(limpiar));
    init()
    
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


function bajoStock(){

    var pocos = toDisplay.filter(juguetes=>juguetes.stock <= 5 )
    console.log(pocos)
    let alertaPocos = ""
    
    pocos.forEach(item=>{
        alertaPocos +=`
        <span class="year">Stock</span>
        <span class="month">Limitado:</span>
        <span class="day">5</span>
        `

    })

    document.querySelector(".date").innerHTML = alertaPocos
}
