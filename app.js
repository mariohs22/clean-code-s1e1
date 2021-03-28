let taskInput = document.getElementById("new-task-input");
let addButton = document.getElementById("new-task-button-add");
let incompleteTaskHolder = document.getElementById("tasks-todo");
let completedTasksHolder = document.getElementById("tasks-completed");


//New task list item
let createNewTaskElement = function(taskString) {
  let listItem = document.createElement("li");

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "input-checkbox";

  let label = document.createElement("label");
  label.innerText = taskString;

  let editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "input-text";

  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "button-edit";

  let removeButton = document.createElement("button");
  removeButton.className = "button-remove";
  let removeButtonImg = document.createElement("img");
  removeButtonImg.src = "./remove.svg";
  removeButton.appendChild(removeButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(removeButton);
  return listItem;
}


let addTask = function() {
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}


//Edit an existing task.
let editTask = function() {
  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".input-text");
  let label = listItem.querySelector("label");
  let editBtn = listItem.querySelector(".button-edit");

  if (listItem.classList.contains("task-edit")) {
      label.innerText = editInput.value;
      editBtn.innerText = "Edit";
  }else{
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
  }
  listItem.classList.toggle("task-edit");
};


//Remove task.
let removeTask = function() {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
}


//Mark task completed
let taskCompleted = function() {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


let taskIncomplete = function() {
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}


let ajaxRequest = function() {
  console.log("AJAX Request");
}


addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


let bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector(".input-checkbox");
  let editButton = taskListItem.querySelector(".button-edit");
  let removeButton = taskListItem.querySelector(".button-remove");

  editButton.onclick = editTask;
  removeButton.onclick = removeTask;
  checkBox.onchange = checkBoxEventHandler;
}


for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}