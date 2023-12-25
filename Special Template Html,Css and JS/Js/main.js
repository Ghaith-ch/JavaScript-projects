// Check if there's a color option in local storage
let mainColor = localStorage.getItem("theColor");

// If there's a color item in local storage
if (mainColor !== null) {

  // Set the stored color as the main color on the root element
  document.documentElement.style.setProperty('--main-color', mainColor);

  // Remove the active class from all color list items
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");

    // Add the active class to the element with data-color matching the local storage item
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  })
}


// Random background option variable
let backgroundOption = true;

// Variable to control the background interval
let backgroundInterval;

// Check if there's a local storage item for random background
let backgroundLocalItem = localStorage.getItem("theBackgroundOption");

// Check if the random background local storage is not empty
if (backgroundLocalItem !== null) {

  // Remove the active class from all spans
  document.querySelectorAll(".random-back span").forEach(element => {
    element.classList.remove("active");
  });

  // Update the background option based on the local storage value
  if (backgroundLocalItem === 'true') {
    backgroundOption = true;
    document.querySelector(".random-back .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-back .no").classList.add("active");
  }
}



// Click event listener for toggling settings gear
document.querySelector(".toggle-setting .fa-gear").addEventListener("click",function(e){

    // Toggle the 'fa-spin' class for rotation on the gear icon
    this.classList.toggle("fa-spin"); 

    // Toggle the 'open' class on the main settings box
    document.querySelector(".setting-box").classList.toggle("open");
}); 




// Select color list items
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop through all list items
colorsLi.forEach(li => {
  // Click event listener for each list item
  li.addEventListener("click", (e) => {

    // Set the selected color on the root element
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // Save the selected color to local storage
    localStorage.setItem("theColor", e.target.dataset.color);

    fixActiveClass(e);

  });
});




// Switch random background option elements
const randomBackEl = document.querySelectorAll(".random-back span");

// Loop through all spans
randomBackEl.forEach(span => {

  // Click event listener for each span
  span.addEventListener("click", (e) => {

      fixActiveClass(e);

      // Update background option and localStorage based on the clicked span's data-background value
      if (e.target.dataset.background === 'yes') {
        backgroundOption = true;
        randomizeImgs();
        localStorage.setItem("theBackgroundOption", true);
      } else {
        backgroundOption = false;
        clearInterval(backgroundInterval);
        localStorage.setItem("theBackgroundOption", false);
      }
  });
});




// Select the landing page element
let landingPage  = document.querySelector(".landing-page");

// Array containing the image file names
let imageArray  = ["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg"];

// Function to randomize images
function randomizeImgs() {

  // Check if the random background option is enabled
  if (backgroundOption === true) {

    // Set an interval to change the background image
    backgroundInterval = setInterval(() => {

    // Get Random Number
    let randomNumber = Math.floor(Math.random() * imageArray.length);
  
    // Change Background Image Url 
    landingPage.style.backgroundImage = 'url("Images/' + imageArray[randomNumber] + '")';
  
    }, 5000);
  }
}

// Call the function to initially randomize images
randomizeImgs();





// Select the skills section
let ourSkills = document.querySelector(".skills");

window.addEventListener("scroll",()=> {

  // Get the offset top of the skills section
  let skillsOffsetTop = ourSkills.offsetTop;

  // Get the outer height of the skills section
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Get the height of the window
  let windowHeight = this.innerHeight;

  // Get the scroll position of the window
  let windowScrollTop = this.scrollY;

  // Check if the window scroll position is within the skills section
  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

  // Select all skills progress spans
  let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

  allSkills.forEach(skill => {
      // Set the width of each skill progress span based on the data-progress attribute  
      skill.style.width = skill.dataset.progress;
    });
  }

});




// Create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

// Loop through all gallery images
ourGallery.forEach(img => {

  // Click event listener for each image
  img.addEventListener('click', (e) => {

    // Create overlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = 'popup-overlay';

    // append overlay to the body
    document.body.appendChild(overlay);

    // Create the popup box
    let popupBox = document.createElement("div");

    // Add class to the popup box
    popupBox.className = 'popup-box';

    // Check if the image has an alt attribute
    if (img.alt !== null) {

      // Create heading
      let imgHeading = document.createElement("h3");

      // Create text for heading
      let imgText = document.createTextNode(img.alt);

      // Append the text to the heading
      imgHeading.appendChild(imgText);

      // Append the heading to the popup box
      popupBox.appendChild(imgHeading);

    }

    // Create the image
    let popupImage = document.createElement("img");

    // Set image source
    popupImage.src = img.src;

    // Add image to popup box
    popupBox.appendChild(popupImage);

    // Append the popup box to body
    document.body.appendChild(popupBox);

    // Create the close span
    let closeButton = document.createElement("span");

    // Create the close button text
    let closeButtonText = document.createTextNode("X");

    // Append text to close button
    closeButton.appendChild(closeButtonText);

    // Add class to close button
    closeButton.className = 'close-button';

    // Add close button to the popup box
    popupBox.appendChild(closeButton);

  });

});


// Close Popup
document.addEventListener("click", function (e) {

  if (e.target.className == 'close-button') {
    // Remove The Current Popup
    e.target.parentNode.remove();
    
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//Select all bullets
let allBullets =document.querySelectorAll(".nav-bullets .bullet");

//Select all Links
let allLinks =document.querySelectorAll("header a");


function scrollToTheSection(elements){
  
  elements.forEach(element =>{

    element.addEventListener("click", (e)=> {
  
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
  
    });
  });
}


scrollToTheSection (allBullets);
scrollToTheSection (allLinks);


//function to fix active class state
function fixActiveClass (event){

      // Remove the active class from all children of the parent element
      event.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
      });
      // Add the active class to the clicked span
      event.target.classList.add("active");
}

//show and hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsDiv= document.querySelector(".nav-bullets");

let bulletsLocalItem= localStorage.getItem("bullets-option");

if(bulletsLocalItem !== null) {

  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  });
}

if (bulletsLocalItem === null || bulletsLocalItem ==="block"){

  bulletsDiv.style.display = "block"
  document.querySelector(".bullets-option .yes").classList.add("active")

}else {
  bulletsDiv.style.display = "none"
  document.querySelector(".bullets-option .no").classList.add("active")
}

bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "block") {
      bulletsDiv.style.display = "block"
      localStorage.setItem("bullets-option","block");

    }else{
      bulletsDiv.style.display = "none"
      localStorage.setItem("bullets-option","none");
    }

    fixActiveClass(e);

  });
});

//reset options 
document.querySelector(".reset-options").addEventListener("click", () => {
  //localStorage.clear()
  localStorage.removeItem("theColor");
  localStorage.removeItem("theBackgroundOption");
  localStorage.removeItem("bullets-option");

  //reload the window
  window.location.reload();

})



//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");

let theLinks = document.querySelector(".links-container ul");

toggleBtn.addEventListener("click", function(e){

  //stop proagation
  e.stopPropagation();

  this.classList.toggle("menu-aktive");
  theLinks.classList.toggle("open");
});


//click anywhere outside menu and toggle button

document.addEventListener("click",(e)=>{

  if (e.target !== toggleBtn && e.target !== theLinks){

    //check if the menu is open
    if(theLinks.classList.contains("open")){
      
      toggleBtn.classList.toggle("menu-aktive");
      theLinks.classList.toggle("open");

    }

  }
});

//stop proagation on menu
theLinks.addEventListener("click", function(e){

  e.stopPropagation();
});