let timerField = document.querySelector("#timer");
const startbtn = document.querySelector("#start");
const pausebtn = document.querySelector("#pause");
//let minutesRemaining = timerField.textContent.split(":")[0];
let secondsRemaining = 2 * 60;
let displayTimer;
startbtn.addEventListener('click', countDown());
pausebtn.addEventListener('click', function() {
    clearInterval(displayTimer)
})

function countDown() {
    displayTimer = setInterval(tick, 1000);
        function tick() {
            let min = Math.floor(secondsRemaining / 60); 
            let sec = secondsRemaining - (min * 60);
            if (sec < 10) {
                sec = "0" + sec;
            }
            let timer = min.toString() + ":" + sec;
            timerField.textContent = timer;
            if (secondsRemaining === 0){
                alert("Timer is up!");
                clearInterval(displayTimer);
            }
            secondsRemaining--;
        }
}
