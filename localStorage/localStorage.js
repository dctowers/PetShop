/* var guardado = []
var toDisplayFavorite = []
var cantidadQ = 1
var array = []

//VEAN CAMBIOS EN OBJARRAY
//NO SE OLVIDEN DE GENERAR EN TODO EL NAVBAR LOS ELEMENTOS NECESARIO AL IGUAL QUE EN CADA HTML

//FUNCION PARA LLAMAR AL DATO COMPLETO DE LA API Y FILTRAR POR LOS ID GUARDADOS EN LOCALSTORAGE
async function callAjax(){

    await $.ajax({
        url : "https://restcountries.com/v3.1/all",
        type : "GET",
        success : function(response) {
      var id = 1

      response.map(pais =>{
        
      array.push(
         
         {
         id:id++,
         name : pais.name.common,
         capital: pais.capital? pais.capital[0] : "sin dato capital",
         continent:pais.continents[0],
         currency:pais.currency?pais.currencies[Object.keys(pais.currencies)[0]].name: "sin moneda",
         poblacion:pais.population,
         bandera:pais.flags.svg,
         area: pais.area,
         cantidad : 1,
         }
     
      );
     
    })
}
    
        })    

    
init(array)
}


callAjax()

// FUNCION QUE GENERA EL CONTADOR DE FAVORITOS Y DESPLIEGA LAS CARDS FAVORITAS
 function init(){

var dataLocal = JSON.parse(localStorage.getItem('favoritos'))
    if(dataLocal !=null ){
        guardado = dataLocal
    }else{guardado=[]}

var badge = ""
console.log(guardado)

 badge =
`
<button type="button" class="btn btn-primary position-relative">
<a href="/localStorage/favoritos.html"tabindex="2">Favorites</a>
  
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${guardado.length}
    <span class="visually-hidden">unread messages</span>
  </span>
</button>
`

document.getElementById("favoritos").innerHTML = badge
toDisplayFavorite = []
guardado.map(idguardado =>{
    
toDisplayFavorite.push(...array.filter(pais => pais.id == idguardado))

})
var templateHtmlFavorite = "" 


toDisplayFavorite.map(pais => { 

    templateHtmlFavorite += `    
    <div class="boxCard">
    <div class="imgCard">
    <img src="${pais.bandera}">
    </div>
    <div class="dataCard">
    <h2>${pais.name}</h2>
    
       
        <button class="botonCards"><a href="../detalle.html?id=${pais.id}">Ver mas</a></button>
        <button class="botonCards" onClick="removeID(${pais.id})" id="${pais.id}">remove Favorite</button>
        <div class="counterFav">
        <button class="itemsCount" onClick="restQ(${pais.id})">-</button>
        <p class="itemsCount" >${pais.cantidad}</p>
        <button class="itemsCount" onClick="addQ(${pais.id})">+</button>
    </div>
        
    </div>
    </div>
    `
    
})

document.querySelector('#mainCardsFavorite').innerHTML = templateHtmlFavorite //Imprimimos en html las cards guardadas en el variable html

}
init()

//FUNCION PARA REMOVER ITEMS DEL LOCALSTORAGE

function removeID(event){

    guardado = guardado.filter(idguardado => idguardado != event)
    localStorage.setItem('favoritos', JSON.stringify(guardado))
    //localStorage.setItem("cargaControl", "Secargo")
    init()
console.log(guardado)
}

document.getElementById("clear").addEventListener("click", function(){
    //localStorage.clear()
    localStorage.removeItem("favoritos")
    
    init()
})
var counter = []

//FUNCIONES PARA AGRGAR DATOS AL CONTADOR
function addQ(event){
counter = []
counter.push(...toDisplayFavorite.filter(pais =>pais.id == event))
counter.map(pais => pais.cantidad++)

    init()    
}
//FUNCION PARA RESTAR DATOS AL CONTADOR
function restQ(event){
    counter = []
    counter.push(...toDisplayFavorite.filter(pais =>pais.id == event))
    counter.map(pais => pais.cantidad--)
    
    init()    
    } */