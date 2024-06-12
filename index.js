const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")


$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion) 

let currentQuestionIndex = 0
let totalCorrect = 0



function startGame(){
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}


function displayNextQuestion() {
    resetState()

    if(questions.length === currentQuestionIndex){
        return finishGame()
    }


    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer =>  {
       const newAnswer = document.createElement("button")
       newAnswer.classList.add("button", "answer")
       newAnswer.textContent = answer.text
       if (answer.correct){
        newAnswer.dataset.correct = answer.correct
       }
       $answersContainer.appendChild(newAnswer)

       newAnswer.addEventListener("click", selectAnswer)
    })
}


function resetState () {
    while($answersContainer.firstChild){          // removendo os elementos filhos  
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target

    if(answerClicked.dataset.correct){
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }

        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const performace = Math.floor(totalCorrect*100 / totalQuestion)

    let message = ""

    switch(true){
        case (performace >= 90):
            message = "Excelente :)"
            break
        case (performace >= 70):
            message = "Muito bom :)"
            break
        case (performace >= 50):
            message = "Bom"
            break
        default:
            message = "Pode melhorar :("
    }
    $questionsContainer.innerHTML = 
    `
    <p class="final-message">
        Você acertou ${totalCorrect} de ${totalQuestion} questões!
        <span> Resultado: ${message} </span>
    </p>

    <button class="button" onclick=window.location.reload()> 
        Refazer teste
    </button>
    
    `

}


// questões

const questions = [
    {
        question: "Qual a soma de 2 + 2",
        answers:[
            {text: 2, correct:false },
            {text: 3, correct: false },
            {text: 4, correct: true },
            {text: 5, correct: false },
        ]
    },

    {
        question: "Qual a soma de 3 + 2",
        answers:[
            {text: 2, correct:false },
            {text: 3, correct: false },
            {text: 4, correct: false },
            {text: 5, correct: true },
        ]
    },

    // {
    //     question: "Qual o valor de 2 x 2",
    //     answers:[
    //         {text: 2, correct:false },
    //         {text: 3, correct: false },
    //         {text: 4, correct: true },
    //         {text: 5, correct: false },
    //     ]
    // },

    // {
    //     question: "Qual o valor de 3 x 2",
    //     answers:[
    //         {text: 2, correct:false },
    //         {text: 3, correct: false },
    //         {text: 6, correct: true },
    //         {text: 5, correct: false },
    //     ]
    // },

    // {
    //     question: "Qual o valor de 2 / 2",
    //     answers:[
    //         {text: 1, correct:true },
    //         {text: 3, correct: false },
    //         {text: 4, correct: false },
    //         {text: 5, correct: false },
    //     ]
    // },

    // {
    //     question: "Qual o valor 5*8",
    //     answers:[
    //         {text: 2, correct:false },
    //         {text: 3, correct: false },
    //         {text: 40, correct: true },
    //         {text: 5, correct: false },
    //     ]
    // },

    // {
    //     question: "Qual o valor de 10/10",
    //     answers:[
    //         {text: 2, correct:false },
    //         {text: 3, correct: false },
    //         {text: 4, correct: false },
    //         {text: 1, correct: false },
    //     ]
    // },

    // {
    //     question: "Qual o valor de 5x7",
    //     answers:[
    //         {text: 2, correct:false },
    //         {text: 35, correct: true },
    //         {text: 4, correct: false },
    //         {text: 5, correct: false },
    //     ]
    // },

]