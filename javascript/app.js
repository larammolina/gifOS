
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
    let url = `api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${sugerencia}`;
    console.log('url de consulta: ' + url);
    fetch(url).then (response => response.json())
        .then(content => {
            let h6 = document.createElement('h6');
            h6.innerHTML = content.data[0];
            let resultado = document.getElementById('autocompletar');
            resultado.appendChild(h6);
        })
        .catch(error => {
            console.log(error);
        })      
        
}

document.getElementById("busqueda").addEventListener('keyup', function (e) {
    searchAuto(this);
    
});