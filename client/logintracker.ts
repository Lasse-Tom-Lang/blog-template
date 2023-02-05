const logintracker = document.querySelector("#logintracker") as HTMLDivElement

let userData: {status: 1 | 0, name: string, id: string}

fetch("/loggedIn")
  .then(data => data.json())
  .then(data => {
    if (data.status == 1) {
      logintracker.innerHTML = data.name
      userData = data
    }
  })