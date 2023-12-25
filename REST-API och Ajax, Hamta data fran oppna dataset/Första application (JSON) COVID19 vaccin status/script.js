'use strict'

//lägga till en lyssnare när hela sidan laddad
window.addEventListener('load', function () {

    let search_input = document.querySelector('#search'); //hämta value som finns i input som användare har angett
    let tbody = document.querySelector('#tbody'); //hämta value som finns i tbody och den är töm just nu
    let search_button = document.querySelector('button'); //hämta button knapp och och lägga till en lyssnare på den vid klick 

    search_button.addEventListener('click', function(event) {
        console.log("Search button clicked");    
        search(search_input.value,tbody); //main funktion som skickas input value och tbody som parameter 
    });
  });

function search(search_input_value,table_body) {

    console.log("I search funktion");
    table_body.innerHTML = ''; //tömma tbody element för att man kan söka annat land om hen vill

    //anrop till angiven url för att hämta vaccination information till land som användare har angett i förra steget 
    window.fetch('https://covid-api.mmediagroup.fr/v1/vaccines?country=' + encodeURIComponent(search_input_value))
    .then(function(response) {    //fetch anrop retunerar promis objekt som fullbordas med response objekt
                                  //och then betyder om jag får godkänd svar från fetch
        return response.json();   //hämta json delen av response
    }).then(function(data) {
        console.log(data);

        let row = document.createElement('tr'); //skapa en row och lägga till denna row i tbody
        table_body.appendChild(row);

        let population = document.createElement('td'); //skapa en cell och lägga till denna td i row som jag skapade i förra steg
        population.textContent = data.All.population; //hämta population från json data och tilldelar den i denna td
        row.appendChild(population);
        console.log(data.All.population);

        let life_expectancy = document.createElement('td'); //skapa en cell och lägga till denna td i row som jag skapade i förra steg
        life_expectancy.textContent = data.All.life_expectancy; //hämta life expevtancy från json data och tilldelar den i denna td
        row.appendChild(life_expectancy);
        console.log(data.All.life_expectancy);

        let administered = document.createElement('td'); //skapa en cell och lägga till denna td i row som jag skapade i förra steg
        administered.textContent = data.All.administered; //hämta administered från json data och tilldelar den i denna td
        row.appendChild(administered);
        console.log(data.All.administered);
        
        let people_vuc = document.createElement('td'); //skapa en cell och lägga till denna td i row som jag skapade i förra steg
        people_vuc.textContent = data.All.people_vaccinated; //hämta hur många männiksor har vaccinerade från json data och tilldelar den i denna td
        row.appendChild(people_vuc);
        console.log(data.All.people_vaccinated);  

        let people_part_vuc = document.createElement('td'); //skapa en cell och lägga till denna td i row som jag skapade i förra steg
        people_part_vuc.textContent = data.All.people_partially_vaccinated; //hämta hur många männiksor har delvis vaccinerat från json data och tilldelar den i denna td
        row.appendChild(people_part_vuc);
        console.log(data.All.people_partially_vaccinated);  

        let update = document.createElement('td'); //skapa en cell och lägga till denna td i row som jag skapade i förra steg
        update.textContent = data.All.updated; //hämta senaste uppdatering av vaccination i detta land som användern har angett från json data och tilldelar den i denna td
        row.appendChild(update);
        console.log(data.All.updated);  
    })
} 
  
 