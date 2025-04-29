document.addEventListener("DOMContentLoaded", async () => {
    const select = document.getElementById("channelSelect");
    const video = document.getElementById("video");

    const res = await fetch("/channels");
    const channels = await res.json();

    channels.forEach((ch, i) => {
        const opt = document.createElement("option");
        opt.value = ch.url;
        opt.textContent = ch.nombre;
        select.appendChild(opt);
    });

    function playStream(url) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        } else {
            alert("Tu navegador no soporta HLS");
        }
    }

    select.addEventListener("change", () => {
        const url = select.value;
        playStream(url);
    });

    if (channels.length > 0) {
        select.value = channels[0].url;
        playStream(channels[0].url);
    }
});
