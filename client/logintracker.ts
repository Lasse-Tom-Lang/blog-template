const logintracker = document.querySelector("#logintracker") as HTMLDivElement

fetch("/loggedIn")
  .then(data => data.json())
  .then(data => {
    if (data.status == 1) {
      logintracker.innerHTML = data.name
    }
  })