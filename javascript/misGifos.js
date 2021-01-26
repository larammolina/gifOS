
//const apiKey = 'KBzPxkz8JbGW5o84HBSui0A3IJFindfN';

function cargarGifos() {
    if (typeof(Storage) !== "undefined") {
        // LocalStorage disponible
        if (localStorage.getItem("misGifos") !== null) {
            if (JSON.parse(localStorage.getItem('misGifos')).length > 0){
            mostrarGifos();
            console.log("Mis Gifos: "+JSON.parse(localStorage.getItem('misGifos')).length);
            } else {
                errorMisGifos();
            }
        }else{
            console.log('no existe mis gifos');
            errorMisGifos();
        }
    } else {
        // LocalStorage no soportado en este navegador
        //console.log("NO SOPORTADO")
    }
}

function mostrarGifos() {
    let gifos = JSON.parse(localStorage.getItem('misGifos'));
    for (i in gifos){
        console.log("Gifo "+i+": "+gifos[i])
        getGifById(gifos[i]);

    }
            
}

function errorMisGifos (){
    var contenedor = document.getElementById("error");
    contenedor.innerHTML += 
        "<div class='errorFav'>"+
        "<img src='images/icon-mis-gifos-sin-contenido.svg' alt='error' /> "+
        "<h3> Animate a crear tu primer GIFO!</h3>"
        "</div>"
}

function getGifById(id){
    const apiKey = 'KBzPxkz8JbGW5o84HBSui0A3IJFindfN';
    let url = `http://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`;
        
        fetch(url).then (response => response.json())
            .then(content => {
                //console.log('content.meta '+JSON.stringify(content.data[0]));
                console.log(content.data.url);
                var contenedor = document.getElementById("resultado");
                // for (i=0; i < 12;i++) {
                contenedor.innerHTML += 
                    "<div class='tarjetas'> " + 
                        
                        "<img class='resultadoGif' id='tarjetmis" +i+"' src="+content.data.images.downsized.url+"/>" +

                        "<div class='contenedorImagenes'>" +
                                "<img class='hoverImagenes' id='arjetmis" +i+"'src='images/icon-fav-hover.svg' alt='favoritos' onclick='addFavorito(this)'/> "+
                                "<img class='hoverImagenes' id='arjetmis" +i+"'src='images/icon-link-normal.svg' alt='' onclick='download(this)'/>"+
                                "<img class='hoverImagenes' id='arjetmis" +i+"'src='images/icon-max-normal.svg' alt='maximizar' onclick='maximizar(this)'/>"+
                        "</div>" +  
                        
                    "</div>";

                    console.log('tarjetasMISSRC: '+document.getElementById('tarjetmis'+i).src)
                    let existe = checkFavGif(document.getElementById('tarjetmis'+i).src);
                    
                    console.log(existe)
                    if(existe)  document.getElementById('arjetmis'+i).src = 'images/icon-fav-active.svg'
                    else document.getElementById('arjetmis'+i).src = 'images/icon-fav-hover.svg'
                // }

                //primero chequear que el content.data tenga el tamano limite
                // var contenedor = document.getElementById("resultado");
                // contenedor.innerHTML = "";
                // if(content.data.length >= limite){
                //     for (i = limite-12; i < limite; i++) {
                //         contenedor.innerHTML += 
                //         "<div class='tarjetas'> " + 
                        
                //         "<h3>"+content.data[i].title+"</h3>" +
                        
                //         "<img class='resultadoGif' id='tarjet" +i+"' src="+content.data[i].images.fixed_height.url+"/>" +

                //         "<div class='contenedorImagenes'>" +
                //             "<img class='hoverImagenes' id='arjet" +i+"'src='images/icon-fav-hover.svg' alt='favoritos' onclick='addFavorito(this)'/> "+
                //             "<img class='hoverImagenes' id='arjet" +i+"'src='images/icon-link-normal.svg' alt='' onclick='download(this)'/>"+
                //             "<img class='hoverImagenes' id='arjet" +i+"'src='images/icon-max-normal.svg' alt='maximizar' onclick='maximizar(this)'/></div>" +  
                        
                //         "</div>"

                //         let existe = checkFavGif(document.getElementById('tarjet'+i).src);
                //         console.log(existe)
                //         if(existe)  document.getElementById('arjet'+i).src = 'images/icon-fav-active.svg'
                //         else document.getElementById('arjet'+i).src = 'images/icon-fav-hover.svg'

                //     } 
                // }
                
            })
}

//var gifs = [1,2,3,4,5];
//localStorage.setItem('misGifos', JSON.stringify(gifs));
//localStorage.clear()
cargarGifos();

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

    //guardo modo en localstorage

    //consulto el modo actual
    //if(localStorage.getItem('dark-mode') === "true"){
    //    document.body.classList.add('dark');
    //} else {
    //    document.body.classList.remove('dark');
    //}
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