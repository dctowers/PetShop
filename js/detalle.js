var articulos = []


async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
        .then(response => response.json())
        .then(json => articulos.push(...json.response))
        console.log(articulos)
        
        id = location.search.split("?id=").filter(Number)
        console.log(id)

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