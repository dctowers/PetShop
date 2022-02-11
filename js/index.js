var eventos = []
var imagenes = []
async function getData(){ 
    await fetch("https://apipetshop.herokuapp.com/api/articulos") 
        .then(response => response.json())
        .then(json => eventos.push(...json.response))
        console.log(eventos)       
}
getData()