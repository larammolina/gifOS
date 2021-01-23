
//favoritos

// localStorage.clear()

if (typeof(Storage) !== "undefined") {
    // LocalStorage disponible
    if (localStorage.getItem("favGifos") !== null) {
        console.log("ver favoritos");
        // mostrar favoritos
        showFavoritos()
}else{
        console.log("no hay favoritos guardados")
        //mostrar pantalla de error 
    }
} else {
    // LocalStorage no soportado en este navegador
    //console.log("NO SOPORTADO")
}

function checkFavGif(gifSRC){
    console.log("verificando url "+gifSRC)
    //elimino la barra que aparece al final
    if(gifSRC.charAt(gifSRC.length-1) === '/'){
        console.log("debo elimicar la barra final")
        gifSRC = gifSRC.slice(0,-1);
        console.log(gifSRC)
    }
    if (typeof(Storage) !== "undefined") {
        // LocalStorage disponible
        
        if (localStorage.getItem("favGifos") !== null) {
            let gifos = JSON.parse(localStorage.getItem('favGifos'));
            
            console.log("verificando url "+gifos.indexOf(gifSRC))
            if(gifos.indexOf(gifSRC) != -1){
                return true
            }
            return false
                    
        }else{
            // console.log('no existe mis gifos -- creando');
            return false;
        
        }
    } else {
        // LocalStorage no soportado en este navegador
        //console.log("NO SOPORTADO")
        return false;
    }
}

function addFavorito(tarjeta) {
    let imgID = 't'+tarjeta.id
    let imSRC = document.getElementById(imgID).src
    console.log("favorito: "+imSRC)

    //elimino la barra que aparece al final
    if(imSRC.charAt(imSRC.length-1) === '/'){
        console.log("debo elimicar la barra final")
        imSRC = imSRC.slice(0,-1);
        console.log(imSRC)
    }

    document.getElementById(tarjeta.id).src = 'images/icon-fav-active.svg'
    agregarFavGifo(imSRC, tarjeta.id);
}

function agregarFavGifo(gifoSRC, tarjetaID) {
    if (typeof(Storage) !== "undefined") {
        // LocalStorage disponible
        
        if (localStorage.getItem("favGifos") !== null) {
            console.log("Guardando GIFO localStorage")
            let gifos = JSON.parse(localStorage.getItem('favGifos'));
            console.log(gifos);

            //chequeo que el ID no exite en el array
            //agrego al ID al principio.
            //Lo guardo.

            console.log('EXISTE?? '+gifos.indexOf(gifoSRC))
            if(gifos.indexOf(gifoSRC) == -1){
                // como no existe el ID lo agrego
                gifos.push(gifoSRC);
                document.getElementById(tarjetaID).src = 'images/icon-fav-active.svg'
            }else{
                //como existe lo elimino
                let index =  gifos.indexOf(gifoSRC);
                gifos.splice(index, 1);
                document.getElementById(tarjetaID).src = 'images/icon-fav-hover.svg'
            }

            console.log("nuevo Array: "+ gifos);

            localStorage.setItem('favGifos', JSON.stringify(gifos));
            
            
            console.log("Guardados")
                    
        }else{
            console.log('no existe mis gifos -- creando');
            let gifos = [gifoSRC];
            console.log("nuevo Array: "+ gifos);

            localStorage.setItem('favGifos', JSON.stringify(gifos));
            document.getElementById(tarjetaID).src = 'images/icon-fav-active.svg'
            
            console.log("Guardados")
        
        }
    } else {
        // LocalStorage no soportado en este navegador
        //console.log("NO SOPORTADO")
    }
}

function download(tarjeta){
    let imgID = 't'+tarjeta.id
    let imSRC = document.getElementById(imgID).src
    window.alert('URL: '+imSRC)
    console.log("url: "+imSRC)
}

function maximizar(tarjeta){
    let imgID = 't'+tarjeta.id
    let imSRC = document.getElementById(imgID).src
    console.log("maximizar: "+imSRC)
}


function showFavoritos() {
    let i=0;
    let gifos = JSON.parse(localStorage.getItem('favGifos'));
    console.log(gifos);
    let limite = 12;
    var contenedor = document.getElementById("resultado");
    contenedor.innerHTML = "";
    // if(gifos.length <= limite){
        // for (i = limite-12; i < limite; i++) {
            for (i in gifos){
            contenedor.innerHTML += 
            "<div class='tarjetas'> " + 
                        
            "<h3>"+'titulo'+"</h3>" +
                        
            "<img class='resultadoGif' id='tarjet" +i+"' src="+gifos[i]+"/>" +

            "<div class='contenedorImagenes'>" +
            "<img class='hoverImagenes' id='arjet" +i+"'src='images/icon-fav-hover.svg' alt='favoritos' onclick='addFavorito(this)'/> "+
            "<img class='hoverImagenes' id='arjet" +i+"'src='images/icon-link-normal.svg' alt='' onclick='download(this)'/>"+
            "<img class='hoverImagenes' id='arjet" +i+"'src='images/icon-max-normal.svg' alt='maximizar' onclick='maximizar(this)'/></div>" +  
                        
            "</div>"

            let existe = checkFavGif(document.getElementById('tarjet'+i).src);
            //console.log(existe)
            if(existe)  document.getElementById('arjet'+i).src = 'images/icon-fav-active.svg'
            else document.getElementById('arjet'+i).src = 'images/icon-fav-hover.svg'

        } 
                
    // }

    
}
//fin de favoritos

document.getElementById('verMas').addEventListener('click', () => { 
    
    if(contador_verMas <= 2){
        contador_verMas ++;
        search(campo_verMas, contador_verMas);
    }else{
        //ocultador boton
        
    }

});



//modo noche
const btnSwitch = document.querySelector('#switch');

function modoNoche() {
    document.body.classList.toggle('dark');
    //document.getElementById('ppal').classList.toggle('dark');
    //document.getElementById('busqueda').classList.toggle('dark');
    document.getElementById('nav').classList.toggle('dark');
    //document.getElementById('title').classList.toggle('darkTitle');
    document.getElementById('drop-menu').classList.toggle('dark');
    document.getElementById('trending').classList.toggle('darkTrending');
    document.getElementById('switch').classList.toggle('darkTitle');
    document.getElementById('link1').classList.toggle('darkTitle');
    document.getElementById('link2').classList.toggle('darkTitle');
    document.getElementById('lineTop').classList.toggle('darkBackground');
    document.getElementById('lineBotton').classList.toggle('darkBackground');
    document.getElementById('trendingH2').classList.toggle('darkTitle');
    document.getElementById('trendingH3').classList.toggle('darkTitle');
    //document.getElementById('trending2').classList.toggle('darkTitle');
    //document.getElementById('resulTrendingTag').classList.toggle('darkTitle');
    //document.getElementById('busquedaBorde').classList.toggle('darkBorder');
    document.getElementById('drop-menu').classList.toggle('blackBackground');

    btnSwitch.textContent = 'Modo Diurno';
}

btnSwitch.addEventListener('click', () => {
    modoNoche();

    if (typeof(Storage) !== "undefined") {
        // LocalStorage disponible
        if (localStorage.getItem("modo") === 'true') {
            //debo sacar el modo noche
            localStorage.setItem("modo", 'false');
            console.log("MODO NOCHE FALSE: " + localStorage.getItem("modo"));
            btnSwitch.textContent = 'Modo Nocturno';

        }else{
            localStorage.setItem("modo", 'true');
            console.log("MODO NOCHE TRUE: "+ localStorage.getItem("modo"));
            
            
        }
    } else {
        // LocalStorage no soportado en este navegador
        //console.log("NO SOPORTADO")
    }


});

if (typeof(Storage) !== "undefined") {
    // LocalStorage disponible
    if (localStorage.getItem("modo") === 'true') {
        console.log("modo noche seteado");
        // poner en modo noche
        modoNoche()
}else{
        console.log("modo noche no seteado")
        //sacar modo noche
        localStorage.setItem("modo", 'false');
        btnSwitch.textContent = 'Modo Nocturno';
    }
} else {
    // LocalStorage no soportado en este navegador
    //console.log("NO SOPORTADO")
}
//fin del modo noche