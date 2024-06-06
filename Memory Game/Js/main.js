const categoryImages = {
    fruits: [
        { fruit: "pineapple", image: "pineapple.jpg" },
        { fruit: "apple", image: "apple.jpg" },
        { fruit: "banana", image: "banana.jpg" },
        { fruit: "cherry", image: "cherry.jpg" },
        { fruit: "grape", image: "grape.jpg" },
        { fruit: "orange", image: "orange.jpg" },
        { fruit: "strawberry", image: "strawberry.jpg" },
        { fruit: "watermelon", image: "watermelon.jpg" },
        { fruit: "mango", image: "mango.jpg" },
        { fruit: "kiwi", image: "kiwi.jpg" }
    ],
    animals: [
        { animal: "lion", image: "lion.jpg" },
        { animal: "tiger", image: "tiger.jpg" },
        { animal: "elephant", image: "elephant.jpg" },
        { animal: "giraffe", image: "giraffe.jpg" },
        { animal: "zebra", image: "zebra.jpg" },
        { animal: "monkey", image: "monkey.jpg" },
        { animal: "panda", image: "panda.jpg" },
        { animal: "koala", image: "koala.jpg" },
        { animal: "hippo", image: "hippo.jpg" },
        { animal: "horse", image: "horse.jpg" }
    ],
    vegetables: [
        { vegetable: "carrot", image: "carrot.jpg" },
        { vegetable: "broccoli", image: "broccoli.jpg" },
        { vegetable: "cabbage", image: "cabbage.jpg" },
        { vegetable: "potato", image: "potato.jpg" },
        { vegetable: "tomato", image: "tomato.jpg" },
        { vegetable: "onion", image: "onion.jpg" },
        { vegetable: "lettuce", image: "lettuce.jpg" },
        { vegetable: "pepper", image: "pepper.jpg" },
        { vegetable: "cucumber", image: "cucumber.jpg" },
        { vegetable: "garlic", image: "garlic.jpg" }
    ]
};


let theTries = document.querySelector(".tries span");
let message = document.querySelector(".settings p");

let startGameButton = document.querySelector("form button");


startGameButton.addEventListener("click", (e) => {
    e.preventDefault();
    let theName = document.querySelector("form input").value;
    let selectedCategory = getCategory();
    if (!theName || !selectedCategory) {
        alert("Please enter your name and select a category.");
    } else {
        document.querySelector(".startTheGame").style.display = "none";
        document.querySelector(".name span").innerHTML = theName;
        theTries.innerHTML = "0";
        shuffleTheBoxes(selectedCategory);
    }
});

let duration = 1000;

function shuffleTheBoxes(category) {
    let boxesContainer = document.querySelector('.boxesSection');
    boxesContainer.innerHTML = ''; // Clear existing boxes

    // Define an object that maps categories to their respective dataset attributes
    const categoryDataset = {
        fruits: 'fruit',
        animals: 'animal',
        vegetables: 'vegetable'
    };

    // Get the images for the selected category
    let categoryImagesArray = categoryImages[category];

    // Duplicate each category image so there are two boxes for each image
    let duplicateImagesArray = [];
    categoryImagesArray.forEach(item => {
        duplicateImagesArray.push(item);
        duplicateImagesArray.push(item);
    });

    // Shuffle the duplicate images
    duplicateImagesArray.sort(function () {
        return Math.random() - 0.5;
    });

    // Loop through each category image and create box elements accordingly
    duplicateImagesArray.forEach(item => {
        let box = document.createElement('div');
        box.className = 'aBox';

        // Set the dataset attribute based on the selected category
        box.dataset[categoryDataset[category]] = item[categoryDataset[category]];

        let front = document.createElement('div');
        front.className = 'front';
        front.textContent = '!';

        let back = document.createElement('div');
        back.className = 'back';
        let img = document.createElement('img');
        img.src = `Images/${item.image}`;
        img.alt = '';
        back.appendChild(img);

        box.appendChild(front);
        box.appendChild(back);

        boxesContainer.appendChild(box);

        // Add event listener to the newly created box
        box.addEventListener("click", () => {
            flipTheBox(box);
        });
    });

}


function flipTheBox(theBox) {
    theBox.classList.add("flipped");
    let allBoxes = document.querySelectorAll('.aBox');
    let allFlippedBoxes = Array.from(allBoxes).filter(aFlippedBox => aFlippedBox.classList.contains("flipped"));
    if (allFlippedBoxes.length === 2) {
        stopTheClicking();
        checkTheMatch(allFlippedBoxes[0], allFlippedBoxes[1], allBoxes);
    }
}

function stopTheClicking() {
    let boxexDiv = document.querySelector(".boxesSection");
    boxexDiv.classList.add("stopClicking");
    setTimeout(() => {
        boxexDiv.classList.remove("stopClicking");
    }, duration);
}

function checkTheMatch(firstBox, secondBox, allBoxes) {
    
    // Get the category
    let category = getCategory();

    // Define the dataset property based on the category
    let datasetProperty = category === 'fruits' ? 'fruit' : 
                        category === 'animals' ? 'animal' : 
                        category === 'vegetables' ? 'vegetable' : null;

    // Compare the dataset values
    let winOrLose;
    winOrLose = firstBox.dataset[datasetProperty] === secondBox.dataset[datasetProperty] ? "win" : "lose";


    if (winOrLose === "win") {
        firstBox.classList.remove("flipped");
        secondBox.classList.remove("flipped");
        firstBox.classList.add("matched");
        secondBox.classList.add("matched");
        document.getElementById("success").play();
        let allMatched = Array.from(allBoxes).every(box => box.classList.contains('matched'));
        if (allMatched) {
            endTheGame("win");
        }
    } else {
        theTries.innerHTML = parseInt(theTries.innerHTML) + 1;
        if (parseInt(theTries.innerHTML) === 10) {
            endTheGame("lose");
        }
        setTimeout(() => {
            firstBox.classList.remove("flipped");
            secondBox.classList.remove("flipped");
        }, duration);
        document.getElementById("fail").play();
    }
}

function endTheGame(winOrLose) {
    document.querySelector(".boxesSection").style.display = "none";
    document.querySelector(".startTheGame").style.display = "block";
    message.style.color = "#7a4d4d";
    if (winOrLose === "lose") {
        message.innerHTML = "Unfortunately, you didn't win this time, but don't worry! You can always try again. Give it another shot, You have 10 tries";
    } else {
        message.innerHTML = "Well done! If you're up for another challenge, feel free to try again. Remember, you have 10 tries to test your skills and see if you can triumph once more!";
    }
}

function getCategory() {
    let select = document.getElementById("categorySelect");
    return select.options[select.selectedIndex].value;
}
