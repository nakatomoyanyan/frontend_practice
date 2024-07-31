import { getTasksAPI, postTasksAPI, deleteTasksAPI } from './api.js';
const taskValue = document.querySelector('.task_value');
const taskDate = document.querySelector('.task_date');
const taskImportance = document.querySelector('.task_importance');
const taskSubmit = document.querySelector('.task_submit');
const taskList = document.querySelector('.task_list');
const sort_by_importance = document.querySelector('.sort_by_importance');

function addCompleteEvent(newTask) {
  const completeButton = newTask.querySelector('.complete');
  const notCompleteButton = newTask.querySelector('.not_complete');
  completeButton.addEventListener('click', () => {
    completeButton.classList.add('hidden_button');
    notCompleteButton.classList.remove('hidden_button');
    newTask.classList.toggle('is_complete');
  });
}

function addNotCompleteEvent(newTask) {
  const completeButton = newTask.querySelector('.complete');
  const notCompleteButton = newTask.querySelector('.not_complete');
  notCompleteButton.addEventListener('click', () => {
    notCompleteButton.classList.add('hidden_button');
    completeButton.classList.remove('hidden_button');
    newTask.classList.toggle('is_complete');
  });
}

function addRemoveEvent(newTask) {
  const removeButton = newTask.querySelector('.remove');
  removeButton.addEventListener('click', () => {
    if (window.confirm('本当に削除しますか？')) {
      taskList.removeChild(newTask);
      deleteTasksAPI(newTask);
    }
  });
}

async function createTaskFromDbJSON() {
  let tasks = await getTasksAPI();
  for (let task of tasks) {
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

async function addTaskToDbJSON(taskTitle, taskLimit, taskImportance) {
  let tasks = await getTasksAPI();
  let taskImportanceValue = 0;
  if (taskImportance === '高') {
    taskImportanceValue = 3;
  } else if (taskImportance === '中') {
    taskImportanceValue = 2;
  } else {
    taskImportanceValue = 1;
  }
  const addData = JSON.stringify({
    id: JSON.stringify(Number(tasks.at(-1).id) + 1),
    task_title: taskTitle,
    task_importance: taskImportance,
    task_importance_value: JSON.stringify(taskImportanceValue),
    task_limit: taskLimit,
  });
  postTasksAPI(addData);
  return;
}

async function sortTaskByASC() {
  let tasks = await getTasksAPI();
  tasks = _.orderBy(
    tasks,
    ['task_importance_value', 'task_limit'],
    ['asc', 'asc']
  );
  for (let task of tasks) {
    taskList.appendChild(
      taskList.removeChild(document.getElementById(`${task.id}`))
    );
  }
}

async function sortTaskByDESC() {
  let tasks = await getTasksAPI();
  tasks = _.orderBy(
    tasks,
    ['task_importance_value', 'task_limit'],
    ['desc', 'asc']
  );
  for (let task of tasks) {
    taskList.appendChild(
      taskList.removeChild(document.getElementById(`${task.id}`))
    );
  }
}

createTaskFromDbJSON();

//追加ボタンをクリックした時の動作(タスク一覧にタスクを追加)
taskSubmit.addEventListener('click', (event) => {
  if (taskValue.value === '' || taskDate.value === '') {
    return;
  }
  const taskTitle = taskValue.value;
  const taskLimit = taskDate.value;
  const taskIMportance = taskImportance.value;
  addTaskToDbJSON(taskTitle, taskLimit, taskIMportance);
  createTaskFromDbJSON();
  event.preventDefault(); //reqiredの挙動を止める
  document.taskForm.reset();
});
sort_by_importance.addEventListener('change', (event) => {
  if (event.target.value === 'desc') {
    sortTaskByDESC();
  } else {
    sortTaskByASC();
  }
});
