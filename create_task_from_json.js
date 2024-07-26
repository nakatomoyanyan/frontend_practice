const taskList = document.querySelector('.task_list');
const URL = 'http://localhost:2000/tasks';

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
      removeTaskFromDbJSON(URL,newTask);
  }});
};

async function removeTaskFromDbJSON(URL,newTask) {
  const removeTaskID = newTask.id;
  const deleteTaskURL = URL + '/' + removeTaskID;
  const result = await fetch(deleteTaskURL,{
    method: "DELETE",
  })
};

export async function createTaskFromDbJSON(URL) {
  const response = await fetch(URL);
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
