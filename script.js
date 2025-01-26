// Run the script after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        // Retrieve tasks from Local Storage (or an empty array if no tasks are found)
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Iterate over the stored tasks and create DOM elements for each
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents saving to avoid duplication
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Add an event listener to remove the task
        removeButton.onclick = () => {
            // Remove the task from the DOM
            taskList.removeChild(listItem);

            // Update Local Storage by removing the task
            removeTaskFromLocalStorage(taskText);
        };

        // Append the button to the list item and the list item to the task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save the task to Local Storage (if specified)
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        // Retrieve existing tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Add the new task to the array
        storedTasks.push(taskText);

        // Save the updated array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        // Retrieve existing tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Filter out the task to be removed
        const updatedTasks = storedTasks.filter(task => task !== taskText);

        // Save the updated array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add task when "Add Task" button is clicked
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        // Validate input
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        addTask(taskText); // Add task to the DOM and Local Storage
        taskInput.value = ""; // Clear the input field
    });

    // Add task when "Enter" key is pressed
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();

            // Validate input
            if (taskText === "") {
                alert("Please enter a task!");
                return;
            }

            addTask(taskText); // Add task to the DOM and Local Storage
            taskInput.value = ""; // Clear the input field
        }
    });
});

