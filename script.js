// LÓGICA DA CÂMERA INSTANTÂNEA
const button = document.getElementById("button");
const flash = document.getElementById("flash");
const camera = document.getElementById("camera");
const photo = document.getElementById("photo");
const photoInner = photo.querySelector(".polaroid-inner");

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
    
    // adiciona ready apenas após a transição de revelação terminar (2.6s)
    setTimeout(() => {
      photo.classList.add("ready");
    }, 2600);
  }, 2600);
}

// interação com a polaroid: clique para virar
photo.addEventListener("click", () => {
  if (!photo.classList.contains("ready")) return;
  
  // primeira interação: centralizar e virar
  if (!photo.classList.contains("centered")) {
    photo.classList.add("centered");
    setTimeout(() => {
      photoInner.classList.add("flipped");
    }, 50);
  } else {
    // cliques subsequentes: apenas virar/desvirar
    photoInner.classList.toggle("flipped");
  }
});

button.addEventListener("click", shoot);