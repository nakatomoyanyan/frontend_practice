//入力内容を取得
let taskValue = document.querySelector('.task_value');//タスクの名前を取得
let taskDate = document.querySelector('.task_date');//タスクの期日を取得
let taskImportance = document.querySelector('.task_importance');//タスクの優先度を取得
let taskSubmit = document.querySelector('.task_submit');//追加ボタンのクリックを確認

//追加ボタンをクリックした時の動作(タスク一覧にタスクを追加)
taskSubmit.addEventListener('click',() => {
    //タスクのフォーム作成
    let taskList = document.querySelector('.task_list');
    let newTask = document.createElement('div');
    newTask.style.border = 'solid #cccccc';
    newTask.style.borderRadius = '5px';
    newTask.style.display = 'inline-block';//タスク名の長さに応じてタスクのフォームの大きさが変わる
    taskList.appendChild(newTask);
    let nullPtag = document.createElement('p');//タスクのフォームを縦並びにする&フォーム同士に空白を開けるため
    taskList.appendChild(nullPtag);
    //タスク名を追加
    let newTaskValue = document.createElement('p');
    newTaskValue.innerText = taskValue.value;
    newTask.appendChild(newTaskValue);
    //タスクの期日を追加
    let newTaskDate = document.createElement('p');
    newTaskDate.innerText = '期限日:' + taskDate.value;
    newTask.appendChild(newTaskDate);
    //タスクの優先度を追加
    let newTaskImportance = document.createElement('p');
    newTaskImportance.innerText = '優先度:' + taskImportance.value;
    newTask.appendChild(newTaskImportance);
    //タスク入力フォームを初期化
    taskValue.value = '';
    taskDate.value = '';
    taskImportance.value = '高';
})
