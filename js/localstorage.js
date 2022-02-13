let items = []
var guardado = []
var array = []


async function data(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
    .then(response => response.json())
    .then(json => items.push(...json.response))
    items.map(items=>{
        items.cantidad=1;
    })
    

 init()      
}
data()
function init(){
    

    var dataLocal = JSON.parse(localStorage.getItem('carrito'))
        if(dataLocal !=null ){
            guardado = dataLocal
        }else{guardado=[]}
    
    console.log(guardado)


    var toDisplayCarrito = []     
    console.log(items)
    guardado.map(idguardado =>{

    

    toDisplayCarrito.push(...items.filter(objetos => objetos._id == idguardado))
    
    })
    var templateHTMLcarrito = "hola" 
    
    
    toDisplayCarrito.map(item => { 
    
        templateHTMLcarrito += `    
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
                            <button class="itemsCount" onClick="addQ(${item._id})">+</button>
                            
                        </div>
                </div>
                </div>
            </div>
        </div>
        </a>
        `
        
    })
    
    document.querySelector('#cartascarrito').innerHTML = templateHTMLcarrito 
    
}
    init()