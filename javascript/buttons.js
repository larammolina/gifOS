async function download(tarjeta){
    let imgID = 't'+tarjeta.id
    let imSRC = document.getElementById(imgID).src
    // window.alert('URL: '+imSRC)
    console.log("url: "+imSRC)
    fetch(imSRC)
    .then((img) => {
        let algo = img.blob();
        download2('mygif.gif', algo)
    });
    // invokeSaveAsDialog(blob, 'download.gif');
    
}

function download2(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    // pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
    // pom.setAttribute('src', text)
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}


function maximizar(tarjeta){
    let imgID = 't'+tarjeta.id
    let imSRC = document.getElementById(imgID).src
    console.log("maximizar: "+imSRC)

    let tarjetaMax = document.getElementById('max');
    let cuerpo = document.getElementById('cuerpo');
    let max_gif = document.getElementById('max_gif');
    //cargar src en img

    cuerpo.classList.add('off');
    cuerpo.classList.remove('on');
    tarjetaMax.classList.add('max');
    max_gif.classList.add('on');
    max_gif.src = imSRC;

}

function maximizarMobile (img) {
    console.log('imagenes src: ' + img.src);
    let tarjetaMax = document.getElementById('max');
    let cuerpo = document.getElementById('cuerpo');
    let max_gif = document.getElementById('max_gif');
    //cargar src en img

    cuerpo.classList.add('off');
    cuerpo.classList.remove('on');
    tarjetaMax.classList.add('max');
    max_gif.classList.add('on');
    max_gif.src = img.src;

}



document.getElementById('cerrar').addEventListener('click', () => {
    let tarjetaMax = document.getElementById('max');
    let cuerpo = document.getElementById('cuerpo');
    let max_gif = document.getElementById('max_gif');

    max_gif.classList.remove('max_gif');
    tarjetaMax.classList.remove('max');
    cuerpo.classList.add('on');
    tarjetaMax.classList.add('off');
    max_gif.classList.add('off');
})

// document.getElementById('trendingg0').addEventListener('click', () => {
//     maximizar(this);

// })