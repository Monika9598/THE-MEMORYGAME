const resetButton = document.querySelector("#reset")
const modeButtons = document.querySelectorAll(".mode");
const bricks = document.querySelectorAll(".brick");
let newPicArray;
let firstGuess;
let secondGuess;
let selectedGridSize = 12;
const header = document.querySelector('h1');

const model = {
    initGame: () => {
        header.textContent = "THE MEMORY GAME"
        controller.tries = 1;
        model.totalTries = 0;
        model.correctGuesses = 0;
        modeButtons.forEach((button) => {
            if (button.classList.contains('selected')) {
                selectedGridSize = Number(button.textContent);
            }
        })
        console.log(selectedGridSize);
        for (var i = 0; i < bricks.length; i++) {
            if (i < selectedGridSize) {
                bricks[i].className = '';
                bricks[i].classList.add('brick')
                bricks[i].style.display = view.gameSizes[selectedGridSize].display;
                bricks[i].style.width = view.gameSizes[selectedGridSize].width;
                bricks[i].style.paddingBottom = view.gameSizes[selectedGridSize].paddingBottom;
                bricks[i].style.margin = view.gameSizes[selectedGridSize].margin;
            } else {
                bricks[i].style.display = "none";
            }
        }
        model.setupPics(selectedGridSize);
        model.processModeChange();
        // controller.processUserGuess();
    },
    picArray: ["Albert", "Spiderman", "Bello", "BlixtenMcQueen", "BrandmanSam", "RobotTrainsAlf", "Jet", "Jocke", "Kaja", "RobotTrainsKay", "Rekku", "Riku", "Rolle", "Samppa", "RobotTrainsViktor", "Toma", "Vainu", "Zebra"],
    shuffle: (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },
    setupPics: (num) => {
        model.shuffle(model.picArray)
        let halfOfNewPicArray = model.picArray.slice(0, num / 2)
        newPicArray = halfOfNewPicArray.concat(halfOfNewPicArray)
        model.shuffle(newPicArray);
        console.log(newPicArray);
        return newPicArray;
    },
    processModeChange: () => {
        for (var i = 0; i < modeButtons.length; i++) {
            modeButtons[i].addEventListener('click', function () {
                for (var j = 0; j < modeButtons.length; j++) {
                    modeButtons[j].classList.remove('selected');
                }
                this.classList.add("selected");
                currentMode = this.textContent;
                console.log(currentMode);
                model.initGame();
            })
        }
    },
    totalTries: 0,
    correctGuesses: 0,
    checkMatch: ()=> {
        if(firstGuess.name != secondGuess.name){
            setTimeout(()=>{
                bricks[firstGuess.indexOfPic].classList.remove(firstGuess.name, "clicked");
                bricks[secondGuess.indexOfPic].classList.remove(secondGuess.name, "clicked");
                controller.tries = 1;
                model.totalTries ++;
            }, 1500)
        } else {
            controller.tries = 1;
            model.totalTries ++;
            model.correctGuesses += 2;
            if(model.correctGuesses === selectedGridSize){
                header.textContent = `Awesome! You solved the game in ${model.totalTries} tries!`
            }
            
        }
    }
}

const view = {
    gameSizes: {
        12: { display: "block", width: "22%", paddingBottom: "22%", margin: "1.5%" },
        16: { display: "block", width: "22%", paddingBottom: "22%", margin: "1.5%" },
        20: { display: "block", width: "17%", paddingBottom: "17%", margin: "1.5%" },
        24: { display: "block", width: "14%", paddingBottom: "14%", margin: "1.3%" },
        30: { display: "block", width: "14%", paddingBottom: "14%", margin: "1.3%" },
        36: { display: "block", width: "14%", paddingBottom: "14%", margin: "1.3%" },

    },
}

const controller = {
    tries: 1,
    processUserGuess: ()=>{
            bricks.forEach(function(brick){
                brick.addEventListener('click', function(){
                    if(controller.tries === 1 && !brick.classList.contains("clicked")){
                        brick.classList.add(newPicArray[brick.id], "clicked")
                        console.log(brick.classList)
                        firstGuess = {name: newPicArray[brick.id], indexOfPic: brick.id }
                        controller.tries++;
                    } else if(controller.tries === 2 && !brick.classList.contains("clicked")) {
                        brick.classList.add(newPicArray[brick.id], "clicked")
                        console.log(brick.classList)
                        secondGuess = {name: newPicArray[brick.id], indexOfPic: brick.id }
                        controller.tries++;
                        model.checkMatch();
                    }
                })
            })
    }
}

// reset game 
resetButton.addEventListener('click', function () {
    model.initGame();
})


window.onload = function(){
    model.initGame();
    controller.processUserGuess();
}