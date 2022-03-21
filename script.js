const frame = document.querySelector('.container')
const allTowers = document.querySelectorAll('.towers')
const towerOne = document.getElementById('towerOne')
const towerTwo = document.getElementById('towerTwo')
const towerThree = document.getElementById('towerThree')
const modeBtns = document.querySelectorAll('.mode')
const counter = document.querySelectorAll('.counter')
const modal = document.querySelector('.modal')
const winModal = document.querySelector('.winModal')
const playBtn = document.querySelector('.playBtn')
const bestMove = document.querySelector('.bestMove')
const bestTime = document.querySelector('.bestTime')
let timerCount = document.querySelectorAll('.timerCount')
let moveCount = 0//count number of moves
let num;//the number of discs
let seconds = 0
let startTimer
bestTime.innerHTML = window.sessionStorage.getItem('bestTime', seconds)
bestMove.innerHTML = window.sessionStorage.getItem('bestMove', moveCount)
selectMode()
function selectMode(){//MODAL MENU
  modeBtns.forEach(mode => mode.addEventListener('click',modeSel))
  function modeSel(e){
    startTimer = setInterval(()=>{
      seconds++
      timerCount[0].innerHTML = seconds
      timerCount[1].innerHTML = seconds
    }, 1000)
    if(e.target.id === 'easy'){
      num = 3
      modal.style.display = 'none'
      gameSetup()
    }else if(e.target.id === 'normal'){
      num = 5
      modal.style.display = 'none'
      gameSetup()
    }else if(e.target.id === 'insane'){
      num = 7
      modal.style.display = 'none'
      gameSetup()
    }
  }
}

function gameSetup(){//GAME SET UP
  for(let i = 1; i <= num ; i++){//DISC CREATION DEPENDENT ON NUM
    let discs = `
    <div class='disc' id='disc${i}'>
    </div>`;
    towerOne.insertAdjacentHTML('beforeend',discs)
    let qsDisc = document.querySelector(`#disc${i}`)
    for(let j = 1; j <= i; j++){
      let discSize =`
    <div class='discSize' id='discSize${i}'>
    `;
      qsDisc.insertAdjacentHTML('beforeend',discSize)
    }
  }//TOWER EVENT LISTENERS
  towerOne.addEventListener('click',() => chkCond(towerOne))
  towerTwo.addEventListener('click',() => chkCond(towerTwo))
  towerThree.addEventListener('click',() => chkCond(towerThree))
}
let placeHolder;//PLACEHOLDER => 3 DIFFERENT CLICK EVENTS ABOVE
function chkCond(param){
  let child = param.children
  if(placeHolder && child.length === 0){
    param.insertBefore(placeHolder, child[0])
    placeHolder = undefined;
    moveCount ++
  }else if (placeHolder && child[0].childElementCount < placeHolder.childElementCount){
    window.alert('invalid move!')
  }else if (placeHolder && child[0].childElementCount > placeHolder.childElementCount){
    param.insertBefore(placeHolder, child[0])
    placeHolder = undefined;
    moveCount ++
  }else if (!placeHolder){
    placeHolder = child[0]
    child[0].remove()
  }
  counter[0].innerHTML = moveCount
  if(towerThree.children.length === num){
    clearInterval(startTimer)
    //if (moveCount < bestMove.innerHTML && seconds < bestTime.innerHTML || bestMove.innerHTML === 0){
      window.sessionStorage.setItem('bestTime', seconds)
      window.sessionStorage.setItem('bestMove', moveCount)
    //}
    console.log(bestTime.innerHTML)
    let timer = setTimeout(()=>{
      counter[1].innerHTML = moveCount
      winModal.style.display = 'inline'
      playBtn.addEventListener('click',()=>location.reload())
    } ,500)
  }
}
