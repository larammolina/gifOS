
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

let comenzar = document.getElementById('comenzar');
comenzar.addEventListener('click', (ev)=>{
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
                    previo = grabacion;
                    vidOff();
                });
            }

            function vidOff() {
                //clearInterval(theDrawLoop);
                //ExtensionData.vidStatus = 'off';
                video.pause();
                video.src = "";
                video.srcObject.getTracks()[0].stop();
                console.log("Video cam off");
              }

            function subirGif() {
                /*
                const form = new FormData();
                form.append("api_key", "");
                form.append("file", recorder.getBlob());

                let blob = form.get("file");
                enlaceURL = URL.createObjectURL(blob);
                localStorage.setItem("url", enlaceURL);
                function convertirGif() {
                    const toDataURL = url => fetch(url)
                        .then(response => response.blob())
                        .then(blob => new Promise((resolve, reject) => {
                            const reader = new FileReader()
                            reader.onloadend = () => resolve(reader.result)
                            reader.onerror = reject
                            reader.readAsDataURL(blob)
                        }))
                    toDataURL(enlaceURL)
                        .then(datosGif => {
                            localStorage.setItem(enlaceURL, datosGif);
                        })
                }
                convertirGif();
                setTimeout(function upload() {
                    fetch("https://upload.giphy.com/v1/gifs", {
                        method: "POST",
                        body: form,
                        mode: "no-cors",
                    });
                }, 5000);*/
            }
            
            let grabar = document.getElementById('grabar');
            grabar.addEventListener('click', (ev)=>{
                document.querySelector('#contenido').textContent = '';
                document.querySelector('#contenido2').textContent = '';
                document.querySelector('#contenido3').textContent = '';
    
                comenzarGrabar();
            })




/*

            function cabioDeCaptura() {
                const capturaVideo = document.querySelector("#capturaVideo");
                capturaVideo.style.display = "none";
                const previoVideo = document.getElementById("previoVideo");
                previoVideo.style.display = "flex";
            }

            function cambioSubida() {
                const previoVideo = document.querySelector("#previoVideo");
                previoVideo.style.display = "none";
                const subirVideo = document.getElementById("subirVideo");
                subirVideo.style.display = "flex";
                setTimeout(function chageToEnd() {
                    document.querySelector("#resultados").src = previo;
                    const subirVideo = document.querySelector("#subirVideo");
                    subirVideo.style.display = "none";
                    const opcionVideo = document.getElementById("opcionVideo");
                    opcionVideo.style.display = "flex";
                    const contenedorGridMyGif = document.getElementById("contenedorGridMyGif");
                    contenedorGridMyGif.style.display = "flex";
                }, 5000);
            }
            */
        }); 
}



    







//modo noche
const btnSwitch = document.querySelector('#switch');

function modoNoche() {
    document.body.classList.toggle('dark');
    document.getElementById('nav').classList.toggle('dark');
    document.getElementById('title').classList.toggle('darkTitle');
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

