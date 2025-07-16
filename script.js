const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const deleteAllBtn = document.getElementById("delete-all");
const timeDisplay = document.getElementById("time");

function updateTime() {
  const now = new Date();
  timeDisplay.textContent = "Waktu: " + now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;

  if (task === "") return;

  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.className = "text";
  taskText.innerHTML = `[${priority.toUpperCase()}] ${task} <span class="deadline">Deadline: ${
    deadline || "-"
  }</span>`;

  const actions = document.createElement("div");
  actions.className = "actions";

  const checkBtn = document.createElement("button");
  checkBtn.className = "check-btn";
  checkBtn.textContent = "✔";
  checkBtn.onclick = () => {
    li.classList.add("done");
    doneList.appendChild(li);
    actions.remove(); // remove buttons after done
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "✖";
  deleteBtn.onclick = () => li.remove();

  actions.appendChild(checkBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskText);
  li.appendChild(actions);
  todoList.appendChild(li);

  // reset form
  form.reset();
});

deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
});
