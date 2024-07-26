import { createTaskFromDbJSON, removeTaskFromDbJSON, addTaskToDbJSON,sortTaskByASC,sortTaskByDESC} from "./api.js";
const taskValue = document.querySelector('.task_value');
const taskDate = document.querySelector('.task_date');
const taskImportance = document.querySelector('.task_importance');
const taskSubmit = document.querySelector('.task_submit');
const taskList = document.querySelector('.task_list');
const sort_by_importance = document.querySelector('.sort_by_importance');

createTaskFromDbJSON();

//追加ボタンをクリックした時の動作(タスク一覧にタスクを追加)
taskSubmit.addEventListener('click', (event) => {
  if (taskValue.value === '' || taskDate.value === '') {
    return
  }
  const taskTitle = taskValue.value;
  const taskLimit = taskDate.value;
  const taskIMportance = taskImportance.value;
  addTaskToDbJSON(taskTitle,taskLimit,taskIMportance);
  createTaskFromDbJSON();
  event.preventDefault();//reqiredの挙動を止める
  document.taskForm.reset();
});
sort_by_importance.addEventListener('change', (event) => {
 if (event.target.value === 'desc'){
  sortTaskByDESC();
 }else{
  sortTaskByASC();
 };
});
