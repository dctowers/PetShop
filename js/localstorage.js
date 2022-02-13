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
    // console.log(items)
    guardado.map(idguardado =>{

    

    toDisplayCarrito.push(...items.filter(objetos => objetos._id == idguardado))
    
    })
    var templateHTMLcarrito = "" 
    
    
    toDisplayCarrito.map(item => { 
    
        templateHTMLcarrito += `    
        <tr>
        <td> <img class"imagentabla" src="${item.imagen}" alt="Imagen tabla"></td>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td><button class="botonmas">+</button><button class="borrar"><img src="../assets/papelera-de-reciclaje.png" alt=""></button><button class="botonmenos">-</button></td>
        <td>$${item.precio}</td>
      </tr>
        `
        
    })
    
    document.querySelector('#bodytable').innerHTML = templateHTMLcarrito 
    
}

    init()
    function removeID(event){

        guardado = guardado.filter(idguardado => idguardado != event)
        localStorage.setItem('carrito', JSON.stringify(guardado))
        //localStorage.setItem("cargaControl", "Secargo")
        init()
    console.log(guardado)
    }    