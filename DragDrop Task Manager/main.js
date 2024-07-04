document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("form input");
    const addTaskBtn = document.querySelector("form button");
    const taskLanes = document.querySelectorAll(".lane");

    let drag = null;

    // Initial load of tasks from localStorage
    loadTasks();
    // Call dragTask to initialize drag and drop functionality
    dragTask();

    // Function to load tasks from localStorage
    function loadTasks() {
        // Check if tasks exist in localStorage
        if (localStorage.getItem("tasks")) {
            const tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.forEach(task => {
                const taskElement = createTaskElement(task.content);
                const taskLane = document.querySelector(`#${task.laneId} .task-list`);
                taskLane.appendChild(taskElement);
            });
        }
    }

    // Function to create task element with delete button
    function createTaskElement(content) {
        const task = document.createElement("div");
        task.classList.add("task");
        task.draggable = true;
        task.innerHTML = `
            <span>${content}</span>
            <button class="delete-btn">Delete</button>
        `;
        task.querySelector(".delete-btn").addEventListener("click", () => {
            task.remove();
            saveTasks();
        });
        return task;
    }

    // Event listener for adding a new task
    addTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!input.value.trim()) return;
        const theTask = input.value.trim();

        const taskElement = createTaskElement(theTask);
        const toDoList = document.querySelector("#todo-lane .task-list");
        toDoList.appendChild(taskElement);
        dragTask();
        saveTasks();

        input.value = "";
    });

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskLanes.forEach(lane => {
            const laneId = lane.id;
            const taskList = lane.querySelectorAll(".task-list .task span");
            taskList.forEach(taskSpan => {
                tasks.push({
                    content: taskSpan.textContent.trim(),
                    laneId: laneId
                });
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to handle drag and drop functionality
    function dragTask() {
        const allTasks = document.querySelectorAll(".task");

        allTasks.forEach(task => {
            task.addEventListener("dragstart", function() {
                drag = task;
                task.style.opacity = "0.4";
            });

            task.addEventListener("dragend", function() {
                drag = null;
                task.style.opacity = "1";
            });

            taskLanes.forEach(box => {
                box.addEventListener("dragover", function(e) {
                    e.preventDefault();
                    box.style.background = "#38598b";
                });

                box.addEventListener("dragleave", function() {
                    box.style.background = "";
                });

                box.addEventListener("drop", function() {
                    box.style.background = "";
                    const taskList = box.querySelector(".task-list");
                    taskList.appendChild(drag);
                    saveTasks();
                });
            });
        });
    }

    // Event listener for delete buttons
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.remove();
            saveTasks();
        });
    });


    const deleteAllBtn = document.querySelector('.delete-all');
    deleteAllBtn.addEventListener('click', () => {
        const taskLists = document.querySelectorAll('.task-list');
        taskLists.forEach(taskList => {
            taskList.innerHTML = ''; // Clear all tasks
        });

        localStorage.removeItem("tasks"); // Remove tasks from localStorage

    });



});
