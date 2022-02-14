let items = []
var guardado = []
var array = []
var toDisplayCarrito = []
var totalprecio = 0
var contador = 0

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
         
    // console.log(items)
    guardado.map(idguardado =>{

    

    toDisplayCarrito.push(...items.filter(objetos => objetos._id == idguardado))
    
    })
    var templateHTMLcarrito = "" 
    
    contador = 0
    toDisplayCarrito.map(item => { 
    totalprecio = item.cantidad * item.precio;
    contador += totalprecio
        templateHTMLcarrito += `    
        <tr>
        <td> <img class"imagentabla" src="${item.imagen}" alt="Imagen tabla"></td>
        <td class="textomover" >${item.nombre}</td>
        <td class="textomover" >${item.cantidad}</td>
        <td ><button class="mover botonmas" onClick="sumaritem('${item._id}')">+</button>
        <button class="mover botonborrar" onClick="borrarallitems('${item._id}')">Borrar articulo</button>
        <button class="mover botonmenos" onClick="restaitem('${item._id}')">-</button>
        </td>
        <td class="textomover">$${totalprecio}</td>
      </tr>
        `
        
    })
    document.querySelector('#bodytable').innerHTML = templateHTMLcarrito
    document.querySelector("#totalcarrito").innerHTML = "$" + contador 
    
}

    init()
    var counter = []
    function borrarallitems(event){

        guardado = guardado.filter(idguardado => idguardado != event)
        localStorage.setItem('carrito', JSON.stringify(guardado))
   
        init()
    }    
    function sumaritem(event){
        cantidad = []
        var itempuntual = items.filter(items=>items._id == event)
        cantidad.push(...toDisplayCarrito.filter(items =>items._id == event))
        itempuntual.map(items => items.cantidad++)
  
        
            init()    
    }
    function restaitem(event){
        cantidad = []
        var itempuntual = items.filter(items=>items._id == event)
        cantidad.push(...toDisplayCarrito.filter(items =>items._id == event))
        itempuntual.map(items => items.cantidad--)
            itempuntual.forEach(item => {
                if(item.cantidad == 0){
                    borrarallitems(item._id)
                }
            })
        init()    
}
function borrartodo(){
        var borrado =[]
        guardado=borrado
        localStorage.setItem('carrito', JSON.stringify(guardado))
init()
}
function back(){
    history.back();
}