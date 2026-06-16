const works = [
  {
    title: "Delivery Club x \u0427\u0411\u0414",
    meta: "Music / Sound design",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/delivery-club-chbd/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/delivery-club-chbd.mp4",
    image: "https://i.vimeocdn.com/video/997280197-66c1df35cdcef6a9edc15b4d2e00163e688447e8577c6926e965e6efa569c176-d_1280x720?&r=pad&region=us",
  },
  {
    title: "Ostrovok",
    meta: "Music / Sound design",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/ostrovok/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/ostrovok.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/ostrovok.png",
  },
  {
    title: "Head & Shoulders x \u0427\u0411\u0414",
    meta: "Music / Sound design",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/head-shoulders-chbd/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/head-shoulders-chbd.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/head-shoulders-chbd.png",
  },
  {
    title: "\u041c\u0422\u0421 x \u0427\u0411\u0414",
    meta: "Music",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/mts-chbd/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/mts-chbd.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/mts-cover-large.png",
  },
  {
    title: "Olymptrade",
    meta: "Music / Sound design",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/olymptrade/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/olymptrade.mp4",
    image: "https://i.vimeocdn.com/video/1928920050-f0132b7d37aebbd70c8efaceabce371ab8379bb352f7d8b7fe9a479e3616ed65-d_1280x720?&r=pad&region=us",
  },
  {
    title: "TBank Black",
    meta: "Music / Sound design",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/tbank-black/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/tbank-black.mp4",
    image: "https://i.vimeocdn.com/video/2086942113-39ef6c2a1983ee68e50b9fe7eb69dff4a3a3892fc4facbe14318c441259c132a-d_1280x720?&r=pad&region=us",
  },
  {
    title: "TBank Junior",
    meta: "Music / Sound design",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/tbank-junior/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/tbank-junior.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/tbank-junior.png",
  },
  {
    title: "Cherry Tiggo 7 PRO MAX",
    meta: "Music / Sound design",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/chery-tiggo-7-pro-max/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/chery-tiggo-7-pro-max.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/chery-tiggo-7-pro-max.png",
  },
  {
    title: "Old Spice x \u0427\u0411\u0414",
    meta: "Music / Sound design",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/old-spice-chbd/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/old-spice-chbd.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/old-spice-chbd.png",
  },
  {
    title: "GJ Adult",
    meta: "Music / Sound design",
    hls: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/hls/gj-adult/master.m3u8",
    video: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/videos/gj-adult.mp4",
    image: "https://pub-71cf5ad4e12b45e998894891123083eb.r2.dev/images/gj-adult.png",
  },
];

let current = 0;
let titleFadeTimer;
let hlsPlayer;
let activeVideoSource = "";
let selectedQuality = "auto";

const video = document.querySelector(".player-video");
const mainPlayer = document.querySelector(".main-player");
const title = document.querySelector(".player-title");
const playButton = document.querySelector('[data-action="play"]');
const muteButton = document.querySelector('[data-action="mute"]');
const progress = document.querySelector(".progress");
const timecode = document.querySelector(".timecode");
const qualityMenu = document.querySelector(".quality-menu");
const qualityTrigger = document.querySelector(".quality-trigger");
const qualityOptions = document.querySelector(".quality-options");
const grid = document.querySelector(".work-grid");
const giantMark = document.querySelector(".giant-mark");

function getOrderedWorkItems() {
  const workItems = works.map((work, index) => ({ ...work, index }));
  const priorityTitles = [
    "\u041c\u0422\u0421 x \u0427\u0411\u0414",
    "Olymptrade",
    "Delivery Club x \u0427\u0411\u0414",
    "TBank Black",
  ];
  const priorityWorks = priorityTitles
    .map((title) => workItems.find((work) => work.title === title))
    .filter(Boolean);

  return priorityWorks.concat(
    workItems.filter((work) => !priorityTitles.includes(work.title) && work.title !== "GJ Adult" && work.title !== "Ostrovok"),
    workItems.filter((work) => work.title === "GJ Adult"),
    workItems.filter((work) => work.title === "Ostrovok"),
  );
}

function getAdjacentWorkIndex(direction) {
  const orderedWorks = getOrderedWorkItems();
  const position = orderedWorks.findIndex((work) => work.index === current);
  const nextPosition = (position + direction + orderedWorks.length) % orderedWorks.length;

  return orderedWorks[nextPosition]?.index ?? 0;
}

function playCurrentWork() {
  ensureVideoSource();
  video.play().catch(() => {
    syncControls();
  });
}

function prepareCurrentWork() {
  ensureVideoSource();
}

function ensureVideoSource() {
  const work = works[current];
  const preferredSource = getPreferredVideoSource(work);
  if (activeVideoSource === preferredSource) return;

  destroyHlsPlayer();
  activeVideoSource = preferredSource;

  if (work.hls && window.Hls && window.Hls.isSupported()) {
    hlsPlayer = new window.Hls({
      capLevelToPlayerSize: true,
      maxBufferLength: 20,
      maxMaxBufferLength: 40,
    });
    hlsPlayer.loadSource(preferredSource);
    hlsPlayer.attachMedia(video);
    hlsPlayer.on(window.Hls.Events.MANIFEST_PARSED, () => {
      syncQualityOptions();
      applySelectedQuality();
    });
    hlsPlayer.on(window.Hls.Events.ERROR, (_event, data) => {
      if (!data.fatal) return;
      setMp4Source(work);
    });
    return;
  }

  if (work.hls && video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = preferredSource;
    video.load();
    syncQualityOptions();
    return;
  }

  setMp4Source(work);
}

function getPreferredVideoSource(work) {
  if (!work.hls) return work.video;
  if (selectedQuality === "auto") return work.hls;
  return work.hls.replace("master.m3u8", `${selectedQuality}p.m3u8`);
}

function destroyHlsPlayer() {
  if (!hlsPlayer) return;
  hlsPlayer.destroy();
  hlsPlayer = undefined;
  syncQualityOptions();
}

function setMp4Source(work) {
  destroyHlsPlayer();
  activeVideoSource = work.video;
  video.src = work.video;
  video.load();
}

function getQualityLevels() {
  if (!hlsPlayer || !Array.isArray(hlsPlayer.levels)) return [];

  const seen = new Set();
  return hlsPlayer.levels
    .map((level, index) => ({
      index,
      height: level.height || 0,
      bitrate: level.bitrate || 0,
    }))
    .filter((level) => {
      if (!level.height || seen.has(level.height)) return false;
      seen.add(level.height);
      return true;
    })
    .sort((a, b) => b.height - a.height);
}

function syncQualityOptions() {
  if (!qualityMenu || !qualityTrigger || !qualityOptions) return;

  const work = works[current];
  const levels = getQualityLevels().length > 0 ? getQualityLevels() : getStaticQualityLevels(work);
  const items = [
    { label: "Auto", value: "auto" },
    ...levels.map((level) => ({ label: `${level.height}p`, value: String(level.height) })),
  ];
  const hasSelectedQuality = items.some((item) => item.value === selectedQuality);
  if (!hasSelectedQuality) {
    selectedQuality = "auto";
  }

  qualityOptions.replaceChildren(
    ...items.map((item) => {
      const button = document.createElement("button");
      button.className = "quality-option";
      button.type = "button";
      button.role = "option";
      button.dataset.quality = item.value;
      button.textContent = item.label;
      button.setAttribute("aria-selected", String(item.value === selectedQuality));
      button.addEventListener("click", () => {
        selectedQuality = item.value;
        closeQualityMenu();
        syncQualityOptions();
        applySelectedQuality();
      });
      return button;
    }),
  );
  qualityTrigger.textContent = items.find((item) => item.value === selectedQuality)?.label || "Auto";
  qualityTrigger.disabled = levels.length === 0;
  qualityMenu.classList.toggle("is-disabled", levels.length === 0);
}

function closeQualityMenu() {
  if (!qualityMenu || !qualityTrigger) return;
  qualityMenu.classList.remove("is-open");
  qualityTrigger.setAttribute("aria-expanded", "false");
}

function applySelectedQuality() {
  const work = works[current];
  const nextSource = getPreferredVideoSource(work);
  if (activeVideoSource === nextSource) return;

  const resumeAt = video.currentTime || 0;
  const shouldResume = !video.paused;
  const restoreTime = () => {
    if (Number.isFinite(video.duration) && video.duration > resumeAt) {
      video.currentTime = resumeAt;
    }
    if (shouldResume) {
      video.play().catch(() => {
        syncControls();
      });
    }
    syncControls();
  };

  video.addEventListener("loadedmetadata", restoreTime, { once: true });
  activeVideoSource = "";
  ensureVideoSource();

  if (hlsPlayer && selectedQuality === "auto") {
    hlsPlayer.currentLevel = -1;
    return;
  }

  if (!hlsPlayer) return;

  const targetHeight = Number(selectedQuality);
  const targetLevel = getQualityLevels().find((level) => level.height === targetHeight);
  hlsPlayer.currentLevel = targetLevel ? targetLevel.index : -1;
}

function getStaticQualityLevels(work) {
  if (!work.hls) return [];
  return [
    { height: 1080 },
    { height: 720 },
    { height: 480 },
  ];
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
  destroyHlsPlayer();
  activeVideoSource = "";
  video.removeAttribute("src");
  video.poster = work.image;
  video.muted = false;
  video.volume = 1;
  title.textContent = work.title;
  showPlayerTitle();
  progress.value = 0;
  timecode.textContent = "00:00";
  video.load();
  syncQualityOptions();
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
  const orderedWorks = getOrderedWorkItems();

  grid.replaceChildren(
    ...orderedWorks.map((work) => {
      const card = document.createElement("a");
      card.className = "work-card";
      card.href = "#latest";
      card.dataset.workIndex = work.index;
      card.innerHTML = `
        <img src="${work.image}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
        <div class="work-copy">
          <div>
            <h2>${work.title}</h2>
            <p>${work.meta}</p>
          </div>
        </div>
      `;
      const image = card.querySelector("img");
      const showImage = () => {
        card.classList.add("is-image-loaded");
      };
      const showFallback = () => {
        if (card.classList.contains("is-image-missing")) return;
        card.classList.remove("is-image-loaded");
        card.classList.add("is-image-missing");
      };
      image.addEventListener("load", showImage, { once: true });
      image.addEventListener("error", showFallback, { once: true });
      if (image.complete && image.naturalWidth > 0) {
        showImage();
      }
      card.addEventListener("click", (event) => {
        event.preventDefault();
        loadWork(Number(card.dataset.workIndex), { autoplay: true });
        document.querySelector("#latest").scrollIntoView({ behavior: "smooth" });
      });
      return card;
    }),
  );
}

document.querySelector(".arrow-left").addEventListener("click", () => loadWork(getAdjacentWorkIndex(-1), { autoplay: true }));
document.querySelector(".arrow-right").addEventListener("click", () => loadWork(getAdjacentWorkIndex(1), { autoplay: true }));

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

if (qualityTrigger && qualityMenu) {
  qualityTrigger.addEventListener("click", () => {
    if (qualityTrigger.disabled) return;
    const isOpen = qualityMenu.classList.toggle("is-open");
    qualityTrigger.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!qualityMenu.contains(event.target)) {
      closeQualityMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeQualityMenu();
    }
  });
}

function toggleMute() {
  video.muted = !video.muted;
  if (!video.muted) {
    video.volume = 1;
    video.play().catch(() => {});
  }
  syncControls();
}

giantMark.addEventListener("pointerenter", prepareCurrentWork);
giantMark.addEventListener("focus", prepareCurrentWork);
giantMark.addEventListener("pointerdown", () => {
  playCurrentWork();
});

giantMark.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#latest").scrollIntoView({ behavior: "smooth" });
  playCurrentWork();
});

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

renderGrid();
loadWork(works.findIndex((work) => work.title === "Olymptrade"));

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
