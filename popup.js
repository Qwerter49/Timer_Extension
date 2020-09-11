document.addEventListener("DOMContentLoaded", function(){
    chrome.runtime.sendMessage({text: "Need the time"}, getTime);
});

let displayTimer;
const startbtn = document.querySelector("#start");
const timerField = document.querySelector("#timer");
const pausebtn = document.querySelector("#pause");
const restartbtn = document.querySelector("#restart");
const upBtn = document.querySelector("#up");
const downBtn = document.querySelector("#down");
let isBackgroundRunning = false;

if(isBackgroundRunning == false){
    upBtn.onclick = increaseTime;
    downBtn.onclick = decreaseTime;
}
restartbtn.onclick = resetTimer;
startbtn.onclick = startCountDown;
pausebtn.onclick = pauseCountDown;


async function checkIfRunning(response){
    await chrome.runtime.sendMessage({text: "are you running?"}, await setBackgroundRunning)
    console.log(isBackgroundRunning)
    if(isBackgroundRunning){
        chrome.runtime.sendMessage({text: "hello background"}, response => console.log(response))
        minutes =  Number(response.split(":")[0]) * 60;
        seconds = Number(response.split(":")[1]) + minutes;
        countingDown(seconds);
    }
}

async function setBackgroundRunning(response){
    isBackgroundRunning = await response
    console.log(response)
}

function getTime(response){
    checkIfRunning(response);
    timerField.textContent = response;
}

function increaseTime(){
    chrome.runtime.sendMessage({text: "increase the timer"}, getTime);
}

function decreaseTime(){
    chrome.runtime.sendMessage({text: "decrease the timer"}, getTime);
}

function resetTimer(){
    chrome.runtime.sendMessage({text: "restart the timer"}, resettingTimer);
}

function startCountDown(){
    isBackgroundRunning = true
    chrome.runtime.sendMessage({text: "start the timer"}, countingDown);
}

function pauseCountDown(){
    chrome.runtime.sendMessage({text: "pause the timer"}, pauseCount);
}

function pauseCount(response){
    clearInterval(displayTimer);
}

function resettingTimer(response){
    clearInterval(displayTimer);
    getTime(response);
}

function countingDown(response) {
    let secondsRemaining = response;
    displayTimer = setInterval(tick, 1000);
        function tick() {
            let min = Math.floor(secondsRemaining / 60); 
            let sec = secondsRemaining - (min * 60);
            if (sec < 10) {
                sec = "0" + sec;
            }
            let timer = min.toString() + ":" + sec;
            timerField.textContent = timer;
            console.log(isBackgroundRunning)
            if (secondsRemaining === 0){
                clearInterval(displayTimer);
                resetTimer();
            }
            secondsRemaining--;
        }
}


