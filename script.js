console.log('Welcome to Tic Tac Toe');
const resetBtn = document.getElementById('reset');
const gameMusicBtn = document.getElementById('game-music');
const music = new Audio('./Assets/music.mp3');
const audioTurn = new Audio('./Assets/ting.mp3');
const gameover = new Audio('./Assets/gameover.mp3');
music.volume = 0.3;
audioTurn.volume = 0.3;
gameover.volume = 0.3;

const isSmallScreen = (window.screen.width <= 800) ? true : false;
let turn = 'X';
let isgameover = false;
let isGameMusicPlay = false;

// Function to change turn
const changeTurn = () => {
    return turn === 'X' ? '0' : 'X';
}

// Function to check for a win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    let lineWidth = "20vw";
    if (isSmallScreen) {
        lineWidth = "40vw";
        wins.forEach(e => { e[3] *= 2; e[4] *= 2; });
        // console.log(wins)
    }
    wins.forEach(e => {
        if (
            boxtexts[e[0]].innerText !== '' &&
            boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[1]].innerText === boxtexts[e[2]].innerText
        ) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "176px";
            gameover.play();
            document.querySelector('.line').style.width = lineWidth;
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;

        }
    });
}

// music.play();
// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
        checkWin();
    })
})

gameMusicBtn.addEventListener('click', () => {
    if (isGameMusicPlay) {
        gameMusicBtn.classList.remove("fa-volume-high");
        gameMusicBtn.classList.add("fa-volume-xmark");
        music.pause()
        isGameMusicPlay = false;
    }
    else {
        gameMusicBtn.classList.remove("fa-volume-xmark");
        gameMusicBtn.classList.add("fa-volume-high");
        music.play();
        isGameMusicPlay = true;
    }
});

// Add onClick listener to reset buttno
resetBtn.addEventListener('click', () => {
    const boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach(element => {
        element.innerText = '';
    });
    turn = "X";
    isgameover = false;
    document.querySelector('.line').style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "0";
});
