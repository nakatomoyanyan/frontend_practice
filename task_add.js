//入力内容を取得
let taskValue = document.querySelector('.task_value'); //タスクの名前を取得
let taskDate = document.querySelector('.task_date'); //タスクの期日を取得
let taskImportance = document.querySelector('.task_importance'); //タスクの優先度を取得
let taskSubmit = document.querySelector('.task_submit'); //追加ボタンのクリックを確認
let taskList = document.querySelector('.task_list');



function initialization() {
  taskValue.value = '';
  taskDate.value = '';
  taskImportance.value = '高';
}

function addCompleteButton(newTask) {
  let completeButton = document.createElement('button');
  completeButton.classList.add('complete_button');
  completeButton.innerText = '完了にする';
  let newTaskElement = document.querySelector('.newtask');
  let removeButtonElement = document.querySelector('.remove_button');
  newTaskElement.insertBefore(completeButton,removeButtonElement);
  completeButton.addEventListener('click', () => {
    newTask.classList.toggle('is_complete');
    newTask.removeChild(completeButton);
    addNotCompleteButton(newTask);
  });
  
}

function addNotCompleteButton(newTask) {
  let notCompleteButton = document.createElement('button');
  notCompleteButton.classList.add('not_complete_button');
  notCompleteButton.innerText = '元に戻す';
  let newTaskElement = document.querySelector('.newtask');
  let removeButtonElement = document.querySelector('.remove_button');
  newTaskElement.insertBefore(notCompleteButton,removeButtonElement);
  notCompleteButton.addEventListener('click', () => {
    newTask.classList.toggle('is_complete');
    newTask.removeChild(notCompleteButton);
    addCompleteButton(newTask);
  });
}

function addRemoveButton(newTask) {
  let removeButton = document.createElement('button');
  removeButton.classList.add('remove_button');
  removeButton.innerText = '削除する';
  newTask.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
    if (window.confirm('本当に削除しますか？')) {
      taskList.removeChild(newTask);
  }});
}

//追加ボタンをクリックした時の動作(タスク一覧にタスクを追加)
taskSubmit.addEventListener('click', () => {
  if (taskValue.value === '' || taskDate.value === '') {
    return
  }
  //タスク作成
  let newTask = document.createElement('div');
  newTask.classList.add('newtask'); //クラス名を追加
  taskList.appendChild(newTask);
  //タスクの中身を追加
  newTask.innerHTML = `
      <p>${taskValue.value}</p>
      <p>期限日:${taskDate.value}</p>
      <p>優先度:${taskImportance.value}</p>
  `;
  addRemoveButton(newTask);
  addCompleteButton(newTask);
  //タスク入力フォームを初期化
  taskSubmit.type = 'button';
  initialization();
});
