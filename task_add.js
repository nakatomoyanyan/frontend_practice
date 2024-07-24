import { createTaskFromDbJSON } from "./create_task_from_json.js";
let url = 'http://localhost:2000/tasks';
let taskValue = document.querySelector('.task_value');
let taskDate = document.querySelector('.task_date');
let taskImportance = document.querySelector('.task_importance');
let taskSubmit = document.querySelector('.task_submit');

async function addTaskToDbJSON(url,taskTitle,taskLimit,taskImportance) {
  let response = await fetch(url);
  let tasks = await response.json();
  let addData = JSON.stringify({
    "id": JSON.stringify(Number(tasks.at(-1).id) + 1),
    "task_title": JSON.stringify(taskTitle),
    "task_importance": JSON.stringify(taskImportance),
    "task_limit": JSON.stringify(taskLimit)
  });

  let result = await fetch(url,{
    method: "POST",
    body: addData
  })
};

createTaskFromDbJSON(url);

//追加ボタンをクリックした時の動作(タスク一覧にタスクを追加)
taskSubmit.addEventListener('click', (event) => {
  if (taskValue.value === '' || taskDate.value === '') {
    return
  }
  let taskTitle = taskValue.value;
  let taskLimit = taskDate.value;
  let taskIMportance = taskImportance.value;
  console.log(1);
  addTaskToDbJSON(url,taskTitle,taskLimit,taskIMportance);
  createTaskFromDbJSON(url);
  event.preventDefault();//reqiredの挙動を止める
  document.taskForm.reset();
});

