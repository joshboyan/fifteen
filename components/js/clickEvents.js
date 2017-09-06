/*
* All the click events to open and close UI overlays
*/

document.getElementById('instructionsTrigger').addEventListener('click', () => {
    document.getElementById('instructions').classList.remove('close-instructions');
});

document.getElementById('closeInstructions').addEventListener('click', () => {
    document.getElementById('instructions').classList.add('close-instructions');
});

document.getElementById('refresh').addEventListener('click', () => {
    refresh();
});

document.getElementById('timeScores').addEventListener('click', () => {
    buildScoreBoard('timer', 'timeEntries');
    document.getElementById('timeScoreBoard').classList.add('open');
});

document.getElementById('exitTimes').addEventListener('click', () => {
    document.getElementById('timeScoreBoard').classList.remove('open');
});

document.getElementById('exitTimesWin').addEventListener('click', () => {
    document.getElementById('timeScoreBoard').classList.remove('open');
    buildScoreBoard('moves', 'moveEntries');
    document.getElementById('movesScoreBoard').classList.add('open');
});

document.getElementById('moveScores').addEventListener('click', () => {
    buildScoreBoard('moves', 'moveEntries');
    document.getElementById('movesScoreBoard').classList.add('open');
});

document.getElementById('exitMoves').addEventListener('click', () => {
    document.getElementById('movesScoreBoard').classList.remove('open');
});

document.getElementById('exitMovesWin').addEventListener('click', () => {
    document.getElementById('movesScoreBoard').classList.remove('open');
    refresh();
});

document.getElementById('info').addEventListener('click', () => {
    document.getElementById('infoBoard').classList.add('open');
});

document.getElementById('exitInfo').addEventListener('click', () => {
    document.getElementById('infoBoard').classList.remove('open');
});

document.getElementById('exitYouWin').addEventListener('click', () => {
    document.getElementById('youWin').classList.remove('open');
    document.getElementById('yourName').classList.add('open');
});

document.getElementById('exitYourName').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('yourName').classList.remove('open');
    name = document.getElementsByTagName('input')[0].value;
    winSequence();
});
