export const ASSIGN_TASKS = 'ASSIGN_TASKS'
export const STORE_TASK_SHOW = 'STORE_TASK_SHOW'
export const STORE_ACTIVE_TASK = 'STORE_ACTIVE_TASK'
export const STORE_LOGIN = 'STORE_LOGIN'

export function assignTasks(tasks) {
  return {
    type: ASSIGN_TASKS,
    payload: tasks
  };
}

export function storeTaskShow(task) {
  return {
    type: STORE_TASK_SHOW,
    payload: task
  };
}

export function storeActiveTask(task) {
  return {
    type: STORE_ACTIVE_TASK,
    payload: task
  };
}

export function storeLogin(login) {
  return {
    type: STORE_LOGIN,
    payload: login
  };
}
