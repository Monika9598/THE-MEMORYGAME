const messageDisplay = document.querySelector('#message');
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
var bricks = document.querySelectorAll(".brick");
const header = document.querySelector('h1');

const model = {
    picArray: ["Albert.png", "Spiderman.jpg", "Bello.png", "BlixtenMcQueen.jpeg", "BrandmanSam.jpg", "RobotTrainsAlf.jpg", "Jet.png", "Jocke.jpg", "Kaja.png", "RobotTrainsKay.jpg", "Rekku.jpeg", "Riku.jpeg", "Rolle.png", "Samppa.jpg", "RobotTrainsViktor.png", "Toma.jpg", "Vainu.jpeg", "Zebra.png"],
    numBricks: 20,
    newPicArray: [],
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
    tries: 0,
    totalTries: 0,
    totalClickedImages: 0,

    setupBricks: (num) => {
        bricks.forEach(function (brick) {
            brick.classList.remove('clicked');
            brick.style.transition = "none"
            brick.style.background = "rgb(190, 190, 36)"
        })
        for (var i = 0; i < bricks.length; i++) {
            if (i < num) {
                bricks[i].style.display = view.gameSizes[num].display
                bricks[i].style.width = view.gameSizes[num].width
                bricks[i].style.paddingBottom = view.gameSizes[num].paddingBottom
                bricks[i].style.margin = view.gameSizes[num].margin
            } else {
                bricks[i].style.display = "none"
            }
        }
    },
    setupPics: (num) => {
        model.shuffle(model.picArray)
        let halfOfNewPicArray = model.picArray.slice(0, num)
        let newPicArray = halfOfNewPicArray.concat(halfOfNewPicArray)
        model.shuffle(newPicArray);
        console.log(newPicArray);

    },
    newGame: (num) => {
        view.initView();
        this.totalClickedImages = 0;
        this.tries = 0;
        model.setupBricks(num)
        model.setupPics()
    },


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
    initView: () => {
        header.textContent = "The Memory Game";
        document.body.style.backgroundColor = "#232323"
    }
}

const controller = {
    firstGuess: false,
    secondGuess: false,
    chosenGridSize: () => {
        var selectedButton;
        modeButtons.forEach(function (button) {
            if (button.classList.contains('selected')) {
                selectedButton = button;
            }
        }) 
        return Number(selectedButton);
    }

}

for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', () => {
        numBricks = Number(this.textContent);
        modeButtons.forEach(function (button) {
            button.classList.remove('selected');
        })
        this.classList.add('selected');
        setupBricks(numBricks);
        setupPics(numBricks);
    })
}


// let numBricks = 20;
// let newPicArray;
// let tries = 0;
// let totalTries = 0;
// let firstGuess;
// let secondGuess;
// let totalClickedImages = 0;

// const picArray = [
//     "url(pics/Albert.png)",
//     "url(pics/Albert.png)",
//     "url(pics/Spiderman.jpg)",
//     "url(pics/Spiderman.jpg)",
//     "url(pics/Bello.png)",
//     "url(pics/Bello.png)",
//     "url(pics/BlixtenMcQueen.jpeg)",
//     "url(pics/BlixtenMcQueen.jpeg)",
//     "url(pics/BrandmanSam.jpg)",
//     "url(pics/BrandmanSam.jpg)",
//     "url(pics/RobotTrainsAlf.jpg)",
//     "url(pics/RobotTrainsAlf.jpg)",
//     "url(pics/Jet.png)",
//     "url(pics/Jet.png)",
//     "url(pics/Jocke.jpg)",
//     "url(pics/Jocke.jpg)",
//     "url(pics/Kaja.png)",
//     "url(pics/Kaja.png)",
//     "url(pics/RobotTrainsKay.jpg)",
//     "url(pics/RobotTrainsKay.jpg)",
//     "url(pics/Rekku.jpeg)",
//     "url(pics/Rekku.jpeg)",
//     "url(pics/Riku.jpeg)",
//     "url(pics/Riku.jpeg)",
//     "url(pics/Rolle.png)",
//     "url(pics/Rolle.png)",
//     "url(pics/Samppa.jpg)",
//     "url(pics/Samppa.jpg)",
//     "url(pics/RobotTrainsViktor.png)",
//     "url(pics/RobotTrainsViktor.png)",
//     "url(pics/Toma.jpg)",
//     "url(pics/Toma.jpg)",
//     "url(pics/Vainu.jpeg)",
//     "url(pics/Vainu.jpeg)",
//     "url(pics/Zebra.png)",
//     "url(pics/Zebra.png)"
// ]

// const gameSizes = {
//     12: { display: "block", width: "22%", paddingBottom: "22%", margin: "1.5" },
//     16: { display: "block", width: "22%", paddingBottom: "22%", margin: "1.5" },
//     20: { display: "block", width: "17%", paddingBottom: "17%", margin: "1.5" },
//     24: { display: "block", width: "14%", paddingBottom: "14%", margin: "1.3" },
//     30: { display: "block", width: "14%", paddingBottom: "14%", margin: "1.3" },
//     36: { display: "block", width: "14%", paddingBottom: "14%", margin: "1.3" },

// }



//find out which mode button is selected when reset button is clicked and reset accordingly
// resetButton.addEventListener('click', resetFunc())

//change the background of the clicked div, using the divs id, to corresponding image from randomized array of pics
for (var i = 0; i < bricks.length; i++) {
    bricks[i].addEventListener('click', function () {
        //if brick is not yet clicked on and it's the first of the two tries, show picture from newPicArray
        if (!this.classList.contains('clicked') && tries <= 1) {
            this.style.transition = "background 0.6s"
            this.style.background = newPicArray[this.id];
            this.style.backgroundSize = "cover"
            this.classList.add('clicked');
            tries++;
            totalTries++
            //if it was the first try, define var firstGuess
            if (tries === 1) {
                firstGuess = this;
                //else it must be the secondGuess
            } else {
                secondGuess = this;
            }
            //if user clicked an image for the second time and the pictures are not the same, hide them
            if (tries === 2 && firstGuess.style.background !== secondGuess.style.background) {
                setTimeout(function () {
                    firstGuess.style.background = "rgb(190, 190, 36)"; firstGuess.classList.remove('clicked');
                    secondGuess.style.background = "rgb(190, 190, 36)"; secondGuess.classList.remove('clicked');
                    tries = 0;
                }, 1000)
                //else if the two pictures match, leave them open and declare tries 0 so user can click again
            } else if (tries === 2 && firstGuess.style.background === secondGuess.style.background) {
                tries = 0;
                totalClickedImages += 2
                for (var i = 0; i < bricks.length; i++) {
                    if (bricks[i].classList.contains('clicked')) {
                        // totalClickedImages++;
                    }

                } if (totalClickedImages === numBricks) {
                    header.textContent = `YESSS! You solved the game in ${totalTries / 2} tries!`
                    document.body.style.backgroundColor = "rgb(190, 190, 36)"
                    console.log(document.body.style.backgroundColor);
                }
            }
        }

    })
}


// function setupBricks(num) {
//     header.textContent = "The Memory Game";
//     document.body.style.backgroundColor = "#232323"
//     totalClickedImages = 0;
//     tries = 0;
//     bricks.forEach(function (brick) {
//         brick.classList.remove('clicked');
//         brick.style.transition = "none"
//         brick.style.background = "rgb(190, 190, 36)"
//     })
//     for (var i = 0; i < bricks.length; i++) {
//         if (i < num) {
//             bricks[i].style.display = gameSizes[num].display
//             bricks[i].style.width = gameSizes[num].width
//             bricks[i].style.paddingBottom = gameSizes[num].paddingBottom
//             bricks[i].style.margin = gameSizes[num].margin
//         } else {
//             bricks[i].style.display = "none"
//         }
//     }

    // if (num === 12 || num === 16) {
    //     for (var i = 0; i < bricks.length; i++) {
    //         if (i < num) {
    //             bricks[i].style.display = "block";
    //             bricks[i].style.width = "22%";
    //             bricks[i].style.paddingBottom = "22%"
    //             bricks[i].style.margin = "1.5%"
    //         } else {
    //             bricks[i].style.display = "none";
    //         }
    //     }
    // } else if (num === 20) {
    //     for (var i = 0; i < bricks.length; i++) {
    //         if (i < num) {
    //             bricks[i].style.display = "block";
    //             bricks[i].style.width = "17%";
    //             bricks[i].style.paddingBottom = "17%"
    //             bricks[i].style.margin = "1.5%"
    //         } else {
    //             bricks[i].style.display = "none";
    //         }
    //     }
    // } else {
    //     for (var i = 0; i < bricks.length; i++) {
    //         if (i < num) {
    //             bricks[i].style.display = "block";
    //             bricks[i].style.width = "14%";
    //             bricks[i].style.paddingBottom = "14%"
    //             bricks[i].style.margin = "1.3%"
    //         } else {
    //             bricks[i].style.display = "none";
    //         }
    //     }
    // }
// }

// function setupPics(num) {
//     newPicArray = picArray.slice(0, num);
//     shuffle(newPicArray);
// }

// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }

// function resetFunc() {
//     var selectedButton;
//     modeButtons.forEach(function (button) {
//         if (button.classList.contains('selected')) {
//             selectedButton = button;
//         }
//     })
//     setupBricks(Number(selectedButton.textContent));
//     setupPics(Number(selectedButton.textContent));
// }