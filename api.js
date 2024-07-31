const taskList = document.querySelector('.task_list');
const ENDPOINT_URL = 'http://localhost:2000/tasks';

async function getTasksAPI() {
  const response = await fetch(ENDPOINT_URL);
  let tasks = await response.json();
  return tasks;
}

async function postTasksAPI(addData) {
  const response = await fetch(ENDPOINT_URL);
  let tasks = await response.json();
  const result = await fetch(ENDPOINT_URL, { method: 'POST', body: addData });
  if (!result.ok) {
    throw new Error(`HTTP error! status: ${result.status}`);
  }
  return;
}

async function deleteTasksAPI(newTask) {
  const deleteTaskID = newTask.id;
  const deleteTaskURL = ENDPOINT_URL + '/' + deleteTaskID;
  const result = await fetch(deleteTaskURL, { method: 'DELETE' });
  if (!result.ok) {
    throw new Error(`HTTP error! status: ${result.status}`);
  }
  return;
}

export { getTasksAPI, postTasksAPI, deleteTasksAPI };
