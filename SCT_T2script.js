let display = document.getElementById("display");
let startPauseBtn = document.getElementById("startPause");
let lapBtn = document.getElementById("lap");
let resetBtn = document.getElementById("reset");
let lapsList = document.getElementById("laps");
let themeToggle = document.getElementById("themeToggle");

let startTime, updatedTime, difference = 0;
let timerInterval;
let running = false;
let laps = [];

function formatTime(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0")
  );
}

function startPause() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime() - startTime;
      display.textContent = formatTime(updatedTime);
    }, 100);
    startPauseBtn.textContent = "⏸ Pause";
    startPauseBtn.classList.remove("start");
    startPauseBtn.classList.add("pause");
    running = true;
  } else {
    clearInterval(timerInterval);
    difference = updatedTime;
    startPauseBtn.textContent = "▶ Start";
    startPauseBtn.classList.remove("pause");
    startPauseBtn.classList.add("start");
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  display.textContent = "00:00:00";
  startPauseBtn.textContent = "▶ Start";
  startPauseBtn.classList.remove("pause");
  startPauseBtn.classList.add("start");
  laps = [];
  lapsList.innerHTML = "";
}

function addLap() {
  if (!running) return;
  let lapTime = formatTime(updatedTime);
  laps.push(lapTime);
  let li = document.createElement("li");
  li.innerHTML = `<span>Lap ${laps.length}</span><span>${lapTime}</span>`;
  lapsList.appendChild(li);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀ Light Mode" : "🌙 Dark Mode";
}

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);
themeToggle.addEventListener("click", toggleTheme);
