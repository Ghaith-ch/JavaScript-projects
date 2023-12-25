// Select the <select> element by its ID
let selectElement = document.getElementById("categoryDropdown");

//Span the categorY
let spanCategory = document.querySelector(".chosenCategory");

// Select the span for count of quetion
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

// Add an event listener for the change event
selectElement.addEventListener("change",fetchQuestions);

function fetchQuestions(){

//Remove all old spans and old result
spansDiv.innerHTML= "";
resultDiv.innerHTML ="";

//Remove all old questions
questionDiv.innerHTML= "";

//Remove all old answers
answersDiv.innerHTML= "";

// Accessing the selected option
let selectedOption = selectElement.options[selectElement.selectedIndex];

// Accessing the value and text of the selected option
let selectedValue = selectedOption.value;

// Logging the selected value and text
console.log("Selected Value: ", selectedValue);
spanCategory.innerHTML = selectedValue;

// Replace 'questions.json' with the actual path to the JSON file
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
        // Handle the parsed JSON data
        //number of the questions
        let numberOfQuestions = data.length;
        
        sendButton.disabled = false;
        sendButton.style.opacity = 1;
        sendButton.style.pointerEvents = "auto";

        //Create the spans
        createOfBullets(numberOfQuestions);

        //Add the data to the app
        addQuestionsData(data[currentIndex],numberOfQuestions,currentIndex);

        countDown(50,currentIndex,numberOfQuestions);


        sendButton.addEventListener("click",()=>{

            //check then
            if (data[currentIndex] && data[currentIndex].right_answer) {

                let theRightAnswer = data[currentIndex].right_answer;
            
                //Check the Answer
                ChecktheAnswer(theRightAnswer);

                //Increase Index to go to the next question and that is so important
                currentIndex++;

                //Remove all old questions
                questionDiv.innerHTML= "";

                //Remove all old answers
                answersDiv.innerHTML= "";

                //the index now is not the same
                addQuestionsData(data[currentIndex],numberOfQuestions,currentIndex);

                handleTheBullets(currentIndex);

                //imortants to starts counting from the start in the next question
                clearInterval(countDownIntervall);

                countDown(50,currentIndex,numberOfQuestions);

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
//Set a color on the first span

function createOfBullets(numberOfQuestions) {   
    //Set the number of the Questions
    questionsNumber.innerHTML= numberOfQuestions;

    // Create spans depands on the number of the questions
    for (let i = 0; i < numberOfQuestions; i++) {
        let aBullet = document.createElement("span");
        if(i === 0){ aBullet.className = "on";}//Set a color on the first span
        spansDiv.appendChild(aBullet);
        spansDiv.style.display = "flex";
    }
};

function addQuestionsData(theObject,numberOfQuestions,currentIndex){

    if (currentIndex < numberOfQuestions) {
        questionDiv.innerHTML = `<h2>${theObject.question}</h2>`;

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
    //Get All radio button
    let answersRadio = document.getElementsByName("question");
    let theChoosenAnswer;

    for(let i = 0; i < answersRadio.length; i++){
        if(answersRadio[i].checked){
            theChoosenAnswer = answersRadio[i].dataset.answer;
        }
    }
    if(rightAnswer === theChoosenAnswer ){rightAnswersCounter++;}
}

function handleTheBullets(currentIndex){
    //Selcet all spans bullets
    let spansBullets = document.querySelectorAll(".theSpans span");

    // loop
    spansBullets.forEach((span,index) => {
        if(index === currentIndex){span.className= "on";}
    });
}


//fix
function showResultMessage(currentIndex,numberOfQuestions){

    console.log("Now the Result");

    let sendButton = document.querySelector('.send');
    sendButton.disabled = true;
    sendButton.style.opacity = 0.5;
    sendButton.style.pointerEvents = "none";

    spansDiv.style.display = "none";


    if(rightAnswersCounter > (numberOfQuestions/2) && rightAnswersCounter < (numberOfQuestions)){
        resultDiv.innerHTML = `<span class="good">Good!</span> you answered "${rightAnswersCounter}" of "${numberOfQuestions}"`;
    }else if (rightAnswersCounter === numberOfQuestions){
        resultDiv.innerHTML = `<span class="perfect">Perfect!</span> you answered "${rightAnswersCounter}" of "${numberOfQuestions}"`;
    }else {
        resultDiv.innerHTML = `<span class="bad">Bad!</span> you answered "${rightAnswersCounter}" of "${numberOfQuestions}"`;
    }
        
}

function countDown(theDuration,currentIndex,numberOfQuestions ){

    if(currentIndex < numberOfQuestions){
        let minutes,seconds;
        countDownIntervall = setInterval(() =>{
            minutes = parseInt (theDuration / 60);
            seconds = parseInt (theDuration % 60);

            minutes = minutes < 10 ? `0${minutes}`:minutes;
            seconds = seconds < 10 ? `0${seconds}`:seconds;

            countdownDiv.innerHTML = `${minutes}:${seconds}`;

            if(--theDuration < 0){
                clearInterval(countDownIntervall);
                let sendButton = document.querySelector('.send');
                sendButton.click();

                console.log("Dsdsd");
            }

        },1000);
    }
}