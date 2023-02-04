const title = document.querySelector("h1") as HTMLHeadingElement
const main = document.querySelector("main") as HTMLElement
const comments = document.querySelector("#comments") as HTMLElement

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
    post.comments.sort((a, b) => {
      let c: Date = new Date(a.lastChange);
      let d: Date = new Date(b.lastChange)
      return c.getTime() - d.getTime();
    });
    post.comments.forEach(comment => {
      console.log(comment)
      if (!comment.answerToID) {
        comments.innerHTML += `
          <div class="comment" data-commentID=${comment.id}>
            <a>${comment.author.name}</a>
            <p>
              ${comment.text}
            </p>
          </div>
        `
      }
      else {
        let selectedComment = document.querySelector(`[data-commentID="${comment.answerToID}"]`)
        selectedComment!.innerHTML += `
          <div class="comment" data-commentID=${comment.id}>
            <a>${comment.author.name}</a>
            <p>
              ${comment.text}
            </p>
          </div>
        `
      }
    })
  })