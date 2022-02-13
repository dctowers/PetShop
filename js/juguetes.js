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
                    <span class="year">Stock</span>
                    <span class="month">Limitado:</span>
                    <span class="day">5</span>
                </div>
        <div class="data">
        <div class="content">    
                <h1 class="title">
                    <a class="titulo" href="#">${item.nombre}</a>
                </h1>
                <span class="precio">Precio: $${item.precio}</span>
                <div class="botones">
                    <button onclick= "añadirCarrito()" id="carrito">Añadir al carrito</button>
                    <button onclick= "compraDirecta()" id="comprar" data-open="modal">Comprar ahora</button>
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




