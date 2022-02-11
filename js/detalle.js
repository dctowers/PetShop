var articulos = []


async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
        .then(response => response.json())
        .then(json => articulos.push(...json.response))
        console.log(articulos)
        id = 1
        articulos.map(articulos => articulos.id == id++)
        id = location.search.split("?id=").filter(Number)
        var idseleccionado = Number(id[0])
        var seleccion = articulos.find(function(articulos){
            return articulos.id == idseleccionado
        })
        console.log(seleccion)
       var imprimir = `
                     <img class"imgdentro" src="${articulos.imagen}">
                     <div class="texto">
                         <h2>${articulos.nombre}</h2>
                         <h3>precio: $${articulos.precio}</h3>
                     </div>      
        ` 
       
document.querySelector("#box").innerHTML = imprimir;
    }
getData()
console.log(articulos)  