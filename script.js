/*const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Check if "Enter" key is pressed
        event.preventDefault();  // Prevent the default action (form submission if any)
        addTask();  // Call the addTask function
    }
});

function addTask(){
    if (inputBox.value === ''){
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.setAttribute('contenteditable', 'true');  // Make it editable when clicked
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();*/

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add event listener for the Enter key to add tasks
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Check if "Enter" key is pressed
        event.preventDefault();  // Prevent the default action (form submission if any)
        addTask();  // Call the addTask function
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create new task (LI element)
        let li = document.createElement("li");

        // Create the circle for completion toggle
        let circle = document.createElement("div");
        circle.classList.add("circle");
        li.appendChild(circle);

        // Create the editable text span
        let textSpan = document.createElement("span");
        textSpan.setAttribute('contenteditable', 'true');
        textSpan.innerHTML = inputBox.value;
        li.appendChild(textSpan);

        // Create the close button (×)
        let spanRemove = document.createElement("span");
        spanRemove.classList.add("remove-button"); // Add the remove-button class
        spanRemove.innerHTML = "\u00d7";
        li.appendChild(spanRemove);

        // Add the new task to the list container
        listContainer.appendChild(li);

        // Event listener for the circle to toggle strikethrough (completed state)
        circle.addEventListener("click", function() {
            li.classList.toggle("checked"); // Toggle 'checked' class to apply strikethrough
            saveData(); // Save updated state to localStorage
        });

        // Event listener for close button to remove the task
        spanRemove.addEventListener("click", function() {
            li.remove();
            saveData(); // Save updated state to localStorage
        });
    }

    inputBox.value = ""; // Clear input field after adding task
    saveData(); // Save updated list state to localStorage
}

// Function to save list to localStorage
function saveData() {
    const tasks = [];
    const taskItems = listContainer.querySelectorAll("li");

    taskItems.forEach((item) => {
        const task = {
            text: item.querySelector("span").innerHTML,
            checked: item.classList.contains("checked"),
        };
        tasks.push(task);
    });

    // Save tasks array as a JSON string in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage and display them
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement("li");
            if (task.checked) {
                li.classList.add("checked");
            }

            // Create the circle for completion toggle
            let circle = document.createElement("div");
            circle.classList.add("circle");
            li.appendChild(circle);

            // Create the editable text span
            let textSpan = document.createElement("span");
            textSpan.setAttribute('contenteditable', 'true');
            textSpan.innerHTML = task.text;
            li.appendChild(textSpan);

            // Create the close button (×)
            let spanRemove = document.createElement("span");
            spanRemove.classList.add("remove-button");
            spanRemove.innerHTML = "\u00d7";
            li.appendChild(spanRemove);

            listContainer.appendChild(li);

            // Event listener for the circle to toggle strikethrough (completed state)
            circle.addEventListener("click", function() {
                li.classList.toggle("checked");
                saveData();
            });

            // Event listener for close button to remove the task
            spanRemove.addEventListener("click", function() {
                li.remove();
                saveData();
            });
        });
    }
}

// Load tasks from localStorage when the page loads
loadTasks();

