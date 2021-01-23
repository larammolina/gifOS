
const apiKey = 'KBzPxkz8JbGW5o84HBSui0A3IJFindfN';

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