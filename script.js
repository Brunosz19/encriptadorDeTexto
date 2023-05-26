const input = document.querySelector("textarea");
const encryptButton = document.querySelector(".button-encriptar");
const decryptButton = document.querySelector(".button-desencriptar");
const section = document.querySelector(".output-section");
const alert = document.querySelector("#alert-message");
// Parrafo utilizado para mostrar el mensaje encriptado:
const p = document.createElement("p");

let encryptedWord = "";
let decryptedWord = "";

function alertMessage(message) {
  alert.innerHTML = message;
  alert.style.color = "rgb(142, 21, 21)";
  alert.style.fontSize = "20px";
}

function imageOutput(message) {
  section.innerHTML = "";
  const image = document.createElement("img");
  image.src = "./assets/images/Muñeco.svg";
  image.alt = "A person looking for something.";
  image.className = "munheco";
  const pOne = document.createElement("p");
  const pTwo = document.createElement("p");
  pOne.className = "advice";
  pOne.innerHTML = message || "Ningún mensaje fue encontrado";
  pTwo.className = "secondary-advice";
  pTwo.innerHTML = "Ingresa el texto que desees encriptar o desencriptar.";
  section.className = "output-section";

  section.append(image, pOne, pTwo);
}

function incorrectText(message) {
  if (message.split("").some((e) => e === e.toUpperCase() && e !== " ")) {
    return "mayuscula";
  } else if (message.split("").some((e) => /[áéíóúÁÉÍÓÚ]/.test(e))) {
    return "tilde";
  } else {
    return "correct";
  }
}

function showMessage(message) {
  section.innerHTML = "";
  section.classList.add("output-section", "output-section_secondary");
  const p = document.createElement("p");
  p.id = "encryptedMessage"
  p.style.width = "100%";

  const copyButton = document.createElement("button");
  copyButton.className = "button-copy";
  copyButton.innerHTML = "Copiar";
  copyButton.addEventListener("click", copyMessage)
  p.innerHTML = `${message}`;

  section.append(p, copyButton);
}

function copyMessage(){
  const paragraph = document.getElementById("encryptedMessage");
  const range = document.createRange();
  const selection = window.getSelection();
  
  range.selectNodeContents(paragraph);
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand('copy');

  selection.removeAllRanges();
}

function encryptMessage() {
  alert.innerHTML = "Solo letras minúsculas y sin acentos";
  alert.style.color = "#495057";
  alert.style.fontSize = "12px";

  let message = input.value;

  encryptedWord = message
    .split("")
    .map((e) => {
      if (e === "a") {
        return (e = "ai");
      } else if (e === "e") {
        return (e = "enter");
      } else if (e === "i") {
        return (e = "imes");
      } else if (e === "o") {
        return (e = "ober");
      } else if (e === "u") {
        return (e = "ufat");
      } else {
        return e;
      }
    })
    .join("");

  if (message === "") {
    imageOutput();
  } else if ("mayuscula" === incorrectText(message)) {
    alertMessage("Tu mensaje tiene mayusculas, quitalos e intentalo de nuevo.");
    imageOutput("¡Tu mensaje contiene un error!");
  } else if ("tilde" === incorrectText(message)) {
    alertMessage("Tu mensaje tiene acentos, quitalos e intentalo de nuevo.");
    imageOutput("¡Tu mensaje contiene un error!");
  } else {
    showMessage(encryptedWord);
  }
}

function decryptMessage() {
  let message = input.value;

  message = message.replaceAll("ai", "a");
  message = message.replaceAll("imes", "i");
  message = message.replaceAll("enter", "e");
  message = message.replaceAll("ober", "o");
  message = message.replaceAll("ufat", "u");

  decryptedWord = message;

  if (message === "") {
    imageOutput();
  } else if ("mayuscula" === incorrectText(message)) {
    alertMessage("Tu mensaje tiene mayusculas, quitalos e intentalo de nuevo.");
    imageOutput("¡Tu mensaje contiene un error!");
  } else if ("tilde" === incorrectText(message)) {
    alertMessage("Tu mensaje tiene acentos, quitalos e intentalo de nuevo.");
    imageOutput("¡Tu mensaje contiene un error!");
  } else {
    showMessage(decryptedWord);
  }
}

encryptButton.addEventListener("click", encryptMessage);
decryptButton.addEventListener("click", decryptMessage);
