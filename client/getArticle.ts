const title = document.querySelector("h1") as HTMLHeadingElement

const url = window.location.pathname
const id = url.split("/")[url.split("/").length - 1]
let post: post

fetch(`/getPost/${id}`)
  .then(data => data.json())
  .then(data => {
    post = data
    title.innerHTML = post.title
  })