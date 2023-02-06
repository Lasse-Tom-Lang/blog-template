const title = document.querySelector("h1") as HTMLHeadingElement
const main = document.querySelector("main") as HTMLElement
const comments = document.querySelector("#comments") as HTMLElement

const postURL = window.location.pathname
const postID = postURL.split("/")[postURL.split("/").length - 1]
let post: post

function addComment(comment:comment, parent:HTMLElement) {
  let newComment = document.createElement("div")
  newComment.classList.add("comment")
  newComment.setAttribute("data-commentID", comment.id)
  let form = document.createElement("form")
  form.addEventListener("submit", sendComment)
  form.classList.add("commentForm")
  form.setAttribute("data-answerToID", comment.id)
  form.innerHTML = `
    <input type="text" placeholder="Answer">
    <input type="submit" value="Send">
  `
  newComment.innerHTML += `
    <a>${comment.author.name}</a>
    <p>
      ${comment.text}
    </p>
  `
  newComment.appendChild(form)
  parent.appendChild(newComment)
}

fetch(`/getPost/${postID}`)
  .then(data => data.json())
  .then(data => {
    post = data
    title.innerHTML = post.title
    main.innerHTML += `<p>${post.text}</p>`
    document.title = post.title
    post.comments.sort((a, b) => {
      let c: Date = new Date(a.lastChange);
      let d: Date = new Date(b.lastChange)
      return c.getTime() - d.getTime();
    });
    post.comments.forEach(comment => {
      if (!comment.answerToID) {
        addComment(comment, comments)
      }
      else {
        let selectedComment = document.querySelector(`[data-commentID="${comment.answerToID}"]`) as HTMLElement
        addComment(comment, selectedComment)
      }
    })
  })