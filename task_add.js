//入力内容を取得
let taskValue = document.querySelector('.task_value'); //タスクの名前を取得
let taskDate = document.querySelector('.task_date'); //タスクの期日を取得
let taskImportance = document.querySelector('.task_importance'); //タスクの優先度を取得
let taskSubmit = document.querySelector('.task_submit'); //追加ボタンのクリックを確認
let taskList = document.querySelector('.task_list');

//追加ボタンをクリックした時の動作(タスク一覧にタスクを追加)
taskSubmit.addEventListener('click', () => {
  if (taskValue.value !== '' && taskDate.value !== '') {
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
    //タスク入力フォームを初期化
    taskSubmit.type = 'button';
    taskValue.value = '';
    taskDate.value = '';
    taskImportance.value = '高';
  } else {
    taskSubmit.type = 'submit';
  }
});
