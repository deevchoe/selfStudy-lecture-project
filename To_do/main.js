let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let menus = document.querySelectorAll(".menu-tabs a");
let mode = "all";
let taskList = [];
let filterList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function (e) {
  /*
    key down : 키를 누르는 순간
    keyup : 누른 키를 뗀 순간
  */
  /*
  if (e.keyCode == 13) {
    addTask();
  }
  */
  if (e.key === "Enter") {
    addTask();
  }
});

for (let i = 0; i < menus.length; i++) {
  menus[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(menus);

function addTask() {
  let task = {
    id: randomId(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    resultHTML += `
        <div class = "task">
            <input type="checkbox" onclick="toggleComplete('${list[i].id}')" ${
      list[i].isComplete ? "checked" : ""
    }>
            <span class="${list[i].isComplete ? "task-done" : ""}">${
      list[i].taskContent
    }</span>
<div>
<img src="images/delete.png" alt="Delete" onclick="deleteTask('${
      list[i].id
    }')" class="delete-icon"/>
</div>
        </div>
        `;
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id: ", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }

  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }

  // 필터된 리스트에서도 삭제
  for (let i = 0; i < filterList.length; i++) {
    if (filterList[i].id == id) {
      filterList.splice(i, 1);
      break;
    }
  }

  render();
}

function filter(event) {
  console.log("filter", event.target.id);
  mode = event.target.id;
  filterList = [];

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }

    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }

    render();
  }
}

function randomId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

let underLine = document.getElementById("under-line");
let menu = document.querySelectorAll("nav a");
console.log(menus);

menu.forEach((menu) =>
  menu.addEventListener("click", (e) => menusIndicator(e))
);

function menusIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px"; // 메뉴의 시작 위치
  underLine.style.width = e.currentTarget.offsetWidth + "px"; // 메뉴의 너비
  underLine.style.top =
    e.currentTarget.offsetTop +
    e.currentTarget.offsetHeight -
    underLine.offsetHeight +
    "px"; // 하단 선 바로 위로 배치
}
