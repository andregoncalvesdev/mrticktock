class ApiManager {
  getTasks(login) {
    const url = 'https://mrticktock.com/app/api/get_tasks'
    const body = `email=${login.email}&password=${login.password}`

    return this.fetchURL(url, body)
  }

  isTimerActive(login) {
    const url = 'https://mrticktock.com/app/api/is_timer_active'
    const body = `email=${login.email}&password=${login.password}`

    return this.fetchURL(url, body)
  }

  startTimer(login, taskId) {
    const url = 'https://mrticktock.com/app/api/start_timer'
    const body = `email=${login.email}&password=${login.password}&task_id=${taskId}`

    return this.fetchURL(url, body)
  }

  stopTimer(login, taskId) {
    const url = 'https://mrticktock.com/app/api/stop_timer'
    const body = `email=${login.email}&password=${login.password}&task_id=${taskId}`

    return this.fetchURL(url, body)
  }

  hideTask(login, taskId) {
    const url = 'https://mrticktock.com/app/api/hide_tasks'
    const body = `email=${login.email}&password=${login.password}&tasks=${taskId}`

    return this.fetchURL(url, body)
  }

  reportTimeOnTask(login, taskId, time, date) {
    const url = 'https://mrticktock.com/app/api/report_time_on_task'
    const body = `email=${login.email}&password=${login.password}&task_id=${taskId}&time=${time}&date=${date}`

    return this.fetchURL(url, body)
  }

  getTaskDetails(login, taskId) {
    const url = 'https://mrticktock.com/app/api/get_task_details'
    const body = `email=${login.email}&password=${login.password}&task_id=${taskId}`

    return this.fetchURL(url, body)
  }

  fetchURL(url, body) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body
    })
  }
}

export default new ApiManager()
