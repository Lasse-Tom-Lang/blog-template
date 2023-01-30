const title = document.querySelector("h1") as HTMLHeadingElement
const main = document.querySelector("main") as HTMLElement

const postURL = window.location.pathname
const postID = postURL.split("/")[postURL.split("/").length - 1]
let post: post

fetch(`/getPost/${postID}`)
  .then(data => data.json())
  .then(data => {
    post = data
    title.innerHTML = post.title
    main.innerHTML += `<p>${post.text}</p>`
    document.title = post.title
  })