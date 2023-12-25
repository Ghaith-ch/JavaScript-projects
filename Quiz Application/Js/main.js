//Select the <select> element by its ID
let selectElement = document.getElementById("categoryDropdown");

//Span the categorY
let spanCategory = document.querySelector(".chosenCategory");

//Select the span for count of quetion
let questionsNumber = document.querySelector(".numberOfQuestion");

//Selcet the div of all spans bullets
let spansDiv = document.querySelector(".theSpans");

//Select the div of the question 
let questionDiv = document.querySelector(".quizQuestionArea");

//Select the div of the answers 
let answersDiv = document.querySelector(".answersArea");

//Select the Submit button
let sendButton = document.querySelector('.send');

//Select the div of the answers 
let countdownDiv = document.querySelector(".countdown");

//Select the div of the answers 
let resultDiv = document.querySelector(".resutlt");

let rightAnswersCounter = 0 ;
let countDownIntervall;

//Add an event listener for the change event
selectElement.addEventListener("change",fetchQuestions);



function fetchQuestions(){

//Remove all old spans and old result
spansDiv.innerHTML= "";
resultDiv.innerHTML ="";

//Remove all old questions
questionDiv.innerHTML= "";

//Remove all old answers
answersDiv.innerHTML= "";

//Accessing the selected option
let selectedOption = selectElement.options[selectElement.selectedIndex];

//Accessing the value and text of the selected option
let selectedValue = selectedOption.value;

//Logging the selected value and text
console.log("Selected Value: ", selectedValue);
spanCategory.innerHTML = selectedValue;


//Replace 'questions.json' with the actual path to the JSON file
const jsonFile = selectedValue + 'Questions' + '.json';

let currentIndex = 0 ;

// Fetch the JSON file
fetch(jsonFile)
    .then(response => {
        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON (${response.status} ${response.statusText})`);
        }
        
          // Parse the JSON response
        return response.json();
    })
    .then(data => {
        //Handle the parsed JSON data

        //Get the number of questions from the data
        let numberOfQuestions = data.length;
        
        //Enable the send button and reset its style
        sendButton.disabled = false;
        sendButton.style.opacity = 1;
        sendButton.style.pointerEvents = "auto";

        //Create bullet indicators for each quiz
        createOfBullets(numberOfQuestions);

        //Add the data for the first question to the app
        addQuestionsData(data[currentIndex],numberOfQuestions,currentIndex);

        //Start the countdown for the first question
        countDown(10,currentIndex,numberOfQuestions);

        sendButton.addEventListener("click",()=>{

            //Check if there is data for the current index and it has a right answer
            if (data[currentIndex] && data[currentIndex].right_answer) {

                let theRightAnswer = data[currentIndex].right_answer;
            
                //Check the answer
                ChecktheAnswer(theRightAnswer);

                //Increase the index to move to the next question (important step)
                currentIndex++;

                //Remove the old question
                questionDiv.innerHTML= "";

                //Remove the old answers
                answersDiv.innerHTML= "";

                //Set up and display the next question
                addQuestionsData(data[currentIndex],numberOfQuestions,currentIndex);

                //Update the bullet indicators
                handleTheBullets(currentIndex);

                //Reset and start the countdown for the next question.
                clearInterval(countDownIntervall);

                countDown(10,currentIndex,numberOfQuestions);

                //Check if it's the last question and display the result if true
                if (currentIndex === numberOfQuestions){
                    showResultMessage(currentIndex,numberOfQuestions);
                }
        }
        });
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching JSON:', error.message);
    });
}

function createOfBullets(numberOfQuestions) {   
    //Set the number of questions
    questionsNumber.innerHTML= numberOfQuestions;

    //Create spans based on the number of questions
    for (let i = 0; i < numberOfQuestions; i++) {
        let aBullet = document.createElement("span");
        if(i === 0){ aBullet.className = "on";}//Set a color on the first span

        spansDiv.appendChild(aBullet);
        spansDiv.style.display = "flex";
    }
};

function addQuestionsData(theObject,numberOfQuestions,currentIndex){

    //Check if there are more questions to display
    if (currentIndex < numberOfQuestions) {
        questionDiv.innerHTML = `<h2>${theObject.question}</h2>`;

        //Loop through each answer option and display it in the HTML
        for (let i = 1; i <= 4; i++) {
            answersDiv.innerHTML += `
            <div class="answer">
                <input name="question" type="radio" id="answer-${i}" data-answer="${theObject[`answer${i}`]}" ${i === 1 ? 'checked' : ''}>
                <label for="answer-${i}">${theObject[`answer${i}`]}</label>
            </div>
            `;
        }
    }
};

function ChecktheAnswer(rightAnswer) {
    //Get all radio buttons with the name "question"
    let answersRadio = document.getElementsByName("question");

    //Variable to store the chosen answer
    let theChoosenAnswer;

    //Loop through radio buttons to find the chosen answer
    for(let i = 0; i < answersRadio.length; i++){
        if(answersRadio[i].checked){
            theChoosenAnswer = answersRadio[i].dataset.answer;
        }
    }

    // Check if the chosen answer is correct and update the counter
    if(rightAnswer === theChoosenAnswer ){rightAnswersCounter++;}
}

function handleTheBullets(currentIndex){
    //Select all spans representing bullets
    let spansBullets = document.querySelectorAll(".theSpans span");

    // Set a specific class ("on") for the span at the current index
    spansBullets.forEach((span,index) => {
        if(index === currentIndex){span.className= "on";}
    });
}

function showResultMessage(currentIndex,numberOfQuestions){
    console.log("Now the Result");

    let sendButton = document.querySelector('.send');

    //Disable the send button 
    sendButton.disabled = true;
    sendButton.style.opacity = 0.5;
    sendButton.style.pointerEvents = "none";
    spansDiv.style.display = "none";

    //Determine the result message based on the number of correct answers
    if(rightAnswersCounter > (numberOfQuestions/2) && rightAnswersCounter < (numberOfQuestions)){
        resultDiv.innerHTML = `<span class="good">Good!</span> you answered "${rightAnswersCounter}" of "${numberOfQuestions}"`;
    }else if (rightAnswersCounter === numberOfQuestions){
        resultDiv.innerHTML = `<span class="perfect">Perfect!</span> you answered "${rightAnswersCounter}" of "${numberOfQuestions}"`;
    }else {
        resultDiv.innerHTML = `<span class="bad">Bad!</span> you answered "${rightAnswersCounter}" of "${numberOfQuestions}"`;
    }
}

function countDown(theDuration,currentIndex,numberOfQuestions ){

    //Check if there are more questions to countdown
    if(currentIndex < numberOfQuestions){
        let minutes,seconds;
        
        //Set up an interval to update the countdown
        countDownIntervall = setInterval(() =>{
            minutes = parseInt (theDuration / 60);
            seconds = parseInt (theDuration % 60);

            //Format minutes and seconds with leading zeros
            minutes = minutes < 10 ? `0${minutes}`:minutes;
            seconds = seconds < 10 ? `0${seconds}`:seconds;

            countdownDiv.innerHTML = `${minutes}:${seconds}`;

            //Check if the duration has reached zero
            if(--theDuration < 0){
                clearInterval(countDownIntervall);
                let sendButton = document.querySelector('.send');
                sendButton.click();
            }
        },1000);
    }
}