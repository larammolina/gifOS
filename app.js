
//conecto la api giphy
const apiKey = 'KBzPxkz8JbGW5o84HBSui0A3IJFindfN';

function search(gif){
    //if(event.key === 'Enter') {
        //alert(ele.value);  
        let url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=`;
        //let gif_input = document.getElementById("search").value;
        let gif_input = gif.value;
        let url2 = url + gif_input;
        console.log('url de consulta: ' + url2);
        fetch(url2).then (response => response.json())
            .then(content => {
                //console.log('content.meta '+JSON.stringify(content.data[0]));
                let i=0;
                for (i = 0; i < 13; i++) {
                    let img = document.createElement('img');
                    console.log(content.data[i].images.fixed_height.url)
                    img.src = content.data[i].images.fixed_height.url;
                    img.alt = content.data[i].title;
                    /*let h3 = document.createElement('h3');
                    h3.innerHTML = content.data[i].title;
                    let resultadoTitulo = document.getElementById('resultadoTitulo');
                    resultadoTitulo.appendChild(h3);*/
                    let resultado = document.getElementById('resultado');
                    resultado.appendChild(img);
            }   })
                
            .catch(error => {
                console.log(error);
            })      
    //}
        
}

document.getElementById("busqueda").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search(this);
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
                h3.innerHTML = content.data[i];
                let resultado = document.getElementById('resulTrendingTag');
                resultado.appendChild(h3);
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
            let i=0;
            
                for (i = 0; i < content.data.length; i++) {
                
                let li = document.createElement('li');
                li.innerHTML = content.data[i].name;
                let resultado = document.getElementById('autocompletar');
                resultado.appendChild(li);
                if (i>=3) break;
                }
        })
        .catch(error => {
            console.log(error);
        })      
        
}

document.getElementById("busqueda").addEventListener('keyup', function (e) {
    searchAuto(this);
    
});

//modo noche
const btnSwitch = document.querySelector('#switch');

function modoNoche() {
    document.body.classList.toggle('dark');
    document.getElementById('ppal').classList.toggle('dark');
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