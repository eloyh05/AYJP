const input = document.getElementById("codeInput");
const button = document.querySelector("button");
const testamento = document.getElementById("testamento");
const music = document.getElementById("music");

input.addEventListener("input", () => {
  input.value = input.value.replace(/[^0-9]/g, "");
});

function checkCode() {
  if (input.value.trim() === "") return;

  if (input.value === "0708") {
    testamento.classList.remove("hidden");
    music.currentTime = 0;
    music.play();
  } else {
    button.classList.add("error", "fade-in");
    button.textContent = "Incorrecto";

    setTimeout(() => {
      button.classList.remove("error", "fade-in");
      button.textContent = "Entrar";
    }, 1000);
  }
}