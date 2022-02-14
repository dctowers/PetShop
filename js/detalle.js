var articulos = []
var url = window.location.search; 
var id
var seleccionado
var botonComprar = document.querySelector("comprar")


async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
        .then(response => response.json())
        .then(json => articulos.push(...json.response))
        console.log(articulos)
         
        url = url.split("?id=").splice(1);
        var busqueda = articulos.filter(eventos=>eventos._id == url)
        seleccionado = busqueda
        console.log(url)
        console.log(seleccionado)
        
 
        
        var imprimir = ""
        seleccionado.forEach(seleccionado=>{
        imprimir = ` 
        <div class="tarjetadetalles"> 
        <div class="imgyprecio">
        <img class="imgtarjeta" src="${seleccionado.imagen}" alt="">
        <h3 class="precio">$${seleccionado.precio}</h3>
        </div>
        <div class="detallesid">
        <h2 class="nameid">${seleccionado.nombre}</h2>
        <p class="descriptionid">${seleccionado.descripcion}</p>
        
        
    </div>
    
    </div>
        `           
       })
       
            document.querySelector("#box").innerHTML = imprimir;
}
getData()
console.log(articulos)  

function stockcontrol(){
    console.log("funcionando")
    articulos.forEach(item=>{
        if(item.stock >= 5){
            console.log("quedan burda")
        }
        else{
            console.log("quedan pocos")
        }
    })

}
stockcontrol()
// function compradirecta(){
//     console.log(funciona)
// }
function compraDirecta(){
    console.log("funciona")
}
function añadirCarrito(){
    console.log("añadir al carrito")
}