const works = [
  {
    title: "Delivery Club x \u0427\u0411\u0414",
    meta: "Music / Sound design",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/delivery-club-chbd.mp4",
    image: "https://i.vimeocdn.com/video/997280197-66c1df35cdcef6a9edc15b4d2e00163e688447e8577c6926e965e6efa569c176-d_1280x720?&r=pad&region=us",
  },
  {
    title: "Ostrovok",
    meta: "Music / Sound design",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/ostrovok.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/ostrovok.png",
  },
  {
    title: "Head & Shoulders x \u0427\u0411\u0414",
    meta: "Music / Sound design",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/head-shoulders-chbd.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/head-shoulders-chbd.png",
  },
  {
    title: "\u041c\u0422\u0421 x \u0427\u0411\u0414",
    meta: "Music",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/mts-chbd.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/mts-cover-large.png",
  },
  {
    title: "Olymptrade",
    meta: "Music / Sound design",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/olymptrade.mp4",
    image: "https://i.vimeocdn.com/video/1928920050-f0132b7d37aebbd70c8efaceabce371ab8379bb352f7d8b7fe9a479e3616ed65-d_1280x720?&r=pad&region=us",
  },
  {
    title: "TBank Black",
    meta: "Music / Sound design",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/tbank-black.mp4",
    image: "https://i.vimeocdn.com/video/2086942113-39ef6c2a1983ee68e50b9fe7eb69dff4a3a3892fc4facbe14318c441259c132a-d_1280x720?&r=pad&region=us",
  },
  {
    title: "TBank Junior",
    meta: "Music / Sound design",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/tbank-junior.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/tbank-junior.png",
  },
  {
    title: "Cherry Tiggo 7 PRO MAX",
    meta: "Music / Sound design",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/chery-tiggo-7-pro-max.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/chery-tiggo-7-pro-max.png",
  },
  {
    title: "Old Spice x \u0427\u0411\u0414",
    meta: "Music / Sound design",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/old-spice-chbd.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/old-spice-chbd.png",
  },
  {
    title: "GJ Adult",
    meta: "Music / Sound design",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/gj-adult.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/gj-adult.png",
  },
];

let current = 0;
let titleFadeTimer;

const video = document.querySelector(".player-video");
const mainPlayer = document.querySelector(".main-player");
const title = document.querySelector(".player-title");
const playButton = document.querySelector('[data-action="play"]');
const muteButton = document.querySelector('[data-action="mute"]');
const globalMuteButton = document.querySelector('[data-action="global-mute"]');
const progress = document.querySelector(".progress");
const timecode = document.querySelector(".timecode");
const grid = document.querySelector(".work-grid");
const giantMark = document.querySelector(".giant-mark");
const menuItems = document.querySelectorAll(".center-menu a");

function playCurrentWork() {
  ensureVideoSource();
  video.play().catch(() => {
    syncControls();
  });
}

function ensureVideoSource() {
  const work = works[current];
  if (video.currentSrc === work.video || video.src === work.video) return;

  video.src = work.video;
  video.load();
}

function showPlayerTitle() {
  clearTimeout(titleFadeTimer);
  mainPlayer.classList.remove("is-title-hidden");
}

function scheduleTitleFade() {
  clearTimeout(titleFadeTimer);
  if (video.paused) return;

  titleFadeTimer = setTimeout(() => {
    mainPlayer.classList.add("is-title-hidden");
  }, 5000);
}

function loadWork(index, options = {}) {
  current = (index + works.length) % works.length;
  const work = works[current];
  video.pause();
  video.removeAttribute("src");
  video.poster = work.image;
  video.muted = false;
  video.volume = 1;
  title.textContent = work.title;
  showPlayerTitle();
  progress.value = 0;
  timecode.textContent = "00:00";
  video.load();
  syncControls();

  if (options.autoplay) {
    ensureVideoSource();
    playCurrentWork();
  }
}

function syncControls() {
  playButton.textContent = video.paused ? "Play" : "Pause";
  const muteLabel = video.muted ? "Unmute" : "Mute";
  muteButton.textContent = muteLabel;
  globalMuteButton.textContent = muteLabel;
  mainPlayer.classList.toggle("is-playing", !video.paused);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function syncProgress() {
  if (!Number.isFinite(video.duration) || video.duration === 0) {
    progress.value = 0;
    timecode.textContent = "00:00";
    return;
  }

  progress.value = Math.round((video.currentTime / video.duration) * 1000);
  timecode.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
}

function renderGrid() {
  const baseOrder = works.map((work, index) => ({ ...work, index })).slice(3).concat(
    works.map((work, index) => ({ ...work, index })).slice(0, 3),
  );
  const orderedWorks = baseOrder.filter((work) => work.title !== "GJ Adult").concat(
    baseOrder.filter((work) => work.title === "GJ Adult"),
  );

  grid.replaceChildren(
    ...orderedWorks.map((work) => {
      const card = document.createElement("a");
      card.className = "work-card";
      card.href = "#latest";
      card.dataset.workIndex = work.index;
      card.innerHTML = `
        <img src="${work.image}" alt="" />
        <div class="work-copy">
          <div>
            <h2>${work.title}</h2>
            <p>${work.meta}</p>
          </div>
        </div>
      `;
      card.addEventListener("click", (event) => {
        event.preventDefault();
        loadWork(Number(card.dataset.workIndex), { autoplay: true });
        document.querySelector("#latest").scrollIntoView({ behavior: "smooth" });
      });
      return card;
    }),
  );
}

document.querySelector(".arrow-left").addEventListener("click", () => loadWork(current - 1, { autoplay: true }));
document.querySelector(".arrow-right").addEventListener("click", () => loadWork(current + 1, { autoplay: true }));

playButton.addEventListener("click", () => {
  if (video.paused) {
    playCurrentWork();
  } else {
    video.pause();
  }
  syncControls();
});

muteButton.addEventListener("click", () => {
  toggleMute();
});

globalMuteButton.addEventListener("click", () => {
  toggleMute();
});

function toggleMute() {
  video.muted = !video.muted;
  if (!video.muted) {
    video.volume = 1;
    video.play().catch(() => {});
  }
  syncControls();
}

progress.addEventListener("input", () => {
  if (!Number.isFinite(video.duration) || video.duration === 0) return;
  video.currentTime = (Number(progress.value) / 1000) * video.duration;
  syncProgress();
});

video.addEventListener("play", syncControls);
video.addEventListener("play", scheduleTitleFade);
video.addEventListener("pause", () => {
  showPlayerTitle();
  syncControls();
});
video.addEventListener("volumechange", syncControls);
video.addEventListener("loadedmetadata", syncProgress);
video.addEventListener("timeupdate", syncProgress);
video.addEventListener("durationchange", syncProgress);

menuItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    giantMark.textContent = item.dataset.mark || giantMark.dataset.default;
  });

  item.addEventListener("mouseleave", () => {
    giantMark.textContent = giantMark.dataset.default;
  });
});

renderGrid();
loadWork(0);

const params = new URLSearchParams(window.location.search);

if (params.get("cover") === "mts") {
  document.body.classList.add("cover-capture");
  loadWork(3);
  video.addEventListener(
    "loadedmetadata",
    () => {
      video.currentTime = Math.min(42, Math.max(0, video.duration - 1));
    },
    { once: true },
  );
  video.addEventListener(
    "seeked",
    () => {
      video.pause();
    },
    { once: true },
  );
}
