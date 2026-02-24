let score = 0;
document.getElementById('score').innerHTML = score;

let colors = ["green", "red", "yellow", "blue"];
let generatedColors = [];
let randoms = [];

let lost_status = false;
let start_status = false;
let idx = 0;
let turn = 0;

let active = false;

function generateRandom() {
    return Math.floor(Math.random() * colors.length);
}

function start() {
    if (start_status === true || lost_status === true) {
        var dialog = confirm("Play again?");
        lost();
    }

    if (dialog) {
        start();
        return;
    }

    start_status = true;

    randoms.push(generateRandom());
    generatedColors.push(colors[randoms[idx]]);

    activateColor(idx);
}

function verify(button) {
    reproduceSound(button.id);
    if (start_status === false) {
        alert("Start the game");
        return;
    }

    if (active === true) {
        alert("Please wait until the lights are not active");
        return;
    }

    if (button.id === generatedColors[idx]) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        idx++;
    } else {
        alert("You lost :(\nYou survived for " + turn + " turns\nYour final score was: " + score);
        lost();
        return;
    }

    if (idx >= generatedColors.length) {
        generateNew();
    }
}

function activateColor(step) {
    document.getElementById(colors[randoms[step]]).classList.add('active');
    reproduceSound(colors[randoms[step]]);
    active = true;

    setTimeout(() => {
        document.getElementById(colors[randoms[step]]).classList.remove('active');
        active = false;
    }, 1000); 
}

function reproduceSound(sound) {
    const playSound = new Audio('sounds/' + sound + '.wav');
    playSound.play();
}

async function generateNew() {
    idx = 0;
    turn++;

    randoms.push(generateRandom());
    generatedColors.push(colors[randoms[turn]]);

    await new Promise(r => setTimeout(r, 1000));

    for (let i = 0; i < generatedColors.length; i++) {
        activateColor(i);
        await new Promise(r => setTimeout(r, 1500));
    }
}

function lost() {
    generatedColors = [];
    randoms = [];
    idx = 0;
    turn = 0;

    score = 0;
    document.getElementById('score').innerHTML = score;

    if (start_status === true) {
        start_status = false;
        return;
    }

    lost_status = true;
}