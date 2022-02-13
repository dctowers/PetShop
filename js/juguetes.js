let articulos = []
let juguetes = []
let toDisplay = []


let buscador = document.querySelector("#buscador")

async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
    .then(response => response.json())
    .then(json => articulos.push(...json.response))
    juguetes.push(...articulos.filter(articulos=>articulos.tipo === "Juguete"))
    // console.log(juguetes);

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

        let alerta = item.stock <= 5 ? `<p class="text-danger">Ultimas unidades!</p>`:` `
        
        templateHTML += `
<a href="./detalle.html?id=${item._id}">
    <div class="row">
        <div class="example-1 card">
            <div class="wrapper">
                    <p>${alerta}</p>
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
                            <button onClick="getID('${item._id}')" id="${item._id}" class="btn-carrito">Añadir al carrito</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</a>
        `

        document.querySelector("#cartas").innerHTML = templateHTML
        
    })
}
var lista = JSON.parse(localStorage.getItem('carrito')) || []
var Limpiar 

function getID(e){
    console.log(e.target)
    lista.push(e)
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



