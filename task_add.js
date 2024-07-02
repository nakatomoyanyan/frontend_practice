//入力内容を取得
let taskValue = document.querySelector('.task_value'); //タスクの名前を取得
let taskDate = document.querySelector('.task_date'); //タスクの期日を取得
let taskImportance = document.querySelector('.task_importance'); //タスクの優先度を取得
let taskSubmit = document.querySelector('.task_submit'); //追加ボタンのクリックを確認
let taskList = document.querySelector('.task_list');

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
  }});
}

//追加ボタンをクリックした時の動作(タスク一覧にタスクを追加)
taskSubmit.addEventListener('click', (event) => {
  if (taskValue.value === '' || taskDate.value === '') {
    return
  }

  //タスク作成
  let newTask = document.createElement('div');
  newTask.classList.add('newtask'); //クラス名を追加
  taskList.appendChild(newTask);
  //タスクの中身を追加
  newTask.innerHTML = `
      <p class="task_value">${taskValue.value}</p>
      <p>期限日:${taskDate.value}</p>
      <p>優先度:${taskImportance.value}</p>
      <button class="complete">完了にする</button>
      <button class="not_complete hidden_button">元に戻す</button>
      <button class="remove">削除する</button>
  `;
  addCompleteEvent(newTask);
  addNotCompleteEvent(newTask);
  addRemoveEvent(newTask);
  //タスク入力フォームを初期化
  event.preventDefault();//reqiredの挙動を止める
  document.taskForm.reset();
});
