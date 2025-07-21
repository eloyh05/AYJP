async function descargarVideo() {
  const input = document.getElementById("tiktokUrl");
  const container = document.getElementById("videoContainer");
  const url = input.value.trim();

  container.innerHTML = "";

  if (!url.startsWith("http")) {
    container.innerHTML = "<p class='error'>Por favor ingresa un enlace válido de TikTok.</p>";
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
    container.innerHTML = `
      <video src="${data.data.play}" controls></video>
      <br><a href="${data.data.play}" download>Descargar video sin marca de agua</a>
    `;
  } else {
    container.innerHTML = "<p class='error'>No se pudo obtener el video. Intenta con otro enlace.</p>";
  }
}
