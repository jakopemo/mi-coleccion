let model, webcam;

const URL = "./";

async function init() {
    try {
        model = await tmImage.load(URL + "model.json", URL + "metadata.json");

        webcam = new tmImage.Webcam(300, 300, true);
        await webcam.setup({ facingMode: "environment" });
        await webcam.play();

        document.getElementById("webcam-container").innerHTML = "";
        document.getElementById("webcam-container").appendChild(webcam.canvas);

        window.requestAnimationFrame(loop);
    } catch (error) {
        alert("Error: " + error);
    }
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

    document.getElementById("resultado").innerHTML =
        "Detectado: " + highest.className;
}
