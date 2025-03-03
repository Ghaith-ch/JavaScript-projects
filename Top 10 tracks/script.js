'use strict'

//lägga till en lyssnare när hela sidan laddad
window.addEventListener('load', function () {  

    //hämta button knapp och och lägga till en lyssnare på den vid klick 
    let search_button = document.querySelector('button'); 
    search_button.addEventListener('click', function(event) {
        console.log("buttoun clicked");   
        
        //hämta value som finns i select som användaren har valt för att skicka den sedan i fetch anrop   
        let select_value = document.querySelector('#select').value;      
        console.log(select_value);

        //anrop till angiven url för att hämta tracks till artist som användare har valt i förra steget 
        window.fetch('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + encodeURIComponent(select_value)+ '&api_key=e2281d3a7af1724cfeec91c61686a560')
        .then(function(response) {      //fetch anrop retunerar promis objekt som fullbordas med response objekt
                                        //och then betyder om jag får godkänd svar från fetch
            return response.text();     //vi får bodyn i svaret som en sträng (vi har nu alltså en text fil)
        })
        .then(main_f);
    });
  });

function main_f(xmlString) {
    console.log("kommer till main funktion"); 
    let ul=document.querySelector('ul'); //hämta ul element och tömma den för att man kan göra select till annan artist
    ul.innerHTML = '';

    let parser = new window.DOMParser(); 
    let xmlDOM = parser.parseFromString(xmlString,'application/xml'); // parsa den text fil som jag fick i förra steg till DOM objekt

    let tracks=xmlDOM.querySelectorAll('track'); //hämta all tracks element genom att använda querySelectorAll och tilldelar dem till en variabel
    for(let i=0;i<10;i++) { // jag vill ha bara de första 10 tracks så jag gör loop med 10 varv

       let track_name = tracks[i].querySelector('name').textContent; //hämta tracks name och tilldelar den till en variabel
       let track_playcount = tracks[i].querySelector('playcount').textContent; //hämta tracks playcount och tilldelar den till en variabel
       let track_listeners = tracks[i].querySelector('listeners').textContent; //hämta tracks listeners och tilldelar den till en variabel
       let track_url = tracks[i].querySelector('url').textContent; //hämta tracks länk och tilldelar den till en variabel

       let li = document.createElement('li'); //skapa li element med lite ccs egenskaper och lägga till denna li i sist inom ul element
       li.classList.add('list-group-item');
       li.style.backgroundColor="#222";
       li.style.color="#8ADB8A";
       li.style.borderColor="#8ADB8A";
       ul.appendChild(li);

       let name = document.createElement('h5'); //skapa h5 och tilldelar i den tracks name som hämtade i rad 36
       name.textContent="Name of track: " +track_name;
       li.appendChild(name) ; //lägga till denna h5 till li

       let playcount = document.createElement('p'); //skapa p och tilldelar i den tracks playcount som hämtade i rad 37
       playcount.textContent="Playcount: " +track_playcount;
       li.appendChild(playcount); //lägga till denna p till li

       let listeners = document.createElement('p'); //skapa p och tilldelar i den tracks listeners som hämtade i rad 38
       listeners.textContent="Listeners: " +track_listeners;
       li.appendChild(listeners); //lägga till denna p till li

       let link_p = document.createElement('p'); //skapa p som innehåller vanlig text 
       link_p.textContent="If you want to listen to the track press on the link below" ;
       li.appendChild(link_p); //lägga till denna p till li

       let url = document.createElement('a'); //skapa länk elemlent och tilldelar i den tracks url som hämtade i rad 39
       url.textContent= track_url;
       url.href = track_url;
       url.target ="_blank";
       url.style.color="#8ADB8A";
       li.appendChild(url); //lägga till denna link till li
    }
}
