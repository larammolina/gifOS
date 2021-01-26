
const apiKey = 'KBzPxkz8JbGW5o84HBSui0A3IJFindfN';

document.getElementById('grabar').style.display = 'none';
document.getElementById('finalizar').style.display = 'none';
document.getElementById('subirGifo').style.display = 'none';



//pedir permiso a la camara
let constraintObj = {
    audio: false,
    video: {
        facingMode: "user",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 }
    }
};
// width: 1280, height: 720  -- preference only
// facingMode: {exact: "user"}
// facingMode: "environment"

//primer boton Comenzar a pedir permisos
let comenzar = document.getElementById('comenzar');
comenzar.addEventListener('click', (ev) => {
    document.querySelector('#contenido').textContent = '¿Nos das acceso a tu cámara?';
    document.querySelector('#contenido2').textContent = 'El acceso a tu camara será válido sólo';
    document.querySelector('#contenido3').textContent = 'por el tiempo en el que estés creando el GIFO.';
    document.getElementById('comenzar').style.display = 'none';
    document.getElementById('grabar').style.display = 'block';
    document.getElementById('1').style.backgroundColor = '#572EE5';
    document.getElementById('1').style.color = 'white';
    //pido permiso al usuario
    getStreamAndRecord();

})

let video = document.querySelector("#vid1");
async function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 370 }
        }
    })
        .then(async function (stream) {
            console.log("comienza stream")
            
            video.srcObject = stream;
            video.play();

            let recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('ha empezado la grabacion');
                },
            });


            async function comenzarGrabar() {
                console.log("grabando por 5 segundos...")
                recorder.startRecording();

                //grabo por 5 segundos
                const sleep = m => new Promise(r => setTimeout(r, m));
                await sleep(5000);

                pararGrabacion();
            }

            function pararGrabacion() {
                recorder.stopRecording(function (grabacion) {
                    console.log('ha parado la grabacion');
                    document.querySelector("#vid1").src = grabacion;
                    console.log("grabacion parada");

                    mostrarVID();
                    vidOff();
                });


                function vidOff() {
                    //clearInterval(theDrawLoop);
                    //ExtensionData.vidStatus = 'off';
                    video.pause();
                    //video.src = "";
                    video.srcObject.getTracks()[0].stop();
                    console.log("Video cam off");
                    //subirGif();

                }
            }

            let canvas = document.getElementById("showGif");

            function mostrarVID() {
                //let context = canvas.getContext("2d");
                //context.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.src = URL.createObjectURL(recorder.getBlob())
                canvas.classList.add("on");
                canvas.classList.remove('off');
                // canvas.style.display = 'block';

            }

            async function subirGif() {

                let formm = new FormData();
                //formm.append("api_key", apiKey);
                //formm.append("file", recorder.getBlob());
                //form.append("source_post_url", "https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4")
                //form.append("tags", "cat")
                formm.append('file', recorder.getBlob(), 'myGif.gif');
                console.log("subiendo...")
                for (var value of formm.values()) {
                    console.log(value);
                }

                
                fetch('https://upload.giphy.com/v1/gifs?api_key=KBzPxkz8JbGW5o84HBSui0A3IJFindfN', {
                    method: "POST",
                    body: formm,
                    //mode: "no-cors"
                })
                .then((response) => response.json())  // convert to json
                .then((myGif) => {
                    console.log("ID:" + myGif.data.id);
                    agregarGifo(myGif.data.id);
                    document.querySelector('#contenido2').textContent = 'GIFO subido con éxito';

                    const apiKey = 'KBzPxkz8JbGW5o84HBSui0A3IJFindfN';
                    let url = `http://api.giphy.com/v1/gifs/${(myGif.data.id)}?api_key=${apiKey}`;
                        
                        fetch(url).then (response => response.json())
                            .then(content => {
                            let contenedorImagenesID = document.getElementById('contenedorImagenesID');

                            contenedorImagenesID.innerHTML += 
                            "<div class='tarjetas'> " + 
                            
                            "<h3>"+'MI GIFO'+"</h3>" +
                            
                            "<img class='resultadoGif' id='tarjetCREA" +0+"' src="+content.data.images.downsized.url+"/>" +

                            "<div class='contenedorImagenesCrear'>" +
                                "<img class='hoverImagenes' id='arjetCREA" +0+"'src='images/icon-download.svg' alt='descargar' onclick='download(this)'/>" +  
                                "<img class='hoverImagenes' id='arjetCREA" +0+"'src='images/icon-link-normal.svg' alt='' onclick='download(this)'/></div>"+
                            
                            "</div>"
                            canvas.classList.add('off');
                            canvas.classList.remove('on');
                            video.classList.add('off');
                            video.classList.remove('on');

                        })
                            return true;
                    })    //print data to console
                .catch(err => {
                    console.log('Request Failed', err);
                    document.querySelector('#contenido2').textContent = 'GIFO ERROR';
                    return false;
                }); // Catch errors
                // document.querySelector('#contenido2').textContent = 'GIFO ERROR';
            }


            //segundo boton Grabar
            let grabar = document.getElementById('grabar');
            grabar.addEventListener('click', (ev) => {
                document.querySelector('#contenido').textContent = '';
                document.querySelector('#contenido2').textContent = '';
                document.querySelector('#contenido3').textContent = '';

                document.getElementById('grabar').style.display = 'none';
                document.getElementById('subirGifo').style.display = 'block';
                document.getElementById('1').style.backgroundColor = 'white';
                document.getElementById('1').style.color = '#572EE5';
                document.getElementById('2').style.backgroundColor = '#572EE5';
                document.getElementById('2').style.color = 'white';
                comenzarGrabar();

            })

            //tercer boton Finalizar 
            let finalizar = document.getElementById('finalizar');
            finalizar.addEventListener('click', (ev) => {
                document.querySelector('#contenido').textContent = '';
                document.querySelector('#contenido2').textContent = '';
                document.querySelector('#contenido3').textContent = '';
                document.querySelector('#subiendoGifo').textContent = '';
                document.getElementById('grabar').style.display = 'none';
                document.getElementById('subirGifo').style.display = 'block';
                document.getElementById('2').style.backgroundColor = 'white';
                document.getElementById('2').style.color = '#572EE5';
                document.getElementById('3').style.backgroundColor = '#572EE5';
                document.getElementById('3').style.color = 'white';
                pararGrabacion();
            })

            //cuarto boton SUBIR GIFO 
            let subirGifo = document.getElementById('subirGifo');
            subirGifo.addEventListener('click', async (ev) => {
                document.querySelector('#contenido').textContent = '';
                document.querySelector('#contenido2').textContent = '';
                document.querySelector('#contenido3').textContent = '';
                document.getElementById('subirGifo').style.display = 'none';
                document.getElementById('2').style.backgroundColor = 'white';
                document.getElementById('2').style.color = '#572EE5';
                document.getElementById('3').style.backgroundColor = '#572EE5';
                document.getElementById('3').style.color = 'white';
                document.querySelector('#contenido2').textContent = 'Estamos subiendo tu GIFO';
                let respuesta = await subirGif();
                console.log("Respuetsa: "+respuesta)
                // if (respuesta) {
                //     document.querySelector('#contenido2').textContent = 'GIFO subido con éxito';
                // } else {
                //     document.querySelector('#contenido2').textContent = 'GIFO ERROR';
                // }


            })
        });


}

async function agregarGifo(gifoID) {
    console.log("agregando... " + gifoID)
    if (typeof (Storage) !== "undefined") {
        // LocalStorage disponible
        if (localStorage.getItem("misGifos") !== null) {
            console.log("Guardando GIFO localStorage")
            let gifos = JSON.parse(localStorage.getItem('misGifos'));
            console.log(gifos);


            //chequeo que el ID no exite en el array
            //agrego al ID al principio.
            //Lo guardo.

            if (gifos.indexOf(gifoID) == -1) {
                // como no existe el ID lo agrego
                gifos.push(gifoID);
            }

            console.log("nuevo Array: " + gifos);

            localStorage.setItem('misGifos', JSON.stringify(gifos));

            console.log("Guardados")

        } else {
            console.log('no existe mis gifos -- creando');
            let gifos = [gifoID];
            console.log("nuevo Array: " + gifos);

            localStorage.setItem('misGifos', JSON.stringify(gifos));

            console.log("Guardados")

        }
    } else {
        // LocalStorage no soportado en este navegador
        //console.log("NO SOPORTADO")
    }
}

//modo noche
const btnSwitch = document.querySelector('#switch');

function modoNoche() {
    document.body.classList.toggle('dark');
    document.getElementById('nav').classList.toggle('dark');
    //document.getElementById('title').classList.toggle('darkTitle');
    document.getElementById('drop-menu').classList.toggle('dark');
    document.getElementById('switch').classList.toggle('darkTitle');
    document.getElementById('link1').classList.toggle('darkTitle');
    document.getElementById('link2').classList.toggle('darkTitle');
    document.getElementById('lineTop').classList.toggle('darkBackground');
    document.getElementById('lineBotton').classList.toggle('darkBackground');
    document.getElementById('drop-menu').classList.toggle('blackBackground');

    btnSwitch.textContent = 'Modo Diurno';
}

btnSwitch.addEventListener('click', () => {
    modoNoche();

    if (typeof (Storage) !== "undefined") {
        // LocalStorage disponible
        if (localStorage.getItem("modo") === 'true') {
            //debo sacar el modo noche
            localStorage.setItem("modo", 'false');
            console.log("MODO NOCHE FALSE: " + localStorage.getItem("modo"));
            btnSwitch.textContent = 'Modo Nocturno';

        } else {
            localStorage.setItem("modo", 'true');
            console.log("MODO NOCHE TRUE: " + localStorage.getItem("modo"));


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

if (typeof (Storage) !== "undefined") {
    // LocalStorage disponible
    if (localStorage.getItem("modo") === 'true') {
        console.log("modo noche seteado");
        // poner en modo noche
        modoNoche()
    } else {
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

