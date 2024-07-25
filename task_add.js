import { createTaskFromDbJSON } from "./create_task_from_json.js";
let url = 'http://localhost:2000/tasks';
let taskValue = document.querySelector('.task_value');
let taskDate = document.querySelector('.task_date');
let taskImportance = document.querySelector('.task_importance');
let taskSubmit = document.querySelector('.task_submit');
let taskList = document.querySelector('.task_list');
let sort_by_importance = document.querySelector('.sort_by_importance');

function addCompleteEvent(newTask){
  let completeButton = newTask.querySelector('.complete');
  let notCompleteButton = newTask.querySelector('.not_complete');
  completeButton.addEventListener('click',()=>{
    completeButton.classList.add('hidden_button');
    notCompleteButton.classList.remove('hidden_button');
    newTask.classList.toggle('is_complete');
  })
}

function addNotCompleteEvent(newTask){
  let completeButton = newTask.querySelector('.complete');
  let notCompleteButton = newTask.querySelector('.not_complete');
  notCompleteButton.addEventListener('click',()=>{
    notCompleteButton.classList.add('hidden_button');
    completeButton.classList.remove('hidden_button');
    newTask.classList.toggle('is_complete');
  })
}

function addRemoveEvent(newTask){
  let removeButton = newTask.querySelector('.remove');
  removeButton.addEventListener('click', () => {
    if (window.confirm('本当に削除しますか？')) {
      taskList.removeChild(newTask);
      removeTaskFromDbJSON(url,newTask);
  }});
}

async function removeTaskFromDbJSON(url,newTask) {
  let removeTaskID = newTask.id;
  let deleteTaskURL = url + '/' + removeTaskID;
  let result = await fetch(deleteTaskURL,{
    method: "DELETE",
  })
};

async function addTaskToDbJSON(url,taskTitle,taskLimit,taskImportance) {
  let response = await fetch(url);
  let tasks = await response.json();
  let taskImportanceValue = 0;
  if (taskImportance === "高"){
    taskImportanceValue = 3;
  }else if(taskImportance === "中"){
    taskImportanceValue = 2;
  }else{
    taskImportanceValue = 1;
  };
  let addData = JSON.stringify({
    "id": JSON.stringify(Number(tasks.at(-1).id) + 1),
    "task_title": taskTitle,
    "task_importance": taskImportance,
    "task_importance_value": JSON.stringify(taskImportanceValue),
    "task_limit": taskLimit
  });

  let result = await fetch(url,{
    method: "POST",
    body: addData
  })
};

async function sortTaskByASC(url) {
  let response = await fetch(url);
  let tasks = await response.json();
  tasks = _.orderBy(tasks,["task_importance_value","task_limit"],["asc","asc"]);
  taskList.innerHTML = '';
  for (let task of tasks){
    let newTask = document.createElement('div');
    newTask.classList.add('newtask'); //クラス名を追加
    newTask.id = task.id;
    taskList.appendChild(newTask);
    //タスクの中身を追加
    newTask.innerHTML = `
        <p class="task_value">${task['task_title']}</p>
        <p>期限日:${task['task_limit']}</p>
        <p>優先度:${task['task_importance']}</p>
        <button class="complete">完了にする</button>
        <button class="not_complete hidden_button">元に戻す</button>
        <button class="remove">削除する</button>
    `;
    addCompleteEvent(newTask);
    addNotCompleteEvent(newTask);
    addRemoveEvent(newTask);
  }
}

async function sortTaskByDESC(url) {
  let response = await fetch(url);
  let tasks = await response.json();
  tasks = _.orderBy(tasks,["task_importance_value","task_limit"],["desc","asc"]);

  taskList.innerHTML = '';
  for (let task of tasks){
    let newTask = document.createElement('div');
    newTask.classList.add('newtask'); //クラス名を追加
    newTask.id = task.id;
    taskList.appendChild(newTask);
    //タスクの中身を追加
    newTask.innerHTML = `
        <p class="task_value">${task['task_title']}</p>
        <p>期限日:${task['task_limit']}</p>
        <p>優先度:${task['task_importance']}</p>
        <button class="complete">完了にする</button>
        <button class="not_complete hidden_button">元に戻す</button>
        <button class="remove">削除する</button>
    `;
    addCompleteEvent(newTask);
    addNotCompleteEvent(newTask);
    addRemoveEvent(newTask);
  }
}

createTaskFromDbJSON(url);

//追加ボタンをクリックした時の動作(タスク一覧にタスクを追加)
taskSubmit.addEventListener('click', (event) => {
  if (taskValue.value === '' || taskDate.value === '') {
    return
  }
  let taskTitle = taskValue.value;
  let taskLimit = taskDate.value;
  let taskIMportance = taskImportance.value;
  addTaskToDbJSON(url,taskTitle,taskLimit,taskIMportance);
  createTaskFromDbJSON(url);
  event.preventDefault();//reqiredの挙動を止める
  document.taskForm.reset();
});
sort_by_importance.addEventListener('change', (event) => {
 if (event.target.value === 'desc'){
  sortTaskByDESC(url);
 }else{
  sortTaskByASC(url);
 };
});
