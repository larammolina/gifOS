
// const apiKey = 'KBzPxkz8JbGW5o84HBSui0A3IJFindfN';

function  searchTrending() {  
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=KBzPxkz8JbGW5o84HBSui0A3IJFindfN&limit=9&rating=g`;
    console.log('url de consulta: ' + url);
    fetch(url).then (response => response.json())
        .then(content => {
            let i=0;
            for (i = 0; i < 3; i++){
                // let img = document.createElement('img');
                // console.log(content.data[i].images.fixed_height.url)
                // //img.src = content.data[i].images.fixed_height.url;
                // img.alt = content.data[i].title;
                let contenedor = document.getElementById('resulTrendingGif');
                // resultado.appendChild(img);

                contenedor.innerHTML += 
                "<div class='tarjetas'> " + 
                            
                "<img class='resultadoGif' id='trendingg" +i+"' src="+content.data[i].images.downsized.url+" alt="+content.data[i].title+" />" +

                "<div class='contenedorImagenes'>" +
                "<img class='hoverImagenes' id='rendingg" +i+"'src='images/icon-fav-hover.svg' alt='favoritos' onclick='addFavorito(this)'/> "+
                "<img class='hoverImagenes' id='rendingg" +i+"'src='images/icon-download.svg' alt='' onclick='download(this)'/>"+
                "<img class='hoverImagenes' id='rendingg" +i+"'src='images/icon-max-normal.svg' alt='maximizar' onclick='maximizar(this)'/></div>" +  
                            
                "</div>"

                let existe = checkFavGif(document.getElementById('trendingg'+i).src);
                console.log('verrrr: '+document.getElementById('trendingg'+i).src)
                //console.log(existe)
                if(existe)  {
                    document.getElementById('rendingg'+i).src = 'images/icon-fav-active.svg'
                    console.log('fav')
                }
                else document.getElementById('rendingg'+i).src = 'images/icon-fav-hover.svg'

            }
        })
        .catch(error => {
            console.log(error);
        })      
}

searchTrending();

// function  searchTrendingTag() {  
//     let url = `https://api.giphy.com/v1/trending/searches?api_key=KBzPxkz8JbGW5o84HBSui0A3IJFindfN`;
//     console.log('url de consulta: ' + url);
//     fetch(url).then (response => response.json())
//         .then(content => {
//             let i=0;
//             let resultado = document.getElementById('resulTrendingTag');
            
//             for (i = 0; i < 4; i++) {
//                 // let h3 = document.createElement('h3');
//                 // h3.innerHTML = content.data[i]+' ';
//                 // h3.id = 'tag'+i;
//                 // let busqueda = getElementById()
//                 busqueda.value = content.data[i];
//                 resultado.innerHTML+=
//                 "<h3 id='trendingTag"+i+"' onclick='searchTag(this)' >" + 
//                 content.data[i]+
//                 ".   </h3>"
//                 // resultado.appendChild(h3);
//                 //console.log(content.data[i]);
//             }
//         })
//         .catch(error => {
//             console.log(error);
//         })
          
// }

// searchTrendingTag();



// document.getElementById("tag0").addEventListener('click', ()=>{

// function searchTag(tag){
//     busqueda.value = tag.innerText;
//     search(busqueda, contador_verMas);
// }
// });