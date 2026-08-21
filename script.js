// LÓGICA DA CÂMERA INSTANTÂNEA
const button = document.getElementById("button");
const flash = document.getElementById("flash");
const camera = document.getElementById("camera");
const photo = document.getElementById("photo");
const photoInner = photo.querySelector(".polaroid-inner");

let alreadyShot = false;
let focusTransitioning = false;

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
    if (focusTransitioning) return;
    focusTransitioning = true;

    const currentRect = photo.getBoundingClientRect();
    photo.style.position = "fixed";
    photo.style.top = `${currentRect.top}px`;
    photo.style.left = `${currentRect.left}px`;
    photo.style.width = `${currentRect.width}px`;
    photo.style.margin = "0";
    photo.style.transform = "none";
    photo.style.animation = "none";
    photo.classList.add("centered");

    // Mantém a posição atual em um frame antes de iniciar o deslocamento.
    void photo.offsetWidth;
    requestAnimationFrame(() => {
      photo.style.position = "";
      photo.style.top = "";
      photo.style.left = "";
      photo.style.width = "";
      photo.style.margin = "";
      photo.style.transform = "";
      photo.style.animation = "";
    });

    setTimeout(() => {
      photoInner.classList.add("flipped");
      focusTransitioning = false;
    }, 200);
  } else {
    if (focusTransitioning) return;
    // cliques subsequentes: apenas virar/desvirar
    photoInner.classList.toggle("flipped");
  }
});

button.addEventListener("click", shoot);