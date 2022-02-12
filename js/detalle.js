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
                    <div class="titulo">
                    </div>
                    <div class="contenido">
                    <div class="imagen">
                    <img class="imagendentro" src="${seleccionado.imagen}">
                    </div>
                    <div class="texto">
                    
                    <h2>${seleccionado.nombre}</h2>
                    <p>${seleccionado.descripcion}</p>
                    <div class="botonesyprecio">     
                    <h3>Precio: $${seleccionado.precio}</h3>
                    <div class="botones">
                    <button onclick= "añadirCarrito()" id="carrito">Añadir al carrito</button>
                    <button onclick= "compraDirecta()" id="comprar" data-open="modal">Comprar ahora</button>
                    </div>
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