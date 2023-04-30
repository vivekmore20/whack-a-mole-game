let scoreH2 = document.getElementById('score');
let timeLeftH2 = document.getElementById('timeLeft')
let startNewGameButton = document.getElementById('startNewGame')
let pauseGameButton=document.getElementById('pauseGame')

let squares=document.querySelectorAll('.square');
let score=0;
let timeLeft=0;
let hitPosition=null;
let timerId=null;
let randomMoleId=null;
let gameMusic = new Audio('../image/New Sms.mp3')
let hitMusic = new Audio('../image/Horror Msg.mp3')
//randomly placed mole

gameMusic.play();

function randomMole(){
    squares.forEach(square=>{
        square.classList.remove('mole');

    })
    let randomSquare= squares[Math.ceil(Math.random()*squares.length)];
    randomSquare.classList.add('mole');
    hitPosition=randomSquare.id;

   
}
randomMole();
squares.forEach(square=>{
    square.addEventListener('mousedown',()=>{
        console.log(square.id,hitPosition);

        if(square.id===hitPosition)
        {
            score++;
            hitMusic.play();
            setTimeout(()=>{
                hitMusic.pause()
            },1000);
            //hitMusic.play();
            // settimeout(()=>{
            //     hitMusic.pause();
            // })
            scoreH2.innerText=`Your Score ${score}`;
            hitPosition=null;

        }
    })
})

function countDown(){

    timeLeft--;
    timeLeftH2.innerHTML=`Time Left ${timeLeft}`
    if(timeLeft===0){
        clearInterval(timerId)
        clearInterval(randomMoleId);
    }
}


function startGame(){
    score=0;
    timeLeft=60;
    scoreH2.innerHTML='Your Score : 0';
    timeLeft.innerHTML='Time Left:60';
    pauseGameButton.innerHTML='Pause';
    gameMusic.play();

    timerId=setInterval(randomMole,1000);
    randomMoleId=setInterval(countDown,1000)
}
function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause()
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId=null;
        randomMoleId=null;
        pauseGameButton.innerText='Resume';
    }else{
        gameMusic.play()
        timerId=setInterval(randomMole,1000);
        randomMoleId=setInterval(countDown,1000);
        pauseGameButton.innerHTML='Pause';
    }
}
startNewGameButton.addEventListener('click',startGame())

pauseGameButton.addEventListener('click',pauseResumeGame)