// LÓGICA DA CÂMERA INSTANTÂNEA
const button = document.getElementById("button");
const flash = document.getElementById("flash");
const camera = document.getElementById("camera");
const photo = document.getElementById("photo");

let alreadyShot = false;

// disparo: botão -> flash -> impressão -> revelação
function shoot() {
  if (alreadyShot) return;
  alreadyShot = true;
  button.disabled = true;

  // animação de pressão do botão
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 140);

  // flash + pequena resposta da câmera
  flash.classList.add("fire");
  camera.classList.add("shake");
  setTimeout(() => {
    flash.classList.remove("fire");
    camera.classList.remove("shake");
  }, 420);

  // a foto começa a sair pelo slot
  setTimeout(() => {
    photo.classList.add("printing");
  }, 450);

  // revelação da imagem após a foto sair
  setTimeout(() => {
    photo.classList.add("revealed");
  }, 2600);
}

button.addEventListener("click", shoot);