const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),

    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        results: 0,
        currentTime: 60,

    },
    actions: {
        TimerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.TimerId);
        alert("Game Over! O seu resultado foi:  " + state.values.results)
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}

function addListenerHitbox(){
    state.view.squares.forEach((square) =>{ 
        square.addEventListener("mousedown",()=>{
            if(square.id === state.values.hitPosition){
                state.values.results++
                state.view.score.textContent = state.values.results;
                state.values.hitPosition = null;
                playSound();   
            }
        })
    });
}

function init(){
    addListenerHitbox();
}

init();