let model;
let currentPrediction = "";

async function loadModel() {
  model = await mobilenet.load();
  console.log("Modelo cargado");
}

loadModel();

async function analyzeImage() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    const predictions = await model.classify(img);
    currentPrediction = predictions[0].className;
    document.getElementById("result").innerText =
      "Detectado: " + currentPrediction;
  };
}

function saveItem() {
  const price = document.getElementById("priceInput").value;

  if (!currentPrediction || !price) {
    alert("Falta reconocer o asignar precio");
    return;
  }

  let collection = JSON.parse(localStorage.getItem("collection")) || [];

  collection.push({
    name: currentPrediction,
    price: price
  });

  localStorage.setItem("collection", JSON.stringify(collection));

  displayCollection();
}

function displayCollection() {
  let collection = JSON.parse(localStorage.getItem("collection")) || [];
  const list = document.getElementById("collectionList");
  list.innerHTML = "";

  collection.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - $${item.price}`;
    list.appendChild(li);
  });
}

displayCollection();