window.addEventListener("load",()=>{
  generateLetters();
  let theRandomWord = getRandomWord();
  displayWord(theRandomWord);
  handleClick(theRandomWord); 
});


function generateLetters() {
  // Generate letters and convert them directly into an array
  const alphabetArray = Array.from("abcdefghijklmnopqrstuvwxyz");

  // Select the keyboard element using its class name
  let keyboardElement = document.querySelector(".keyboard");

  // Iterate over each letter in the array
  alphabetArray.forEach(letter => {
    // Create a new span element for each letter
    let letterSpan = document.createElement("span");

    // Create a text node with the current letter
    let letterTextNode = document.createTextNode(letter);

    // Append the text node to the span element
    letterSpan.appendChild(letterTextNode);

    // Add the span element to the keyboard
    keyboardElement.appendChild(letterSpan);
  });
}

function getRandomWord() {
  const wordCategories = {
    programming_language: ['javascript', 'python', 'java', 'c sharp', 'php', 'typescript','go', 'html'],
    football_teams: ['manchester united', 'real madrid', 'bayern munich', 'liverpool', 'juventus', 'chelsea', 'psg', 'ac milan', 'arsenal'],
    country: ['usa', 'syria', 'india', 'brazil', 'russia', 'japan', 'germany', 'france', 'canada', 'australia','sweden','ksa','qatar'],
    celebrities: ['tom hanks', 'jennifer aniston', 'leonardo dicaprio', 'scarlett johansson', 'will smith', 'angelina jolie', 'brad pitt', 'meryl streep', 'chris evans', 'emma watson'],
    movies: ['the shawshank redemption', 'the godfather', 'pulp fiction', 'forrest gump', 'the hobbit', 'inception', 'titanic', 'avengers endgame', 'jurassic park', 'star wars'],
  };

  const categories = Object.keys(wordCategories);
  const selectedCategory = categories[Math.floor(Math.random() * categories.length)];

  let categoryInfo = document.querySelector(".category span");
  categoryInfo.innerHTML = selectedCategory;

  const selectedCategoryWords = wordCategories[selectedCategory];
  const randomWord = selectedCategoryWords[Math.floor(Math.random() * selectedCategoryWords.length)];

  const wordAsArray = Array.from(randomWord.toLowerCase());
  console.log(wordAsArray);
  return wordAsArray;
}




function message(winOrLose = "", theWord = ""){
  
  // Create overlay element
  let overlay = document.createElement("div");
  overlay.className = 'overlay-instructions';

  // Create the popup box
  let popupBox = document.createElement("div");
  popupBox.className = 'popup-box-instructions';

  let headingText
  // Create heading and paragraph
  headingText = "A quick guide on how to play";
  let pargraphText = "In Hangman, begin by checking the word's category. Guess a letter, but be cautious! you have 9 attempts. With each incorrect guess, a rope or element is added to the man. The objective is to unveil the word before the man is fully depicted. Enjoy the challenge!";

  popupBox.innerHTML = `
    <h3>${headingText}</h3>
    <p>${pargraphText}</p>
    <span class="close-button">X</span>
  `;

  // Win or Lose Message
  if(winOrLose !== "" && theWord !== ""){

    let keyboardElement = document.querySelector(".keyboard");
    keyboardElement.classList.add("disable");
    theWord = theWord.toString().replace(/,/g, '');

    console.log(theWord);

    if(winOrLose === "win"){
      headingText = "Congratulations! You won!";
      theWord="";
    }else{
      headingText = "Oops! You lost. The Word was: ";
    }

    // Create heading and button

    popupBox.innerHTML = `
      <h3>${headingText}<span>${theWord}</span></h3>
      <button class="playAgain">Play again</button>
      <span class="close-button">X</span>
    `;
  }

  // Append the popup box to body
  document.body.appendChild(overlay);
  document.body.appendChild(popupBox);


  // Close Popup
  document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
      // Remove The Current Popup
      e.target.parentNode.remove();
    
      // Remove Overlay
      document.querySelector(".overlay-instructions").remove();
    }
  });
}

function displayWord(theRandomWord) {

  console.log(theRandomWord)
  // Select the display element
  let displayElement = document.querySelector(".wordDisplay");

  // Iterate over each letter or space in the chosen word
  theRandomWord.forEach(letterOrSpace => {
    // Create an empty span for each letter or space
    let letterSpan = document.createElement("span");

    // Check if it is a space and add a class for styling
    if (letterOrSpace === " ") {
      letterSpan.className = "space";
    }

    // Append the span to the display element
    displayElement.appendChild(letterSpan);
  });
}

function handleClick(chosenWord) {
  // Select the display spans
  let displaySpans = document.querySelectorAll(".wordDisplay span");
  let hangmanDrawElement = document.querySelector(".hangmanDraw");

  // Count wrong attempts
  let wrongCounter = 0;

  // Count right attempts
  let rightCounter = 0;

  // Handle clicking on letters
  document.addEventListener("click", (e) => {

    //handle Play Again buttons
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('playAgain')) {
        location.reload();
    }

    // Flag to check the state of the game
    let isCorrectLetter = false;

    if (e.target.tagName === 'SPAN' && e.target.closest('.keyboard')) {
      // Get the clicked letter and mark it as clicked
      let clickedLetter = e.target.innerHTML.toLowerCase();
      e.target.classList.add("clicked");

      chosenWord.forEach((wordLetter, wordIndex) => {
        // Check if the clicked letter equals one of the chosen word letters
        if (wordLetter === clickedLetter) {
            isCorrectLetter = true;

            // Loop through display spans to update the guessed letter
            displaySpans.forEach((span, spanIndex) => {
              if (wordIndex === spanIndex) {
                span.innerHTML = wordLetter;
                rightCounter++;
              }
            });
        }
      });

      // If the letter is wrong
      if (!isCorrectLetter) {
        wrongCounter++;

        // Add a class to the hangman drawing
        hangmanDrawElement.classList.add(`wrongNumber${wrongCounter}`);

        // Play fail sound
        document.getElementById("fail").play();

        //||
        if (wrongCounter === 9) {
          console.log("lose");
          message("lose",chosenWord);

        }
      } else {
        // Play success sound
        console.log(rightCounter);
        document.getElementById("success").play();
        if(rightCounter === displaySpans.length){
          console.log("win");
          message("win",chosenWord);
        }
        
      }
    }
  });
}


let instructionsButton = document.querySelector(".gameInfo button");
  instructionsButton.addEventListener('click', (e) => {
    message();
});


