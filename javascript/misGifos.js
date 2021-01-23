
function cargarGifos() {
    if (typeof(Storage) !== "undefined") {
        // LocalStorage disponible
        if (localStorage.getItem("misGifos") !== null) {
            
            let gifos = JSON.parse(localStorage.getItem('misGifos'));
            for (i in gifos){
                console.log("Gifo "+i+": "+gifos[i])
            }
            
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

//var gifs = [1,2,3,4,5];
//localStorage.setItem('misGifos', JSON.stringify(gifs));
//localStorage.clear()
cargarGifos();

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