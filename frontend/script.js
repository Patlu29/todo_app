const apiBaseUrl = "http://localhost:5000/tasks";

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

const fetchTasks = async () => {
    const response = await fetch(apiBaseUrl);
    const tasks = await response.json();
    taskList.innerHTML = tasks
        .map(
            (task) =>
                `<li class="task">
                    ${task.name} 
                    <button onclick="deleteTask('${task._id}')">Delete</button>
                </li>`
        )
        .join("");
};

const addTask = async () => {
    const newTask = { name: taskInput.value };
    await fetch(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
    });
    taskInput.value = "";
    fetchTasks();
};

const deleteTask = async (id) => {
    await fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" });
    fetchTasks();
};

addTaskButton.addEventListener("click", addTask);
fetchTasks();
