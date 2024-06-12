document.addEventListener("DOMContentLoaded", function() {
    // Selecting DOM elements
    const input = document.querySelector(".input");
    const submit = document.querySelector(".add");
    const tasksDiv = document.querySelector(".tasks");

    // Load tasks from local storage
    let arrayOfTasks = getTasksFromLocalStorage();

    // Display tasks if any are present in local storage
    if (arrayOfTasks.length > 0) {
        displayTasks(arrayOfTasks);
    }

    // Event listener for adding a new task
    submit.addEventListener("click", function() {
        if (input.value !== "") {
            createTask(input.value); // Add task and update UI
            input.value = ""; // Clear input field
        } else {
            alert("Write something you want to do");
        }
    });

    // Event listener for task interactions (delete or toggle completion)
    tasksDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            removeTask(e.target.parentElement.getAttribute("data-id")); // Remove task from array and local storage
            e.target.parentElement.remove(); // Remove task element from UI
        }
        if (e.target.classList.contains("task")) {
            toggleStatusTaskWith(e.target.getAttribute("data-id")); // Toggle task completion status
            e.target.classList.toggle("done"); // Update UI to reflect completion status
        }
    });

    // Function to create a new task
    function createTask(taskText) {
        const task = {
            id: Date.now(), // Generate unique ID based on timestamp
            title: taskText,
            completed: false,
        };
        arrayOfTasks.push(task); // Add task to array
        saveTasksToLocalStorage(arrayOfTasks); // Save updated tasks to local storage
        addTaskElement(task); // Add new task element to UI
    }

    // Function to add a task element to the UI
    function addTaskElement(task) {
        let div = document.createElement("div");
        div.className = task.completed ? "task done" : "task"; // Set class based on completion status
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        let span = document.createElement("span");
        span.className = "delete";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);

        tasksDiv.appendChild(div);
    }

    // Function to display all tasks
    function displayTasks(tasks) {
        tasks.forEach(task => addTaskElement(task)); // Add each task element to UI
    }

    // Function to save tasks to local storage
    function saveTasksToLocalStorage(tasks) {
        window.localStorage.setItem("tasks", JSON.stringify(tasks)); // Convert array to JSON string
    }

    // Function to retrieve tasks from local storage
    function getTasksFromLocalStorage() {
        const data = window.localStorage.getItem("tasks");
        return data ? JSON.parse(data) : []; // Parse JSON string to array
    }

    // Function to remove a task
    function removeTask(taskId) {
        arrayOfTasks = arrayOfTasks.filter(task => task.id != taskId); // Filter out the task by ID
        saveTasksToLocalStorage(arrayOfTasks); // Save updated tasks to local storage
    }

    // Function to toggle task completion status
    function toggleStatusTaskWith(taskId) {
        const task = arrayOfTasks.find(task => task.id == taskId);
        if (task) {
            task.completed = task.completed ? false : true; // Toggle completion status
            saveTasksToLocalStorage(arrayOfTasks); // Save updated tasks to local storage
        }
    }
});
