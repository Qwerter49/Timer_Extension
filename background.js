let currentTimer = "2:00"
let minutesRemaining = currentTimer.split(":")[0]
let secondsRemaining = minutesRemaining * 60;
let displayTimer;
function countDown() {
    displayTimer = setInterval(tick, 1000);
    function tick() {
        let min = Math.floor(secondsRemaining / 60); 
        let sec = secondsRemaining - (min * 60);
        if (sec < 10) {
            sec = "0" + sec;
        }
        let timer = min.toString() + ":" + sec;
        currentTimer = timer;
        console.log(currentTimer)
        if (secondsRemaining === 0){
            clearInterval(displayTimer);
        }
        secondsRemaining--;
    }
}

chrome.runtime.onMessage.addListener(sendTimerInfo)

function sendTimerInfo(request, sender, sendResponse){
    if (request.text === "Need the time"){
        sendResponse(currentTimer)
    }
    if (request.text === "start the timer"){
        countDown();
        sendResponse(secondsRemaining)
    }
    if (request.text === "pause the timer"){
        clearInterval(displayTimer);
        sendResponse("Timer has paused")
    }
}