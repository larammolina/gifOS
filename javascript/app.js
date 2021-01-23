
//conecto la api giphy
const apiKey = 'KBzPxkz8JbGW5o84HBSui0A3IJFindfN';
let contador_verMas = 0;
let campo_verMas;

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




function search(gif, contador){
    //if(event.key === 'Enter') {
        //alert(ele.value);  
        let url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=50&q=`;
        let gif_input = gif.value;
        campo_verMas = gif;
        let url2 = url + gif_input;
        console.log('url de consulta: ' + url2);
        fetch(url2).then (response => response.json())
            .then(content => {
                //console.log('content.meta '+JSON.stringify(content.data[0]));
                let titulo = document.getElementById('resultadoTitulo');
                let h3 = document.createElement('h3');
                h3.innerHTML = gif_input;
                titulo.appendChild(h3);
                document.getElementById('verMas').classList.toggle('on');
                let i=0;
                console.log("SIZE: "+content.data.length + " -- contador VERMAS: " + contador);
                let limite = 12;
                switch(contador){
                    case 0:
                        limite = 12;
                        break;
                    case 1:
                        limite = 24;
                        break;
                    case 2:
                        limite = 36;
                        break;
                    case 3:
                        limite = 48;
                        break;
                    default: 
                        limite = 12;
                        break;
                }
                console.log("Limite "+limite)

                //primero chequear que el content.data tenga el tamano limite
                var contenedor = document.getElementById("resultado");
                contenedor.innerHTML = "";
                if(content.data.length >= limite){
                    for (i = limite-12; i < limite; i++) {
                        contenedor.innerHTML += 
                        "<div class='tarjetas'> " + 
                        
                        "<h3>"+content.data[i].title+"</h3>" +
                        
                        "<img class='resultadoGif' id='tarjet" +i+"' src="+content.data[i].images.fixed_height.url+"/>" +

                        "<div class='contenedorImagenes'>" +
                            "<img class='hoverImagenes' id='arjet" +i+"'src='images/icon-fav-hover.svg' alt='favoritos' onclick='addFavorito(this)'/> "+
                            "<img class='hoverImagenes' id='arjet" +i+"'src='images/icon-link-normal.svg' alt='' onclick='download(this)'/>"+
                            "<img class='hoverImagenes' id='arjet" +i+"'src='images/icon-max-normal.svg' alt='maximizar' onclick='maximizar(this)'/></div>" +  
                        
                        "</div>"

                        let existe = checkFavGif(document.getElementById('tarjet'+i).src);
                        console.log(existe)
                        if(existe)  document.getElementById('arjet'+i).src = 'images/icon-fav-active.svg'
                        else document.getElementById('arjet'+i).src = 'images/icon-fav-hover.svg'

                    } 
                }
                
            })

                
            .catch(error => {
                console.log(error);
            })      
        
}

document.getElementById("busqueda").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        contador_verMas = 0;
        search(this,0);
    }
});

document.getElementById('verMas').addEventListener('click', () => { 
    
        if(contador_verMas <= 2){
            contador_verMas ++;
            search(campo_verMas, contador_verMas);
        }else{
            //ocultador boton
            
        }
    

});

function  searchTrending() {  
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=9&rating=g`;
    console.log('url de consulta: ' + url);
    fetch(url).then (response => response.json())
        .then(content => {
            let i=0;
            for (i = 0; i < 3; i++){
                let img = document.createElement('img');
                console.log(content.data[i].images.fixed_height.url)
                img.src = content.data[i].images.fixed_height.url;
                img.alt = content.data[i].title;
                let resultado = document.getElementById('resulTrendingGif');
                resultado.appendChild(img);
            }
        })
        .catch(error => {
            console.log(error);
        })      
}

searchTrending();

function  searchTrendingTag() {  
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    console.log('url de consulta: ' + url);
    fetch(url).then (response => response.json())
        .then(content => {
            let i=0;
            for (i = 0; i < 4; i++) {
                let h3 = document.createElement('h3');
                h3.innerHTML = content.data[i]+' ';
                let resultado = document.getElementById('resulTrendingTag');
                resultado.appendChild(h3);

                console.log(content.data[i]);
            }
        })
        .catch(error => {
            console.log(error);
        })      
}

searchTrendingTag();

function  searchAuto(term) {  
    let sugerencia = term.value;
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${sugerencia}`;
    console.log('url de consulta: ' + url);
    fetch(url).then (response => response.json())
        .then(content => {

                let resultado = document.getElementById('autocompletar');
                let resultado2 = document.getElementById('autocompletar2');
                let resultado3 = document.getElementById('autocompletar3');
                let resultado4 = document.getElementById('autocompletar4');
                
                switch (content.data.length) {
                    case 0:
                        resultado.innerHTML = '';
                        resultado2.innerHTML = '';
                        resultado3.innerHTML = '';
                        resultado4.innerHTML = '';
                        break;
                    case 1:
                        resultado.innerHTML = content.data[0].name;
                        resultado2.innerHTML = '';
                        resultado3.innerHTML = '';
                        resultado4.innerHTML = '';
                        break;
                    case 2:
                        resultado.innerHTML = content.data[0].name;
                        resultado2.innerHTML = content.data[1].name;
                        resultado3.innerHTML = '';
                        resultado4.innerHTML = '';
                        break;
                    case 3: 
                        resultado.innerHTML = content.data[0].name;
                        resultado2.innerHTML = content.data[1].name;
                        resultado3.innerHTML = content.data[2].name;;
                        resultado4.innerHTML = '';
                        break;
                    case 4:
                        resultado.innerHTML = content.data[0].name;
                        resultado2.innerHTML = content.data[1].name;
                        resultado3.innerHTML = content.data[2].name;
                        resultado4.innerHTML = content.data[3].name;
                        break;
                    default:
                        resultado.innerHTML = content.data[0].name;
                        resultado2.innerHTML = content.data[1].name;
                        resultado3.innerHTML = content.data[2].name;
                        resultado4.innerHTML = content.data[3].name;
                        break;

                }
                
        })
        .catch(error => {
            console.log(error);
        })      
        
}

document.getElementById("busqueda").addEventListener('keyup', function (e) {
    searchAuto(this);
    
});

//sugerencias de busquedas 

let sugerencia1 = document.getElementById("autocompletar");
let sugerencia2 = document.getElementById("autocompletar2");
let sugerencia3 = document.getElementById("autocompletar3");
let sugerencia4 = document.getElementById("autocompletar4");

let busqueda = document.getElementById("busqueda");

sugerencia1.addEventListener('click', () => {
    busqueda.value = sugerencia1.innerText;
    search(busqueda, contador_verMas);
    sugerencia1.innerHTML = '';
    sugerencia2.innerHTML = '';
    sugerencia3.innerHTML = '';
    sugerencia4.innerHTML = '';
});

sugerencia2.addEventListener('click', () => {
    busqueda.value = sugerencia2.innerText;
    search(busqueda, contador_verMas);
    sugerencia1.innerHTML = '';
    sugerencia2.innerHTML = '';
    sugerencia3.innerHTML = '';
    sugerencia4.innerHTML = '';
});

sugerencia3.addEventListener('click', () => {
    busqueda.value = sugerencia3.innerText;
    search(busqueda, contador_verMas);
    sugerencia1.innerHTML = '';
    sugerencia2.innerHTML = '';
    sugerencia3.innerHTML = '';
    sugerencia4.innerHTML = '';
});

sugerencia4.addEventListener('click', () => {
    busqueda.value = sugerencia4.innerText;
    search(busqueda, contador_verMas);
    sugerencia1.innerHTML = '';
    sugerencia2.innerHTML = '';
    sugerencia3.innerHTML = '';
    sugerencia4.innerHTML = '';
});

//fin de sugerencias de busquedas

//modo noche
const btnSwitch = document.querySelector('#switch');

function modoNoche() {
    document.body.classList.toggle('dark');
    document.getElementById('ppal').classList.toggle('dark');
    document.getElementById('busqueda').classList.toggle('dark');
    document.getElementById('nav').classList.toggle('dark');
    document.getElementById('title').classList.toggle('darkTitle');
    document.getElementById('drop-menu').classList.toggle('dark');
    document.getElementById('trending').classList.toggle('darkTrending');
    document.getElementById('switch').classList.toggle('darkTitle');
    document.getElementById('link1').classList.toggle('darkTitle');
    document.getElementById('link2').classList.toggle('darkTitle');
    document.getElementById('lineTop').classList.toggle('darkBackground');
    document.getElementById('lineBotton').classList.toggle('darkBackground');
    document.getElementById('trendingH2').classList.toggle('darkTitle');
    document.getElementById('trendingH3').classList.toggle('darkTitle');
    document.getElementById('trending2').classList.toggle('darkTitle');
    document.getElementById('resulTrendingTag').classList.toggle('darkTitle');
    document.getElementById('busquedaBorde').classList.toggle('darkBorder');
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