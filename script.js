const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const btnDescargarModal = document.getElementById("btnDescargarModal");
const cerrarModal = document.getElementById("cerrarModal");

async function descargarVideo() {
  const input = document.getElementById("tiktokUrl");
  const container = document.getElementById("videoContainer");
  const url = input.value.trim();

  container.innerHTML = "";

  if (!url.startsWith("http")) {
    container.innerHTML = "<p class='error'>Eso no parece ser un enlace de TikTok válido.</p>";
    return;
  }

  container.innerHTML = "Cargando...";

  try {
    const response = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    mostrarResultado(data, container);
  } catch (err) {
    container.innerHTML = "<p class='error'>Error al conectar con el servidor. Intenta más tarde.</p>";
    console.error(err);
  }
}

function mostrarResultado(data, container) {
  if (data.code === 0 && data.data && data.data.play) {
    container.innerHTML = "";

    modalVideo.src = data.data.play;
    modalVideo.controls = false;
    modalVideo.play();

    btnDescargarModal.onclick = () => {
      const a = document.createElement("a");
      a.href = data.data.play;
      a.download = "video_sin_marca.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    modal.classList.add("show");
  } else {
    container.innerHTML = "<p class='error'>No se pudo obtener el video. Intenta con otro enlace.</p>";
  }
}

cerrarModal.onclick = () => {
  modal.classList.remove("show");
  modalVideo.pause();
  modalVideo.src = "";
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    modalVideo.pause();
    modalVideo.src = "";
  }
};

  const input = document.getElementById("tiktokUrl");
  const clearBtn = document.getElementById("clearInput");

  input.addEventListener("input", () => {
    clearBtn.style.display = input.value ? "block" : "none";
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";
    input.focus();
  });
