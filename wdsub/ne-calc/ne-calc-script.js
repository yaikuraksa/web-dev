
//To do: Replace p1NumStrats and p2NumStrats with query parameters

let queryParams = new URLSearchParams(window.location.search);

const P1NUMSTRATS = queryParams.get("p1NumStrats");
const P2NUMSTRATS = queryParams.get("p2NumStrats");
const PAYOFF_CONTENTS = "(<input type= 'number'>,<input type= 'number'>)";

buildMatrix();

function buildMatrix () {
  let matrix = document.getElementById("matrix");
  //Loop through (P1NUMSTRATS + 1) times. Each iteration, make a row div
  for (let i = 0; i < (P1NUMSTRATS + 1); i++) {
     //create new row div
    let newRow = document.createElement("div");
    newRow.classList.add("matrix-row");
    matrix.append(newRow);
    //loop through (P2NUMSTRATS + 1) times. Each iteration, make a cell 
    for (let j = 0; j < (P2NUMSTRATS + 1); j++) {
      //create new cell
    let newCell = document.createElement("div");
    if (i == 0 && j == 0) {
      newCell.classList.add("empty-cell");
    } else if (i == 0) {
      newCell.classList.add("strat-cell");
      newCell.innerHTML = ("t<sub>" + j + "</sub>");
    }
      else if (j == 0) {
      newCell.classList.add("strat-cell");
      newCell.innerHTML = ("s<sub>" + i + "</sub>");
    } else {
      newCell.classList.add("payoff-cell");
      newCell.innerHTML = PAYOFF_CONTENTS;
    }
    newRow.append(newCell);
    }
  }
}

function randomize() {
  let payoffArr = document.querySelectorAll(".payoff-cell input");
  const MIN = 0;
  const MAX = 20;
  
  for (const elem of payoffArr) {
    elem.value = Math.floor(Math.random() * (MAX - MIN) + MIN);
  }
}

function compute() {
  let p1PayArr = document.querySelectorAll(".payoff-cell input:first-child");
  let p2PayArr = document.querySelectorAll(".payoff-cell input:last-child");
  let payCellArr = document.querySelectorAll(".payoff-cell");
  
  for (const elem of payCellArr) {
    if (elem.classList.contains("eliminated") == true) elem.classList.remove("eliminated");
    if (elem.classList.contains("ne") == true) elem.classList.remove("ne");
  }
  
  
  //Loop through every column, finding p1 highest payoff
  
  for (let j = 0;j < P2NUMSTRATS;j++) {
    let largest = -Infinity;
    
    //Idenitify highest payoff in column
    for (let i = 0; i < P1NUMSTRATS; i++) {
      if (Number(p1PayArr[P2NUMSTRATS*i + j].value) > Number(largest)) largest = p1PayArr[P2NUMSTRATS*i + j].value;
    }
    
    //Eliminate any cells which aren't best responses
    
    for (let i = 0; i < P1NUMSTRATS; i++) {
      if (Number(p1PayArr[P2NUMSTRATS*i + j].value) != Number(largest)) payCellArr[P2NUMSTRATS*i + j].classList.add("eliminated");
    }
    
  }
  
  //Loop through every row, finding p2 highest payoff
  
  for (let i = 0;i < P1NUMSTRATS;i++) {
    let largest = -Infinity;
    
    //Idenitify highest payoff in rows
    for (let j = 0; j < P2NUMSTRATS; j++) {
      if (Number(p2PayArr[P2NUMSTRATS*i + j].value) > Number(largest)) largest = p2PayArr[P2NUMSTRATS*i + j].value;
    }
    
    //Eliminate any cells which aren't best responses
    
    for (let j = 0; j < P2NUMSTRATS; j++) {
      if (Number(p2PayArr[P2NUMSTRATS*i + j].value) != Number(largest)) payCellArr[P2NUMSTRATS*i + j].classList.add("eliminated");
    }
  }
  
  //Give ne class to any cells which are best responses for both players
  
  for (const elem of payCellArr) {
    if (elem.classList.contains("eliminated") == false) elem.classList.add("ne");
  }
  
}
