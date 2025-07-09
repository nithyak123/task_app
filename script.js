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
const priorityInput = document.getElementById("priority-input");

// Add event listener for the Enter key to add tasks
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Check if "Enter" key is pressed
        event.preventDefault();  // Prevent the default action (form submission if any)
        addTask();  // Call the addTask function
    }
});
priorityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Check if "Enter" key is pressed
        event.preventDefault();  // Prevent the default action (form submission if any)
        addTask();  // Call the addTask function
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        const taskText = inputBox.value;
        const taskPriority = parseInt(priorityInput.value); // Get priority as an integer

        //validate priority
        if (isNaN(taskPriority) || taskPriority < 1 || taskPriority > 10) {
            alert("Please enter a priority number between 1 and 10.");
            return; //stop function if validation fails
        }

        //use a helper function to create the task element
        const newTaskElement = createTaskElement(taskText, false, taskPriority);
        listContainer.appendChild(newTaskElement);
    }

    inputBox.value = ""; //clear task input field
    saveData(); //save updated list state to localStorage
}

function createTaskElement (taskText, isChecked, taskPriority){
    let li = document.createElement("li");
    if (isChecked) {
        li.classList.add("checked");
    }
    let circle = document.createElement("div");
    circle.classList.add("circle");
    li.appendChild(circle);

    let textSpan = document.createElement("span");
    textSpan.setAttribute('contenteditable','true');
    textSpan.innerHTML = taskText;
    li.appendChild(textSpan);

    let priorityBadge = document.createElement("span");
    priorityBadge.classList.add("priority-badge");
    priorityBadge.innerHTML = taskPriority;
    if (taskPriority >= 4){
        priorityBadge.classList.add("low");
    }
    else if (taskPriority >= 2){
        priorityBadge.classList.add("medium");
    }
    else {
        priorityBadge.classList.add("high");
    }
    li.appendChild(priorityBadge);

    let spanRemove = document.createElement("span");
    spanRemove.classList.add("remove-button");
    spanRemove.innerHTML = "\u00d7";
    li.appendChild(spanRemove);

    return li;
}

listContainer.addEventListener("click", function(e) {
    const clickedElement = e.target;
    const listItem = clickedElement.closest("li"); //find the parent LI

    if (!listItem) return; //if clicked outside an LI, do nothing

    if (clickedElement.classList.contains("circle")) {
        listItem.classList.toggle("checked");
        saveData();
    } else if (clickedElement.classList.contains("remove-button")) {
        listItem.remove();
        saveData();
    }
});

// Function to save list to localStorage
function saveData() {
    const tasks = [];
    const taskItems = listContainer.querySelectorAll("li");

    taskItems.forEach((item) => {
        const task = {
            text: item.querySelector("span").innerHTML,
            checked: item.classList.contains("checked"),
            priority: parseInt(item.querySelector(".priority-badge").innerHTML)
        };
        tasks.push(task);
    });

    // Save tasks array as a JSON string in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage and display them
/*function loadTasks() {
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
}*/
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        tasks.forEach(task => {
            // Use the new helper function to create and append the task element
            const taskElement = createTaskElement(task.text, task.checked, task.priority);
            listContainer.appendChild(taskElement);
        });
    }
}

// Load tasks from localStorage when the page loads
loadTasks();
