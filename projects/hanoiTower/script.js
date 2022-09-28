const clickAudio = document.getElementById('clickAudio');
const wrongAudio = document.getElementById('wrongAudio');
const tadaAudio = document.getElementById('tadaAudio');

const scoreDiv = document.getElementById("score");
const overlayDiv = document.getElementById("overlay");

let numberOfDisks = 2;
let moves = 0;
let moveDisc = false;
let selectedDock = null;
let origDiv = null;
let fineshed = true;



function getFirstDisc(div) {
  return div.getElementsByTagName("div")[0];
}

function checkDiscSizes(divOne, divTwo) {
  return getFirstDisc(divOne).dataset.size > divTwo.dataset.size;
}

function checkIfDisc(div) {
  return div.getElementsByTagName("div").length === 0;
}

function toggleMoveType() {
  moveDisc = !moveDisc;
}

function selectDock(div) {
  selectedDock = getFirstDisc(div);
  // Escapes event if person clicks empty div.
  if (!selectedDock) return;
  clickAudio.play();
  origDiv = div;
  div.className += " selected";
  toggleMoveType();
}

function moveToDock(div) {
  if (checkIfDisc(div) || checkDiscSizes(div, selectedDock)) {
    clickAudio.play();
    moves++;
    div.insertBefore(selectedDock, div.firstChild);
    scoreDiv.innerHTML = moves;
    checkFineshed(div);
  }else{
    wrongAudio.play();
  }
  origDiv.classList.remove("selected");
  toggleMoveType();
}
function checkFineshed(div) {
  if (div.dataset.dock === "1") return;
  if (div.getElementsByTagName("div").length === numberOfDisks) {
    tadaAudio.play();
    toggleGameFinish();
  }
}

function handleClick(e) {
  if (fineshed) return;
  moveDisc ? moveToDock(this) : selectDock(this);
}


function setupDocks() {
  Array.from(document.getElementsByClassName("dock")).forEach((dock) => {
    dock.innerHTML = "";
    if (dock.dataset.dock === "1") {
      for (let i = 0; i < numberOfDisks; i++) {
        var disk = document.createElement("div");
        disk.setAttribute("class", "disk");
        disk.setAttribute("data-size", (i + 1).toString())
        dock.appendChild(disk);
      }
    }
    dock.addEventListener("click", handleClick);
  });
}

function toggleGameFinish() {
  if (fineshed) {
    fineshed = false;
    overlayDiv.style.display = "none"
  } else {
    fineshed = true;
    overlayDiv.style.display = "flex";
  }
}

function start() {
  numberOfDisks = Number.parseInt(document.getElementById("numberDisksInput").value);
  if (numberOfDisks > 6 || numberOfDisks < 2)
    return;
  moves = 0;
  scoreDiv.innerText = 0;
  setupDocks();
  toggleGameFinish();
}
