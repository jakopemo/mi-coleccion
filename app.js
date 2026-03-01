let model, webcam, labelContainer;

const URL = "const URL = "https://teachablemachine.withgoogle.com/models/TU_ENLACE/";

async function init() {
    model = await tmImage.load(URL + "modelo.json", URL + "metadatos.json");

    webcam = new tmImage.Webcam(300, 300, true); 
    await webcam.setup({ facingMode: "environment" }); 
    await webcam.play();

    document.getElementById("webcam-container").innerHTML = "";
    document.getElementById("webcam-container").appendChild(webcam.canvas);

    window.requestAnimationFrame(loop);
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);

    let highest = prediction[0];
    for (let i = 1; i < prediction.length; i++) {
        if (prediction[i].probability > highest.probability) {
            highest = prediction[i];
        }
    }

    let precio = "";

    if (highest.className === "verde 300") {
        precio = "$300";
    } else if (highest.className === "rojo 200") {
        precio = "$500";
    }

    document.getElementById("resultado").innerHTML =
        "Detectado: " + highest.className +
        "<br>Precio: " + precio;
}


