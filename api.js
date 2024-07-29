const taskList = document.querySelector('.task_list');
const ENDPOINT_URL = 'http://localhost:2000/tasks';

function addCompleteEvent(newTask){
  const completeButton = newTask.querySelector('.complete');
  const notCompleteButton = newTask.querySelector('.not_complete');
  completeButton.addEventListener('click',()=>{
    completeButton.classList.add('hidden_button');
    notCompleteButton.classList.remove('hidden_button');
    newTask.classList.toggle('is_complete');
  })
};
  
function addNotCompleteEvent(newTask){
  const completeButton = newTask.querySelector('.complete');
  const notCompleteButton = newTask.querySelector('.not_complete');
  notCompleteButton.addEventListener('click',()=>{
    notCompleteButton.classList.add('hidden_button');
    completeButton.classList.remove('hidden_button');
    newTask.classList.toggle('is_complete');
  })
};
  
function addRemoveEvent(newTask){
  const removeButton = newTask.querySelector('.remove');
  removeButton.addEventListener('click', () => {
    if (window.confirm('本当に削除しますか？')) {
      taskList.removeChild(newTask);
      removeTaskFromDbJSON(ENDPOINT_URL,newTask);
  }});
};

async function removeTaskFromDbJSON(ENDPOINT_URL,newTask) {
  const removeTaskID = newTask.id;
  const deleteTaskURL = ENDPOINT_URL + '/' + removeTaskID;
  const result = await fetch(deleteTaskURL,{method: "DELETE"});
  if (!result.ok) {
    throw new Error(`HTTP error! status: ${result.status}`);
  }
  return;
};

async function createTaskFromDbJSON() {
  const response = await fetch(ENDPOINT_URL);
  let tasks = await response.json();
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
  };
};

async function addTaskToDbJSON(taskTitle,taskLimit,taskImportance) {
  const response = await fetch(ENDPOINT_URL);
  const tasks = await response.json();
  let taskImportanceValue = 0;
  if (taskImportance === "高"){
    taskImportanceValue = 3;
  }else if(taskImportance === "中"){
    taskImportanceValue = 2;
  }else{
    taskImportanceValue = 1;
  };
  const addData = JSON.stringify({
    "id": JSON.stringify(Number(tasks.at(-1).id) + 1),
    "task_title": taskTitle,
    "task_importance": taskImportance,
    "task_importance_value": JSON.stringify(taskImportanceValue),
    "task_limit": taskLimit
  });
  const result = await fetch(ENDPOINT_URL,{method: "POST",body: addData});
  if (!result.ok) {
    throw new Error(`HTTP error! status: ${result.status}`);
  }
  return;
};

async function sortTaskByASC() {
  const response = await fetch(ENDPOINT_URL);
  let tasks = await response.json();
  tasks = _.orderBy(tasks,["task_importance_value","task_limit"],["asc","asc"]);
  for (let task of tasks){
    taskList.appendChild(taskList.removeChild(document.getElementById(`${task.id}`)));
  };
};

async function sortTaskByDESC() {
  const response = await fetch(ENDPOINT_URL);
  let tasks = await response.json();
  tasks = _.orderBy(tasks,["task_importance_value","task_limit"],["desc","asc"]);
  for (let task of tasks){
    taskList.appendChild(taskList.removeChild(document.getElementById(`${task.id}`)));
  };
};

export {createTaskFromDbJSON, removeTaskFromDbJSON, addTaskToDbJSON, sortTaskByASC, sortTaskByDESC};
