const questions = [
    {
        question: "Which of the statements is used to import all names from a module into the current calling module",
        optionA: "import",
        optionB: "from",
        optionC: "dir()",
        optionD: "import*",
        correctOption: "optionD"
    },

    {
        question: "Name the keyword used to define a function.",
        optionA: "define",
        optionB: "def",
        optionC: "function",
        optionD: "fu",
        correctOption: "optionB"
    },

    {
        question: "A collection of modules and packages that can be imported into a program is called a __________.",
        optionA: "class",
        optionB: "documentation",
        optionC: "library",
        optionD: "function",
        correctOption: "optionC"
    },

    {
        title: "In python which is the correct method to load a module math?",
        optionA: "include math",
        optionB: "import math",
        optionC: "#include<math.h>",
        optionD: "using math",
        correctOption: "optionB"
    },

    {
        question: "Which of the following is true regarding a package",

        optionA: "it is a python file",
        optionB: "it is an executable file",
        optionC: "it is a directory",
        optionD: "ALL",
        correctOption: "optionC"
    },

]



let shuffledQuestions = [] //empty array to hold shuffled selected questions
function instruction() {
    document.getElementById('option-modal1').style.display = "flex"

}
function closeOptionModal1() {
    document.getElementById('option-modal1').style.display = "none"
   
}
function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 4) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
       alert('Please pick an option')
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
          // document.getElementById(correctOption).style.backgroundColor = "green"
            // document.getElementById('correctOption1').innerHTML = correctOption
            document.getElementById('option-modal2').style.display = "flex"
            document.getElementById('correctOption5').innerHTML = currentQuestion[currentQuestionAnswer]
            // alert(correctOption)
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)

        }



        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            // document.getElementById(wrongLabelId).style.backgroundColor = "red"
            // document.getElementById(correctOption).style.backgroundColor = "green"
            document.getElementById('option-modal').style.display = "flex"
            document.getElementById('correctOption1').innerHTML = currentQuestion[currentQuestionAnswer]
            // document.getElementById('correctOption2').innerHTML = currentQuestion[option.value]
            // alert(currentQuestionAnswer)
            wrongAttempt++
            indexNumber++

            setTimeout(() => {
                questionNumber++
            }, 1000)

        }
    })



    //delays next question displaying for a second


}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 4) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 100000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 0) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 2 && playerScore < 4) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 4) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 5) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
    document.getElementById('option-modal2').style.display = "none"
    setTimeout(() => {
        if (indexNumber <= 4) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 5);
}

function close_window() {
    if (confirm("Do you want to close window?")) {
      close();
    }
  }
