/*
* All the click events to open and close UI overlays
*/

document.getElementById('instructionsTrigger').addEventListener('click', function() {
    document.getElementById('instructions').classList.remove('close-instructions');
});

document.getElementById('closeInstructions').addEventListener('click', function() {
    document.getElementById('instructions').classList.add('close-instructions');
});

document.getElementById('refresh').addEventListener('click', function() {
    refresh();
});

document.getElementById('timeScores').addEventListener('click', function() {
    openTimeScoreBoard();

});

document.getElementById('exitTimes').addEventListener('click', function() {
    document.getElementById('timeScoreBoard').classList.remove('open');
});

document.getElementById('exitTimesWin').addEventListener('click', function() {
    document.getElementById('timeScoreBoard').classList.remove('open');
    openMovesScoreBoard();
});

document.getElementById('moveScores').addEventListener('click', function() {
    openMovesScoreBoard();

});

document.getElementById('exitMoves').addEventListener('click', function() {
    document.getElementById('movesScoreBoard').classList.remove('open');
});

document.getElementById('exitMovesWin').addEventListener('click', function() {
    document.getElementById('movesScoreBoard').classList.remove('open');
    refresh();
});

document.getElementById('info').addEventListener('click', function() {
    document.getElementById('infoBoard').classList.add('open');
});

document.getElementById('exitInfo').addEventListener('click', function() {
    document.getElementById('infoBoard').classList.remove('open');
});

document.getElementById('exitYouWin').addEventListener('click', function() {
    document.getElementById('youWin').classList.remove('open');
    document.getElementById('yourName').classList.add('open');
});

document.getElementById('exitYourName').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('yourName').classList.remove('open');
    name = document.getElementsByTagName('input')[0].value;
    winSequence();
});
