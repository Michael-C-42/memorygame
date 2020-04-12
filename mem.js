let card = document.querySelectorAll('.memory-card');
let cards = [...card];
let match = 0;
let hasFlippedCard = false;
let firstCard, secondCard
let lockBoard = false;
let counter = document.querySelector('#moves');
let moves = 0;
let bestScore = document.querySelector('#best-score');


document.body.onload = startGame();

cards.forEach(card => card.addEventListener('onmousedown',flipCard));



function flipCard(){
    if (lockBoard) return;
    if(this === firstCard) return;
    countMoves();
    this.classList.toggle('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return
    }
    
    secondCard = this;
    checkMatch();
} 

function countMoves(){
    moves += 1;
    counter.innerHTML = moves;
}






function checkMatch(){
    if(firstCard.dataset.framework === secondCard.dataset.framework){
            match += 1
            if (match == 10){
                if (bestScore.innerHTML == 0){
                    bestScore.innerHTML = moves;
                    alert("You Win! You're score was "+bestScore.innerHTML+" Press Start Game to play again!" )
                } if(counter.innerHTML < bestScore.innerHTML){
                    bestScore.innerHTML = counter.innerHTML;
                    alert("Congratulations! You're new best score was "+bestScore.innerHTML+" Press Start Game to play again :)")
                }
                
            }
            disableCards();
        } else {
            unflipCards();
    }
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()* cards.length);
        card.style.order = randomPos;
        for (var i=0;i<cards.length;i++){
            cards[i].classList.remove('flip');
        }
    });
};

let startBtn = document.querySelector('#startBtn');
startBtn.addEventListener('click', startGame)

function startGame(){
    resetGame();
    setTimeout(shuffle,500);
    cards.forEach(card => card.addEventListener('click',flipCard));
}

function resetGame(){
    cards.forEach(card => card.classList.remove('flip'))
    match = 0;
    moves = 0;
    counter.innerHTML = 0;
}






//shuffle 
// function shuffle(array){
//     let currentIndex = array.length, tempVal, randomIndex;
//     while (currentIndex !== 0){
//         randomIndex = Math.floor(Math.random()* currentIndex);
//         currentIndex -= 1;
//         tempVal = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = tempVal;
//     }
//     return array
// }

// document.body.onload = startGame();

// function startGame(){
//     cards = shuffle(cards);
// }