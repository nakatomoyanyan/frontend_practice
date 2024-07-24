let taskList = document.querySelector('.task_list');
let url = 'http://localhost:2000/tasks';

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

export async function createTaskFromDbJSON(url) {
    let response = await fetch(url);
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
    }
}
