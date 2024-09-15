let startTime;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = document.querySelector('.time-display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

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

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateDisplay();
    startStopButton.textContent = 'Start';
}

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    const totalMilliseconds = elapsedTime + currentTime;
    
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor(totalMilliseconds % 1000);

    timeDisplay.textContent = 
        formatTime(hours) + ':' + 
        formatTime(minutes) + ':' + 
        formatTime(seconds) + '.' + 
        formatMilliseconds(milliseconds);

    requestAnimationFrame(updateDisplay);
}

function formatTime(time) {
    return time.toString().padStart(2, '0');
}

function formatMilliseconds(ms) {
    return ms.toString().padStart(3, '0');
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);