const board = document.querySelector('.game-board');
const [...cells] = document.querySelectorAll('.cell');
const crossSound = document.querySelector('.cross-audio');
const noughtSound = document.querySelector('.nought-audio');

const winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

const resultWindow = document.querySelector('.result-message');
const resultMessage = document.querySelector('.message');
const moves = document.querySelector('.moves-number');
const restartBtn = document.querySelector('.restart-btn');

const score = document.querySelector('.score');

const muteSoundBtn = document.querySelector('.mute-sound-btn');
const muteSoundImg = muteSoundBtn.querySelector('.mute-sound-img');

const scoreWindow = document.querySelector('.score-window');
const modalShowBtn = document.querySelector('.score-show-btn');
const modalCloseBtn = document.querySelector('.close-modal-btn');

let tern = 'cross';
let numberOfMoves = 0;

cells.forEach(cell => {
    cell.addEventListener('click', placeMark, { once: true});
});

muteSoundBtn.addEventListener('click', () => {
    if (muteSoundImg.classList.contains('volume-on')) {
        muteSoundImg.src = './assets/volume-mute.svg';
        muteSoundImg.classList.remove('volume-on');
    } else {
        muteSoundImg.src = './assets/sound-on.svg';
        muteSoundImg.classList.add('volume-on');
    }
});

function placeMark(evt) {
    numberOfMoves++;
    if (muteSoundImg.classList.contains('volume-on')) {
        tern == 'cross' ? crossSound.play() : noughtSound.play();
    }
    evt.target.classList.add(tern);
    board.classList.remove(tern);
    if (checkWin() || checkDraw()) {
        showResult();
    }
    tern = tern == 'cross' ? 'nought' : 'cross';
    board.classList.add(tern);
}

function checkWin() {
    return winCombinations.find(combination => {
        return combination.every(item => {
            return cells[item-1].classList.contains(tern);
        });
    });
}

function checkDraw() {
    return cells.every(cell => {
        return cell.classList.contains('cross') || cell.classList.contains('nought');
    });
}
let rows;
function addResult() {
    if(checkWin()) {
        if (tern == 'cross') {
            score.insertAdjacentHTML("beforeend", `<tr class="result-row">
            <td class="cross-column-title">1</td>
            <td class="nought-column-title">0</td>
            </tr>`);
        } else {
            score.insertAdjacentHTML("beforeend", `<tr class="result-row">
            <td class="cross-column-title">0</td>
            <td class="nought-column-title">1</td>
            </tr>`);
        }
    }

    if (checkDraw()) {
        score.insertAdjacentHTML("beforeend", `<tr class="result-row">
        <td class="cross-column-title">1</td>
        <td class="nought-column-title">1</td>
        </tr>`);
    }

    rows = document.querySelectorAll('.result-row');
    if (rows.length > 10) {
        score.querySelector('tr').remove();
    }
}

function showResult() {
    board.style.display = 'none';
    resultWindow.style.display = 'flex';
    if(checkDraw()) {
        resultWindow.style.color = `var(--board-color)`;
        resultMessage.innerHTML = 'Draw!';
        if (muteSoundImg.classList.contains('volume-on')) { 
            document.querySelector('.draw-audio').play();
        }
    }
    if(checkWin()) {
        resultWindow.style.color = `var(--${tern}-color)`;
        resultMessage.innerHTML = `${tern}'s win!`;
        if (muteSoundImg.classList.contains('volume-on')) { 
            document.querySelector('.win-audio').play();
        }
    }
    addResult();
    moves.innerHTML = numberOfMoves;
    tern = 'cross';
}

function refreshScore() {
    score.append(tr);
}

restartBtn.addEventListener('click', restartGame);

function restartGame() {
    board.style.display = 'grid';
    resultWindow.style.display = 'none';
    board.classList.remove(tern);
    tern = tern == 'cross' ? 'nought' : 'cross';
    board.classList.add(tern);

    cells.forEach(cell => {
        cell.classList.remove('cross');
        cell.classList.remove('nought');
    });

    cells.forEach(cell => {
        cell.addEventListener('click', placeMark, { once: true});
    });

    numberOfMoves = 0;
}

modalShowBtn.addEventListener('click', () => {
    scoreWindow.style.display = 'flex';
});

modalCloseBtn.addEventListener('click', () => {
    scoreWindow.style.display = 'none';
});