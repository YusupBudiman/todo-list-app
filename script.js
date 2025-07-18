const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const deleteAllBtn = document.getElementById("delete-all");

function saveData() {
  localStorage.setItem("todoData", todoList.innerHTML);
  localStorage.setItem("doneData", doneList.innerHTML);
}

function loadData() {
  todoList.innerHTML = localStorage.getItem("todoData") || "";
  doneList.innerHTML = localStorage.getItem("doneData") || "";

  document.querySelectorAll(".check-btn").forEach((btn) => {
    btn.onclick = moveToDone;
  });
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = deleteItem;
  });
}

function createTodoItem(task, priority, deadline) {
  const li = document.createElement("li");

  const header = document.createElement("div");
  header.className = "item-header";

  const priorityLabel = document.createElement("span");
  priorityLabel.className = "priority-label " + priority.toLowerCase();
  priorityLabel.textContent = priority;

  const timeCreated = document.createElement("span");
  timeCreated.className = "time-created";
  const now = new Date();
  timeCreated.textContent = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const deadlineSpan = document.createElement("span");
  deadlineSpan.className = "deadline";
  deadlineSpan.textContent = deadline ? `Deadline: ${deadline}` : "Deadline: -";

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
  taskText.textContent = task;

  const actions = document.createElement("div");
  actions.className = "actions";

  const checkBtn = document.createElement("button");
  checkBtn.className = "check-btn";
  checkBtn.textContent = "✔";
  checkBtn.onclick = moveToDone;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "✖";
  deleteBtn.onclick = deleteItem;

  actions.appendChild(checkBtn);
  actions.appendChild(deleteBtn);

  content.appendChild(taskText);
  content.appendChild(actions);

  li.appendChild(header);
  li.appendChild(content);

  return li;
}

function moveToDone(event) {
  const li = event.target.closest("li");
  li.classList.add("done");
  li.querySelector(".deadline").classList.add("done");
  li.querySelector(".priority-label").classList.add("disabled-priority");
  li.querySelector(".actions").remove();
  doneList.appendChild(li);
  saveData();
}

function deleteItem(event) {
  const li = event.target.closest("li");
  li.remove();
  saveData();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;

  if (task === "") {
    alert("Mohon isi tugas terlebih dahulu");
    return;
  }

  const li = createTodoItem(task, priority, deadline);
  todoList.appendChild(li);

  saveData();
  form.reset();
});

deleteAllBtn.addEventListener("click", () => {
  const confirmed = confirm("Apakah Anda yakin ingin menghapus semua tugas?");
  if (confirmed) {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    saveData();
  }
});

loadData();

// Modal Profile Logic
const profileImg = document.querySelector(".profile-img");
const profileModal = document.getElementById("profile-modal");
const closeModalBtn = document.getElementById("close-modal");

profileImg.addEventListener("click", () => {
  profileModal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  profileModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === profileModal) {
    profileModal.classList.add("hidden");
  }
});
