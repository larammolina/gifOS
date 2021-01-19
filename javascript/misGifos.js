
function cargarGifos() {
    if (typeof(Storage) !== "undefined") {
        // LocalStorage disponible
        if (localStorage.getItem("misGifos") !== null) {
            
    console.log(JSON.parse(localStorage.getItem('misGifos')));
            //console.log(localStorage.getItem('misGifos'));
            
        }else{
            console.log('no existe mis gifos');
        
        }
    } else {
        // LocalStorage no soportado en este navegador
        //console.log("NO SOPORTADO")
    }
}

function mostrarGifos() {

}

var gifs = [1,2,3,4,5];
localStorage.setItem('misGifos', JSON.stringify(gifs));
cargarGifos();

