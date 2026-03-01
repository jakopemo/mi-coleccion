let model;
const URL = "./";

async function init() {
    model = await tmImage.load(URL + "modelo.json", URL + "metadatos.json");
    const webcam = new tmImage.Webcam(300, 300, true);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);

    async function loop() {
        webcam.update();
        await predict(webcam.canvas);
        window.requestAnimationFrame(loop);
    }

    async function predict(image) {
        const prediction = await model.predict(image);
        let highest = prediction[0];

        for (let i = 1; i < prediction.length; i++) {
            if (prediction[i].probability > highest.probability) {
                highest = prediction[i];
            }
        }

        let precio = "";

        if (highest.className === "NombreDeTuFigura1") {
            precio = "$300";
        } else if (highest.className === "NombreDeTuFigura2") {
            precio = "$500";
        }

        document.getElementById("resultado").innerHTML =
            "Detectado: " + highest.className +
            "<br>Precio: " + precio;
    }
}

init();
