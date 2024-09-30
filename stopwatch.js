let startTime;
let elapsedTime = 0;
let timerInterval;
let lapTimes = [];

const timeDisplay = document.querySelector('.time-display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapList = document.getElementById('lapList');

function startStop() {
    if (timerInterval) {
        // Stop the timer
        clearInterval(timerInterval);
        timerInterval = null;
        startStopButton.textContent = 'Start';
        elapsedTime += Date.now() - startTime;
    } else {
        // Start the timer
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10); // Update every 10ms
        startStopButton.textContent = 'Stop';
    }
}

function lap() {
    if (timerInterval) {
        const lapTime = formatTime(elapsedTime + Date.now() - startTime);
        lapTimes.push(lapTime);
        updateLapList();
    }
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    lapTimes = [];
    updateDisplay();
    updateLapList();
    startStopButton.textContent = 'Start';
}

function updateDisplay() {
    const currentTime = timerInterval ? Date.now() - startTime : 0;
    const totalMilliseconds = elapsedTime + currentTime;
    
    const formattedTime = formatTime(totalMilliseconds);
    timeDisplay.textContent = formattedTime;
}

function formatTime(totalMilliseconds) {
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor(totalMilliseconds % 1000);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMs(milliseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function padMs(num) {
    return num.toString().padStart(3, '0');
}

function updateLapList() {
    lapList.innerHTML = '';
    lapTimes.forEach((time, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${time}`;
        lapList.appendChild(li);
    });
}

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);

// Initial display update
updateDisplay();
