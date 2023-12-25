"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {
    seconds : 5,
    timerId : null,
    timeRef : document.querySelector("#errorMsg"),
    timerEnabled : false
};

//Lägger en lyssnare på window, som aktiveras när sidan laddat klart
window.addEventListener('load', prepGame);

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

}

//Funktion som förbereder spelet inför start
function prepGame() {

    console.log('prepGame();');

    oGameData.initGlobalObject();

    //Adderar klassen d-none på gameArean
    let gameArea = document.querySelector('#gameArea');
    gameArea.classList.add('d-none');

    //Lägger en lyssnare på startknappen som lyssnar efter klick
    let newGameBtn = document.querySelector('#newGame');
    newGameBtn.addEventListener('click', validateForm, false);

    let form = document.querySelector('#divInForm');
    let button = document.querySelector('#divWithA');
    let div = document.createElement('div');
    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', 'myCheckbox');
    let textNode = document.createTextNode(' Vill du begränsa tiden till 5 sekunder per drag?');

    div.appendChild(checkBox);
    div.appendChild(textNode);
    div.classList.add('ml-3', 'mt-2');
    form.insertBefore(div, button);



}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function() {   
    
    //Kontrollerar om "X" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 1
    if ( oGameData.checkHorizontal("X") || oGameData.checkVertical("X") || 
        oGameData.checkDiagonalLeftToRight("X") || oGameData.checkDiagonalRightToLeft("X") ){

       return 1;
    }
    //Kontrollerar om "O" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 2
    if ( oGameData.checkHorizontal("O") || oGameData.checkVertical("O") || 
        oGameData.checkDiagonalLeftToRight("O") || oGameData.checkDiagonalRightToLeft("O") ){
        
        return 2;
    }
    //Kontrollerar om spelet är oavgjort, returnerar isåfall 3
    if( oGameData.checkForDraw() ) {
        
        return 3;
    }
    //Annars returneras 0, och spelet fortlöper
    else {

        return 0;
    }

}

/*
* https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn
* I koden som följer har vi inspirerats av ovanstående sida. Vi har läst igenom koden och anpassat den till våra lösning
* där vi istället för att ha en funktion som rättar hela gameField i ett svep, har delat upp den i de fyra funktionerna
* checkForHorizontal, checkForVertical, checkForDiagonalLeftToRight och checkForDiagonalRightToLeft. Till skillnad från 
* ursprungskoden så skickar vi även in en parameter som vi kontrollerar om den är identisk med tecknen i de olika kombinationerna.
* Vad som händer därefter med att returnera true eller false är vårt eget påhitt.
*/

//Kontrollerar om spelet avgjorts horisontellt,
//tar emot en parameter och returnerar sant eller falskt
oGameData.checkHorizontal = function (playerIn) {

    //Möjliga vinnande kombinationer
    const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];

    //Sätter en flagga som ändras först om spelet hittar en vinnare
    let roundWon = false;

    //Itererar igenom arrayen för att se om vi hittar en vinnande kombination
    for ( let i = 0; i < 3; i++ ){
        let check = combos[i];
        let a = this.gameField[check[0]];
        let b = this.gameField[check[1]];
        let c = this.gameField[check[2]];

        //Kontrollerar om någon av platserna i arrayen är tom
        if ( a === "" || b === "" || c === "" ) {
            continue;
        }

        //Kontrollerar om alla tecken i arrayen är identiska med inparametern,
        //och ändrar isåfall roundWon till true
        if ( playerIn === a && a === b && b === c ){
            roundWon = true;
            break;
        }
    }

    //Returnerar resultatet till checkForGameOver
    if(roundWon) {
        return true;
    }
    else 
        return false;

}

oGameData.checkVertical = function (playerIn) {

    //Möjliga vinnande kombinationer
    let combos = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    //Sätter en flagga som ändras först om spelet hittar en vinnare
    let roundWon = false;

    //Itererar igenom arrayen för att se om vi hittar en vinnande kombination
    for ( let i = 0; i < 3; i++ ){
        let check = combos[i];
        let a = this.gameField[check[0]];
        let b = this.gameField[check[1]];
        let c = this.gameField[check[2]];

        //Kontrollerar om någon av platserna i arrayen är tom
        if ( a === "" || b === "" || c === "" ){
            continue;
        }

        //Kontrollerar om alla tecken i arrayen är identiska med inparametern,
        //och ändrar isåfall roundWon till true
        if ( playerIn === a && a === b && b === c ){
            roundWon = true;
            break;
        }
    }

    //Returnerar resultatet till checkForGameOver
    if(roundWon) {
        return true;
    }
    else 
        return false;
    
}

oGameData.checkDiagonalLeftToRight = function (playerIn) {

    //Möjlig vinnande kombination
    let combos = [
        [0, 4, 8]
    ];

    //Sätter en flagga som ändras först om spelet hittar en vinnare
    let roundWon = false;

    //Itererar igenom arrayen för att se om vi hittar en vinnande kombination
    for ( let i = 0; i < 1; i++ ){
        let check = combos[i];
        let a = this.gameField[check[0]];
        let b = this.gameField[check[1]];
        let c = this.gameField[check[2]];

        //Kontrollerar om någon av platserna i arrayen är tom
        if ( a === "" || b === "" || c === "" ){
            continue;
        }

        //Kontrollerar om alla tecken i arrayen är identiska med inparametern,
        //och ändrar isåfall roundWon till true
        if ( playerIn === a && a === b && b === c ){
            roundWon = true;
            break;
        }
    }

    //Returnerar resultatet till checkForGameOver
    if(roundWon) {
        return true;
    }
    else 
        return false;
    
}

oGameData.checkDiagonalRightToLeft = function (playerIn) {
    
    //Möjlig vinnande kombination
    let combos = [
        [2, 4, 6]
    ];

    //Sätter en flagga som ändras först om spelet hittar en vinnare
    let roundWon = false;

    //Itererar igenom arrayen för att se om vi hittar en vinnande kombination
    for ( let i = 0; i < 1; i++ ){
        let check = combos[i];
        let a = this.gameField[check[0]];
        let b = this.gameField[check[1]];
        let c = this.gameField[check[2]];

        //Kontrollerar om någon av platserna i arrayen är tom
        if ( a === "" || b === "" || c === "" ){
            continue;
        }

        //Kontrollerar om alla tecken i arrayen är identiska med inparametern,
        //och ändrar isåfall roundWon till true
        if ( playerIn === a && a === b && b === c ){
            roundWon = true;
            break;
        }
    }

    //Returnerar resultatet till checkForGameOver
    if( roundWon ) {
        return true;
    }
    else 
        return false;
    
}

//Kontrollerar om spelet slutat oavgjort
oGameData.checkForDraw = function () {

    //Kollar om gameField innehåller någon tom plats, om alla platser är ifyllda
    //tilldelas checkDraw true och funtionen returnerar true, annars returneras false
    let checkDraw = !this.gameField.includes("");

    if(checkDraw) {

        return true;
    }
    else {

        return false;
    }

}

function validateForm() {

    console.log('validateForm()');

    try {

        let nick1 = document.querySelector('#nick1');
        let nick2 = document.querySelector('#nick2');
        let color1 = document.querySelector('#color1');
        let color2 = document.querySelector('#color2');

        //Här vill vi kontrollera innehållet i alla formulärkomponenter genom att jämmföra
        //värdena i de tilldelade variablerna med villkoren som satts upp
        if( nick1.value.length < 5 ) {
            throw { elementRef : nick1 };
        }
        if( nick2.value.length < 5 ) {
            throw { elementRef : nick2 };
        }
        if( nick1.value === nick2.value ) {
            throw { elementRef : nick2 };
        }
        if( color1.value === '#ffffff' || color1.value === "#000000") {
            throw { elementRef : color1 };
        }
        if( color2.value === '#ffffff' || color2.value === '#000000') {
            throw { elementRef : color2 };
        }
        if ( color1.value === color2.value ) {
            throw { elementRef : color2 };
        }
    
        initiateGame();

        return true;
        
        
    } catch( oError ) {
        
        //Här tar vi emot och fångar undantaget + visar felmeddelande
        
        document.querySelector('#errorMsg').textContent = 'Ange ' + oError.elementRef.getAttribute('title') + '!';
        oError.elementRef.focus();

        return false;        
    }
}

function initiateGame() {

    console.log('initiateGame();');

    //Gömmer formuläret genom att tilldela det klassen d-none
    let form = document.querySelector('form');
    form.classList.add('d-none');

    //Tar fram gameArean igen genom att ta bort klassen d-none
    let gameArea = document.querySelector('#gameArea');
    gameArea.classList.remove('d-none');

    //Sätter texten i felmeddelande till tomt
    document.querySelector('#errorMsg').textContent = "";

    //Tilldelar värdet i inputarna från formuläret
    oGameData.nickNamePlayerOne = document.querySelector('#nick1').value;
    oGameData.nickNamePlayerTwo = document.querySelector('#nick2').value;
    oGameData.colorPlayerOne = document.querySelector('#color1').value;
    oGameData.colorPlayerTwo = document.querySelector('#color2').value;

    //Deklarerar en variabel som håller alla td:s 
    let gameFieldArray = document.querySelectorAll('td');

    //Loopar igenom arrayen gameFieldArray och tilldelar alla platser "", samt 
    //sätter backgrundfärgen till vit
    for( let index = 0; index < gameFieldArray.length ; index++ ) {
        gameFieldArray[index].textContent = "";
        oGameData.gameField[index] = "";
        gameFieldArray[index].style.backgroundColor = 'white';
    }

    //deklarerar variablerna playerChar och playerName
    let playerChar = null;
    let playerName = null;

    //Slumpar fram ett nummer mellan 0 och 1, som avgör vem som får börja spela
    let randomNumber = Math.random();

    //Tilldelar namn och tecken till playerChar och playerName, samt 
    //tilldelar spelaren till currentPlayer
    if( randomNumber < 0.5 ) {
        console.log(oGameData.nickNamePlayerOne);
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    }
    if( randomNumber >= 0.5 ) {
        console.log(oGameData.nickNamePlayerTwo);
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }

    console.log( oGameData.gameField );

    //Sätter h1-rubriken i jumbotronen beroende på vilken spelare som skall starta
    if ( oGameData.currentPlayer === 'X') {
        document.querySelector('.jumbotron>h1').textContent = 'Aktuell spelare är ' + oGameData.nickNamePlayerOne;
    }
    else {
        document.querySelector('.jumbotron>h1').textContent = 'Aktuell spelare är ' + oGameData.nickNamePlayerTwo;
    }

    //Lägger en lyssnare på tabellen som vid klick anropar funktionen executeGame
    document.querySelector('table').addEventListener('click', executeGame);
    //Kollar om checkboxen är ifylld, och lägger isåfall på en lyssnare som initierar funktionen timer
    //samt ställer om flaggan timerEnabled till true
    if( document.querySelector('#myCheckbox').checked ) {
        oGameData.timerEnabled = true;
        document.querySelector('table').addEventListener('click', timer);
    }
    
    
}

function executeGame ( oEvent ) {

    console.log('executeGame();');

    //Kollar om det objekt som orsakat klickhändelsen är av typen TD
    if( oEvent.target.tagName === 'TD') {
        console.log(oEvent.target.tagName);
        console.log(oEvent.target.getAttribute("data-id"));

        //Drar igång timerfunktionen om flaggan timerEnabled är true
        if( oGameData.timerEnabled ) {
            timer();
        }

        //Skapar en referens till den tabellcellen som tagits emot i funktionen
        let tableIndex = oEvent.target.getAttribute("data-id");

        //Kollar om den platsen i spelplanen som tagits emot är ledig, isåfall hoppar vi in i if-satsen och utför följande uppgifter
        if( oGameData.gameField[tableIndex] === "" ){
            console.log("Här var det tomt");
            //Registrerar tecknet från currentPlayer i arrayen gameField
            oGameData.gameField[tableIndex] = oGameData.currentPlayer;
            console.log(oGameData.gameField[tableIndex]);       

            //Följande kod genomförs om currentPlayer har tecknet 'X'
            if( oGameData.currentPlayer === "X" ) {     
                //Ändrar backgrundsfärgen i den klickade tebellcellen till vald färg för spelare 1           
                oEvent.target.style.backgroundColor = oGameData.colorPlayerOne;
                //Sätter nuvarande spelares tecken i den klickade tabellcellen
                oEvent.target.textContent = oGameData.currentPlayer;

                //Ändrar nuvarande spelare till spelare 2
                changePlayer();

                //Skapar en variabel som kan anropas om man vill kolla efter Game Over
                let checkGameOver = oGameData.checkForGameOver();
                console.log(checkGameOver);
                //Kollar efter Game Over, och beroende på resultat från funktionen checkForGameOver skickas man vidare till funktionen gameOver.
                //Så länge som checkForGameOver returnerar 0, så fortsätter spelet
                if( checkGameOver === 1) {
                    gameOver(1);
                }
                if( checkGameOver === 3) {
                    gameOver(3);
                }

            }
            else {                
                //Ändrar backgrundsfärgen i den klickade tebellcellen till vald färg för spelare 2    
                oEvent.target.style.backgroundColor = oGameData.colorPlayerTwo;
                //Sätter nuvarande spelares tecken i den klickade tabellcellen
                oEvent.target.textContent = oGameData.currentPlayer;

                //Ändrar nuvarande spelare till spelare 1
                changePlayer();

                //Skapar en variabel som kan anropas om man vill kolla efter Game Over
                let checkGameOver = oGameData.checkForGameOver();
                console.log(checkGameOver);
                //Kollar efter Game Over, och beroende på resultat från funktionen checkForGameOver skickas man vidare till funktionen gameOver.
                //Så länge som checkForGameOver returnerar 0, så fortsätter spelet
                if( checkGameOver === 2) {
                    gameOver(2);
                }
                if( checkGameOver === 3) {
                    gameOver(3);
                }

            }
        }
        else {
            console.log("Här fanns det grejer");
        }
    }
}

function timer() {

    //Varje gång timern dras igång så kollar vi om timerId är skiljt ifrån null, och
    //isåfall nollställer vi klockan
    if( oGameData.timerId !== null ) {
        clearInterval(oGameData.timerId);
        oGameData.seconds = 5;
    }

    oGameData.timerId = setInterval(function() { 

        //Räknar ner sekunderna en gång för varje intervall
        oGameData.seconds--; 
        console.log(oGameData.seconds);

        //Presenterar återstående tid på skärmen
        oGameData.timeRef.textContent = 'Tid kvar: ' + ( oGameData.seconds + 1 );

        //Om timern räknar ner till 0 så nollställs timern, vi anropar funktionen changePlayer,
        //samt anropar timerfunktionen igen för att påbörja ny nedräkning
        if( oGameData.seconds === 0 ){
        
            clearInterval(oGameData.timerId);
            oGameData.seconds = 5;
            changePlayer();
            timer();
        }

    }, 1000);

}

function changePlayer() {

    console.log('Bytt spelare');

    //Byter spelare, ställer om jumbotronen, samt nollställer timern
    if( oGameData.currentPlayer === "X" ) {
        oGameData.currentPlayer = oGameData.playerTwo;
        document.querySelector('.jumbotron>h1').textContent = 'Aktuell spelare är ' + oGameData.nickNamePlayerTwo;   
        clearInterval(oGameData.timerId);    
    }
    else {
        oGameData.currentPlayer = oGameData.playerOne;
        document.querySelector('.jumbotron>h1').textContent = 'Aktuell spelare är ' + oGameData.nickNamePlayerOne;   
        clearInterval(oGameData.timerId);
    }

}

function gameOver( result ) {
    
    //Tar bort lyssnaren från tabellen
    document.querySelector('table').removeEventListener('click', timer);

    //Deklarerar en variabel som innehåller h1 i jumbotronen
    let jumbotron = document.querySelector('.jumbotron>h1');

    //Om funktionen tar emot 1 så deklarerar h1 att spelare 1 vunnit
    if( result === 1) {
        console.log("X vann");
        jumbotron.textContent = 'Vinnare är ' + oGameData.nickNamePlayerOne + '. Spela igen?';
    }
    //Om funktionen tar emot 2 så deklarerar h1 att spelare 2 vunnit
    if( result === 2) {
        console.log("O vann");
        jumbotron.textContent = 'Vinnare är ' + oGameData.nickNamePlayerTwo + '. Spela igen?';
    }
    //Om funktionen tar emot 3 så deklarerar h1 att ingen spelare har vunnit
    if( result === 3) {
        console.log("Ingen vann");
        jumbotron.textContent = 'Partiet slutade oavgjort. Spela igen?';
    }

    //Tar bort lyssnaren från tabellen
    document.querySelector('table').removeEventListener('click', executeGame);

    //Skapar en variabel som innehåller formuläret, och använder den för att ta bort klassen 'd-none' på formuläret
    let form = document.querySelector('form');
    form.classList.remove('d-none');

    ////Skapar en variabel som innehåller gameArean, och använder den för att lägga till klassen 'd-none' på spelplanen
    let gameArea = document.querySelector('#gameArea');
    gameArea.classList.add('d-none');

    //Anropar funktionen initGlobalObjekt
    oGameData.initGlobalObject();

}