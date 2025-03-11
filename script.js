const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getImagePath(choice) {
    return `images/${choice}.png`;
}

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    document.getElementById("computer-choice").textContent = "?"; // Placeholder
    document.getElementById("result").textContent = "Thinking... 🤔";

    setTimeout(() => {
        document.getElementById("computer-choice").textContent = capitalizeFirstLetter(computerChoice);
        
        let result;
        if (playerChoice === computerChoice) {
            result = "It's a tie!";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "scissors" && computerChoice === "paper") ||
            (playerChoice === "paper" && computerChoice === "rock")
        ) {
            result = `You win! ${capitalizeFirstLetter(playerChoice)} beats ${capitalizeFirstLetter(computerChoice)}.`;
            playerScore++;
        } else {
            result = `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(playerChoice)}.`;
            computerScore++;
        }

        document.getElementById("player-score").textContent = playerScore;
        document.getElementById("computer-score").textContent = computerScore;
        document.getElementById("result").textContent = result;

        animateChoices(playerChoice, computerChoice, result.includes("win"));
    }, 1000);
}

function animateChoices(playerChoice, computerChoice, playerWins) {
    const playerChoiceAnimation = document.getElementById("player-choice-animation");
    const computerChoiceAnimation = document.getElementById("computer-choice-animation");
    const fightAnimation = document.getElementById("fight-animation");

    playerChoiceAnimation.style.backgroundImage = `url(${getImagePath(playerChoice)})`;
    computerChoiceAnimation.style.backgroundImage = `url(${getImagePath(computerChoice)})`;

    playerChoiceAnimation.style.opacity = 1;
    computerChoiceAnimation.style.opacity = 1;

    playerChoiceAnimation.style.animation = "moveToCenterPlayer 1s forwards";
    computerChoiceAnimation.style.animation = "moveToCenterComputer 1s forwards";

    setTimeout(() => {
        playerChoiceAnimation.style.opacity = 0;
        computerChoiceAnimation.style.opacity = 0;
        fightAnimation.style.display = "block";
        console.log("Fight GIF should be visible now");
    }, 1000);

    setTimeout(() => {
        fightAnimation.style.display = "none";
        playerChoiceAnimation.style.display = "none";
        computerChoiceAnimation.style.display = "none";
        if (playerWins) {
            playerChoiceAnimation.style.backgroundImage = `url(${getImagePath(playerChoice)})`;
            playerChoiceAnimation.style.opacity = 1;
            playerChoiceAnimation.style.display = "flex";
            playerChoiceAnimation.style.transform = "translate(-50%, -50%) scale(1.5)";
            playerChoiceAnimation.style.animation = "pulse 1s infinite"; // Apply pulsing animation
        } else {
            computerChoiceAnimation.style.backgroundImage = `url(${getImagePath(computerChoice)})`;
            computerChoiceAnimation.style.opacity = 1;
            computerChoiceAnimation.style.display = "flex";
            computerChoiceAnimation.style.transform = "translate(-50%, -50%) scale(1.5)";
            computerChoiceAnimation.style.animation = "pulse 1s infinite"; // Apply pulsing animation
        }
    }, 3000);
}

document.getElementById("rock").addEventListener("click", (event) => handleButtonClick(event, "rock"));
document.getElementById("paper").addEventListener("click", (event) => handleButtonClick(event, "paper"));
document.getElementById("scissors").addEventListener("click", (event) => handleButtonClick(event, "scissors"));

function handleButtonClick(event, choice) {
    const button = event.target;
    button.classList.add("clicked");
    setTimeout(() => button.classList.remove("clicked"), 300); // Remove after animation
    playGame(choice);
}

// Reference to the reset button
const resetButton = document.getElementById("reset");

// References to the score and result display elements
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const resultDisplay = document.getElementById("result");
const computerChoiceDisplay = document.getElementById("computer-choice");
const playerChoiceAnimation = document.getElementById("player-choice-animation");
const computerChoiceAnimation = document.getElementById("computer-choice-animation");
const fightAnimation = document.getElementById("fight-animation");

// Reset Button Functionality
resetButton.addEventListener("click", function() {
    // Reset scores and UI
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    resultDisplay.textContent = "Game reset!";
    computerChoiceDisplay.textContent = "?";

    // Reset animations and images
    playerChoiceAnimation.style.opacity = 0;
    computerChoiceAnimation.style.opacity = 0;
    playerChoiceAnimation.style.display = "none";
    computerChoiceAnimation.style.display = "none";
    fightAnimation.style.display = "none";

    // Reset animation properties
    playerChoiceAnimation.style.animation = "none";
    computerChoiceAnimation.style.animation = "none";

    // Force reflow to restart animations
    void playerChoiceAnimation.offsetWidth;
    void computerChoiceAnimation.offsetWidth;

    // Reset background images
    playerChoiceAnimation.style.backgroundImage = "";
    computerChoiceAnimation.style.backgroundImage = "";
});
