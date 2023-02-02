const username = document.querySelector("#login input:nth-of-type(1)") as HTMLInputElement
const password = document.querySelector("#login input:nth-of-type(2)") as HTMLInputElement
const form = document.querySelector("#login") as HTMLFormElement

form.addEventListener("submit", (event) => {
  event.preventDefault()
})