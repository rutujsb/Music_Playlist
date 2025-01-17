// Array of tracks with details
const tracks = [
  {
    name: "Angels by My Side",
    artist: "Unknown Artist",
    src: "Songs/angelsbymyside.mp3",
    art: "images/art1.jpg",
  },
  {
    name: "Dreamy Piano",
    artist: "Timeless Notes",
    src: "Songs/dreamy-piano-music-timeless-notes-195771.mp3",
    art: "images/art2.jpg",
  },

  {
    name: "Hold Me Tight",
    artist: "Unknown Artist",
    src: "Songs/hold-me-tight-278286.mp3",
    art: "images/art5.jpg",
  },
  {
    name: "Jingle Bells",
    artist: "Unknown Artist",
    src: "Songs/jingle-bells-christmas-holidays-celebration-background-intro-theme-265841.mp3",
    art: "images/art6.jpg",
  },

  {
    name: "Sad Piano One",
    artist: "Unknown Artist",
    src: "Songs/sad-piano-one-181090.mp3",
    art: "images/art9.jpg",
  },
  {
    name: "Spring Blossom",
    artist: "Unknown Artist",
    src: "Songs/spring-blossom-195416.mp3",
    art: "images/art10.jpg",
  },

  {
    name: "Experience Emotional Motivation",
    artist: "Unknown Artist",
    src: "Songs/experience-emotional-motivation-272832.mp3",
    art: "images/art3.jpg",
  },
  // Add more tracks if needed
];

// Initialize the audio object and other variables
const audio = new Audio(); // Audio object for playing songs
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const trackArt = document.getElementById("track-art");
const trackName = document.getElementById("track-name");
const trackArtist = document.getElementById("track-artist");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");
const progressBar = document.getElementById("progress-bar");
const playlist = document.getElementById("playlist");

// Generate Playlist dynamically
tracks.forEach((track, index) => {
  const li = document.createElement("li");
  li.textContent = `${track.name} - ${track.artist}`;
  li.addEventListener("click", () => playTrack(index)); // Click event to play the track
  playlist.appendChild(li);
});

// Load track details
function loadTrack(index) {
  const track = tracks[index];
  trackArt.src = track.art;
  trackName.textContent = track.name;
  trackArtist.textContent = track.artist;
  audio.src = track.src;
  audio.load(); // Reload the audio element with the new track
}

// Play the selected track
function playTrack(index) {
  currentTrackIndex = index;
  loadTrack(index);
  audio.play();
  isPlaying = true;
  updatePlayButton();
}

// Update the play/pause button
function updatePlayButton() {
  playBtn.innerHTML = isPlaying ? "&#10074;&#10074;" : "&#9654;"; // Pause || Play
}

// Play or Pause on button click
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
  updatePlayButton();
});

// Play the next track
nextBtn.addEventListener("click", () => {
  if (isShuffle) {
    playTrack(Math.floor(Math.random() * tracks.length)); // Play a random track
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
  }
});

// Play the previous track
prevBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playTrack(currentTrackIndex);
});

// Toggle shuffle mode
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.textContent = isShuffle ? "Shuffle ON" : "Shuffle OFF";
});

// Toggle repeat mode
repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.textContent = isRepeat ? "Repeat ON" : "Repeat OFF";
  audio.loop = isRepeat;
});

// Update the progress bar as the song plays
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Seek functionality
progressBar.addEventListener("input", (e) => {
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Auto play the next track when the current one ends
audio.addEventListener("ended", () => {
  if (!isRepeat) {
    nextBtn.click(); // Automatically go to the next song
  }
});

// Load the first track initially
loadTrack(currentTrackIndex);
