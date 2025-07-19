const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const deleteAllBtn = document.getElementById("delete-all");

// Modal Profile
const profileImg = document.querySelector(".profile-img");
const profileModal = document.getElementById("profile-modal");
const closeModalBtn = document.getElementById("close-modal");

profileImg.addEventListener("click", () => toggleModal(true));
closeModalBtn.addEventListener("click", () => toggleModal(false));
window.addEventListener("click", (e) => {
  if (e.target === profileModal) toggleModal(false);
});

function toggleModal(show) {
  profileModal.classList.toggle("hidden", !show);
}

// Data
let todos = [];
let dones = [];

// Load & Save Data
function loadData() {
  const saved = JSON.parse(localStorage.getItem("todoData"));
  todos = saved?.todos || [];
  dones = saved?.dones || [];
  renderLists();
}

function saveData() {
  localStorage.setItem("todoData", JSON.stringify({ todos, dones }));
}

// Render Lists
function renderLists() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  const todoItems = todos.map((item) => createTodoItem(item, false));
  const doneItems = dones.map((item) => createTodoItem(item, true));

  todoItems.forEach((li) => todoList.appendChild(li));
  doneItems.forEach((li) => doneList.appendChild(li));
}

// Create Item
function createTodoItem(item, isDone) {
  const li = document.createElement("li");
  if (isDone) li.classList.add("done");

  const header = document.createElement("div");
  header.className = "item-header";

  const priorityLabel = document.createElement("span");
  priorityLabel.className = "priority-label " + item.priority.toLowerCase();
  if (isDone) priorityLabel.classList.add("disabled-priority");
  priorityLabel.textContent = item.priority;

  const timeCreated = document.createElement("span");
  timeCreated.className = "time-created";
  timeCreated.textContent = item.createdAt;

  const deadlineSpan = document.createElement("span");
  deadlineSpan.className = "deadline";
  deadlineSpan.textContent = "Deadline: " + (item.deadline || "-");
  if (isDone) deadlineSpan.classList.add("done");

  const infoWrapper = document.createElement("div");
  infoWrapper.style.display = "flex";
  infoWrapper.style.flexDirection = "column";
  infoWrapper.style.alignItems = "flex-start";
  infoWrapper.style.gap = "4px";
  infoWrapper.appendChild(priorityLabel);
  infoWrapper.appendChild(timeCreated);

  header.appendChild(infoWrapper);
  header.appendChild(deadlineSpan);

  const content = document.createElement("div");
  content.className = "item-content";

  const taskText = document.createElement("span");
  taskText.className = "text";
  taskText.textContent = item.task;
  content.appendChild(taskText);

  if (!isDone) {
    const actions = document.createElement("div");
    actions.className = "actions";

    const checkBtn = document.createElement("button");
    checkBtn.className = "check-btn";
    checkBtn.textContent = "✔";
    checkBtn.addEventListener("click", () => markTodoAsDone(item.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✖";
    deleteBtn.addEventListener("click", () => deleteTodoById(item.id));

    actions.appendChild(checkBtn);
    actions.appendChild(deleteBtn);
    content.appendChild(actions);
  }

  li.appendChild(header);
  li.appendChild(content);

  return li;
}

// Add New Todo
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  const priority = priorityInput.value;
  const deadlineInputValue = deadlineInput.value;
  const deadline = deadlineInputValue
    ? deadlineInputValue.split("-").reverse().join("-")
    : "-";

  if (task === "") {
    alert("Mohon isi tugas terlebih dahulu");
    return;
  }

  // Setting Date
  const now = new Date();
  const createdAt = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const id = Date.now().toString();

  todos.push({ id, task, priority, deadline, createdAt });

  saveData();
  renderLists();
  form.reset();
});

// Mark Todo As Done
function markTodoAsDone(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    const item = todos.splice(index, 1)[0];
    dones.push(item);
    saveData();
    renderLists();
  }
}

// Delete Todo
function deleteTodoById(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveData();
  renderLists();
}

// Delete All
deleteAllBtn.addEventListener("click", () => {
  const confirmed = confirm("Apakah Anda yakin ingin menghapus semua tugas?");
  if (confirmed) {
    todos = [];
    dones = [];
    saveData();
    renderLists();
  }
});

// Init
loadData();
