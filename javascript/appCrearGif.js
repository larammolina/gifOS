
const apiKey = 'KBzPxkz8JbGW5o84HBSui0A3IJFindfN';

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

    //pido permiso al usuario
    getStreamAndRecord();

})


async function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 370 }
        }
    })
        .then(async function (stream) {
            console.log("comienza stream")
            let video = document.querySelector("#vid1");
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

            function mostrarVID(){    
                //let context = canvas.getContext("2d");
                //context.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.src = URL.createObjectURL(recorder.getBlob())
                canvas.classList.toggle("on")
                canvas.style="display:block"
                  
            }

                async function subirGif() {

                    let formm = new FormData();
                    //formm.append("api_key", apiKey);
                    //formm.append("file", recorder.getBlob());
                    //form.append("source_post_url", "https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4")
                    //form.append("tags", "cat")
                    formm.append('file', recorder.getBlob(), 'myGif.gif');
                    
                    for (var value of formm.values()) {
                        console.log(value);
                    }
                    
                    await fetch('https://upload.giphy.com/v1/gifs?api_key=KBzPxkz8JbGW5o84HBSui0A3IJFindfN', {
                            method: "POST",
                            body: formm,
                            
                            //mode: "no-cors"
                    })
                    .then((response) => response.json())  // convert to json
                    .then((myGif) => {
                        console.log(myGif.data.id);
                        agregarGifo(myGif.data.id);
                    })    //print data to console
                    .catch(err => console.log('Request Failed', err)); // Catch errors
                    
                }
            

            //segundo boton Grabar
            let grabar = document.getElementById('grabar');
            grabar.addEventListener('click', (ev) => {
                document.querySelector('#contenido').textContent = '';
                document.querySelector('#contenido2').textContent = '';
                document.querySelector('#contenido3').textContent = '';

                comenzarGrabar();

            })

            //tercer boton Finalizar 
            let finalizar = document.getElementById('finalizar');
            finalizar.addEventListener('click', (ev) => {
                document.querySelector('#contenido').textContent = '';
                document.querySelector('#contenido2').textContent = '';
                document.querySelector('#contenido3').textContent = '';

                pararGrabacion();
            })

            //tercer boton Finalizar 
            let subirGifo = document.getElementById('subirGifo');
            subirGifo.addEventListener('click', (ev) => {
                document.querySelector('#contenido').textContent = '';
                document.querySelector('#contenido2').textContent = '';
                document.querySelector('#contenido3').textContent = '';

                subirGif();
            })
        });


}

function agregarGifo(gifoID) {
    if (typeof(Storage) !== "undefined") {
        // LocalStorage disponible
        if (localStorage.getItem("misGifos") !== null) {
            console.log("Guardando GIFO localStorage")
            let gifos = JSON.parse(localStorage.getItem('misGifos'));
            console.log(gifos);


            //chequeo que el ID no exite en el array
            //agrego al ID al principio.
            //Lo guardo.

            if(gifos.indexOf(gifoID) == -1){
                // como no existe el ID lo agrego
                gifos.push(gifoID);
            }

            console.log("nuevo Array: "+ gifos);

            localStorage.setItem('misGifos', JSON.stringify(gifos));
            
            console.log("Guardados")
                    
        }else{
            console.log('no existe mis gifos -- creando');
            let gifos = [gifoID];
            console.log("nuevo Array: "+ gifos);

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

