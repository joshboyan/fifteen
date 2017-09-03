/*
* This file deals with the game timer
*/

function removeTimer() {
    // Remove old timer and create a p element to hold the new one
    // created in gameTimer
    document.getElementById('timer').remove(timer);
    let newTimer = document.createElement('p');
    newTimer.id = 'timer';
    document.getElementById('gameStats').appendChild(newTimer);
}

// Instanciate timer
function gameTimer() {
    let timer = document.getElementById('timer');
    // set timer to 0
    seconds = 0;
    minutes = 0;
    // Get initial time value
    let start = new Date().getTime();
    window.setInterval(function() {
        //Find how much time has elasped between ow and starting time
        time = new Date().getTime() - start;
        // Set the timer interval to 1000ms === 1s
        seconds = Math.round((time / 1000) + 0.5);
        // Ensure seconds always appear in 2 digit format
        if (seconds > 9) {
            timer.innerHTML = `${minutes}:${seconds}`;
        } else {
            timer.innerHTML = `${minutes}:0${seconds}`;
        }
        // Increment the minutes and set seconds to 0 after 59
        if (seconds > 59) {
            minutes++;
            seconds = 0;
            // Restart timer
            start = new Date().getTime();
        }
        return time;
        // Set the timer interval to 1000ms === 1s
    }, 1000);
}