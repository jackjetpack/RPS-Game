const choices = ["Rock", "Paper", "Scissors"];

// get buttons and result display
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll("button");

// function to play the game
function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;
    if (playerChoice === computerChoice)
        result = "It's a tie!";
    else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")
    ){
        result = "You win! " + playerChoice + " beats " + computerChoice;
     } else {
        result = "You lose! " + computerChoice + " beats " + playerChoice;
     }
    resultDisplay.textContent = result;
}

//Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", function() {
        playGame(button.textContent);
    });
});