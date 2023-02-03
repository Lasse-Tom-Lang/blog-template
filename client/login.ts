const username = document.querySelector("#login input:nth-of-type(1)") as HTMLInputElement
const password = document.querySelector("#login input:nth-of-type(2)") as HTMLInputElement
const error = document.querySelector("#login p") as HTMLParagraphElement
const form = document.querySelector("#login") as HTMLFormElement

form.addEventListener("submit", (event) => {
  event.preventDefault()
  if (username.value == "" || password.value == "") {
    error.innerHTML = "Please fill out all fields"
    return
  }
  fetch(`/loginCheck?userName=${username.value}&password=${password.value}`)
    .then(data => data.json())
    .then(data => {
      if (data.status == 0) {
        error.innerHTML = "Login data incorrect"
        return
      }
      if (data.user.role == "admin") {
        location.href = "/dashboard"
      }
    })
})