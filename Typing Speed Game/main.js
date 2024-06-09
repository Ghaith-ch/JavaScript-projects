document.addEventListener("DOMContentLoaded", function() {
    // Array of words used in the game
    const thewords = [
        "apple", "banana", "orange", "grape", "mango",
        "pineapple", "peach", "cherry", "strawberry", "blueberry",
        "kiwi", "watermelon", "papaya", "plum", "pear",
        "lemon", "lime", "pomegranate", "apricot", "nectarine",
        "blackberry", "raspberry", "cantaloupe", "fig", "grapefruit",
        "guava", "jackfruit", "kumquat", "lychee", "mulberry",
        "olive", "persimmon", "quince", "tangerine", "dragonfruit",
        "elderberry", "gooseberry", "honeydew", "jambul", "kiwano",
        "longan", "mangosteen", "marionberry", "miraclefruit", "pluot",
        "rambutan", "salak", "sapodilla", "soursop", "starfruit",
        "ugli", "yuzu", "bilberry", "boysenberry", "cloudberry",
        "cranberry", "currant", "dewberry", "jabuticaba", "nashi"
    ];

    // Level times in seconds for easy, medium, and hard levels
    const LEVEL_TIMES = {
        easy: 130,
        medium: 110,
        hard: 80
    };

    // Catching selectors for all elements
    const mainDiv = document.querySelector(".main");
    const controlsDiv = document.querySelector(".controls");
    const levelSelect = document.querySelector('select');
    const theMessage = document.querySelector(".message");
    const spanLevel = document.querySelector(".level");
    const spanSeconds = document.querySelector(".seconds");
    const startButton = document.querySelector(".start-btn");
    const WordDiv = document.querySelector(".word-display");
    const inputWord = document.querySelector('input[type="text"]');
    const allWordsDiv = document.querySelector(".upcoming-words");
    const timeLeft = document.querySelector(".time-value");
    const spanScore = document.querySelector(".score-value");
    const spanTotalWords = document.querySelector(".total-words");
    const howToPlayBtn = document.querySelector(".how-to-play-btn");
    const howToPlayDiv = document.querySelector(".how-to-play-div");
    const closeBtn = document.querySelector(".close-btn");
    const resultDiv = document.querySelector(".result-main");
    const finalScore = document.querySelector(".final-score");
    const totalScore = document.querySelector(".total-score");
    const playAgainButton = document.querySelector(".play-again-btn");

    // Function to toggle the display style of an element
    function toggleElementDisplay(element, displayStyle) {
        element.style.display = displayStyle;
    }

    // Function to update the text content of an element
    function updateElementText(element, text) {
        element.textContent = text;
    }

    // Show "How to Play" instructions
    howToPlayBtn.addEventListener("click", function() {
        toggleElementDisplay(mainDiv, "none");
        toggleElementDisplay(howToPlayDiv, "block");
    });

    // Close "How to Play" instructions
    closeBtn.addEventListener("click", function() {
        toggleElementDisplay(howToPlayDiv, "none");
        toggleElementDisplay(mainDiv, "block");
    });

    // Update the game time based on selected level
    levelSelect.addEventListener('change', function(event) {
        const theLevel = event.target.value;
        spanSeconds.textContent = LEVEL_TIMES[theLevel];
        updateElementText(spanLevel, theLevel);
    });

    // Start the game when the start button is clicked with function to initialize and start the game
    startButton.addEventListener("click", startGame);

    function startGame() {
        updateElementText(timeLeft, spanSeconds.textContent);
        updateElementText(spanTotalWords, thewords.length);
        updateElementText(totalScore, thewords.length);
        howToPlayBtn.classList.add("disabled"); // Disable the "How to Play" button during the game

        // Hide message and controls, show input field for the game
        toggleElementDisplay(theMessage, "none");
        toggleElementDisplay(controlsDiv, "none");
        toggleElementDisplay(startButton, "none");
        toggleElementDisplay(inputWord, "block");

        inputWord.onpaste = () => false;// Disable pasting into the input field
        inputWord.focus();

        startInterval();
        generateWord();
    }

    // Function to start the countdown timer
    function startInterval() {
        let intervalId = setInterval(function() {
            timeLeft.textContent--;
            if (timeLeft.textContent === "0") {
                clearInterval(intervalId);
                finishGame(spanScore.textContent); // Finish the game when time runs out
            }
        }, 1000);
    }

    // Function to generate and display a random word from the array
    function generateWord() {
        let aRandomWord = thewords[Math.floor(Math.random() * thewords.length)];
        thewords.splice(thewords.indexOf(aRandomWord), 1);
        updateElementText(WordDiv, aRandomWord);

        // Display remaining words
        allWordsDiv.innerHTML = '';
        thewords.forEach(word => {
            let div = document.createElement("div");
            div.textContent = word;
            allWordsDiv.appendChild(div);
        });
    }

    // Event listener to handle input word matching
    inputWord.addEventListener('input', function() {
        let typedWord = inputWord.value.toLowerCase();
        let currentWord = WordDiv.textContent.toLowerCase();

        if (typedWord.length === currentWord.length) {
            // Check if the typed word matches the displayed word
            if (typedWord === currentWord) {
                spanScore.textContent++;
            }
            inputWord.value = ''; // Clear the input field

            // Generate a new word or finish the game if all words are used
            thewords.length > 0 ? generateWord() : finishGame(spanScore.textContent);
        }
    });

    // Function to handle the end of the game
    function finishGame(theFinalScore) {
        toggleElementDisplay(resultDiv, "block");
        toggleElementDisplay(mainDiv, "none");
        updateElementText(finalScore, theFinalScore);
        updateElementText(finalScore, theFinalScore);
    }

    // Reload the page when "Play Again" button is clicked
    playAgainButton.addEventListener("click", function() {
        location.reload()
    });
});
