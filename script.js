// ---- Edit this list with your own tracks ----
// Put mp3 files in the /audio folder and point "src" at them.
const TRACKS = [
  { title: "Aasa Pulla",        src:"audio/track1.mp3"},
  { title: "Kannazhaga",        src:"audio/track2.mp3"},
  { title: "Mutta Kalakki",     src: "audio/track3.mp3" },
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const iconPlay = document.getElementById("iconPlay");
const iconPause = document.getElementById("iconPause");
const brew = document.querySelector(".brew");
const kulhadFill = document.getElementById("kulhadFill");
const nowPlaying = document.getElementById("nowPlaying");
const trackList = document.getElementById("trackList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const volume = document.getElementById("volume");

let currentIndex = 0;

function buildTrackList() {
  trackList.innerHTML = "";
  TRACKS.forEach((track, i) => {
    const li = document.createElement("li");
    li.className = "track";
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
    li.tabIndex = 0;
    li.textContent = `0${i + 1} ${track.title}`;
    li.addEventListener("click", () => loadTrack(i, true));
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        loadTrack(i, true);
      }
    });
    trackList.appendChild(li);
  });
}

function loadTrack(index, autoplay) {
  currentIndex = (index + TRACKS.length) % TRACKS.length;
  const track = TRACKS[currentIndex];
  audio.src = track.src;
  nowPlaying.textContent = `now pouring: ${track.title}`;
  [...trackList.children].forEach((li, i) => {
    li.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
  });
  kulhadFill.style.height = "0%";
  if (autoplay) {
    audio.play().catch(() => {
      // Autoplay might be blocked, or the mp3 file doesn't exist yet.
      nowPlaying.textContent = `add "${track.src}" to the audio folder, then hit play`;
    });
  }
}

function setPlayingUI(isPlaying) {
  brew.classList.toggle("is-playing", isPlaying);
  playBtn.setAttribute("aria-pressed", String(isPlaying));
  iconPlay.hidden = isPlaying;
  iconPause.hidden = !isPlaying;
}

playBtn.addEventListener("click", () => {
  if (!audio.src) loadTrack(currentIndex, false);
  if (audio.paused) {
    audio.play().catch(() => {
      nowPlaying.textContent = "add mp3 files to /audio to hear this round";
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => setPlayingUI(true));
audio.addEventListener("pause", () => setPlayingUI(false));
audio.addEventListener("ended", () => loadTrack(currentIndex + 1, true));

// kulhad fills up as the track progresses
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  kulhadFill.style.height = `${pct}%`;
});

prevBtn.addEventListener("click", () => loadTrack(currentIndex - 1, true));
nextBtn.addEventListener("click", () => loadTrack(currentIndex + 1, true));

volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);
});
audio.volume = Number(volume.value);

// init
buildTrackList();
loadTrack(0, false);
