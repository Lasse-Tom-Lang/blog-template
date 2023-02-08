const newestPosts = document.getElementById("newestPosts") as HTMLElement

let posts: post[]

const url = window.location.pathname
const id = url.split("/")[url.split("/").length - 1]

fetch("/getNewestPosts?count=4")
  .then(data => data.json())
  .then(data => {
    if (data.length) {
      posts = data
      posts.forEach(post => {
        if (post.id != id) {
          newestPosts.innerHTML += `
          <article>
            <img src="/images/titleImage.png">
            <div>
              <h3>
                ${post.title}
              </h3>
              <p>
                ${post.text.substring(0, 300)}
                ${post.text.length>300?"...":""}
              </p>
              <a href="/article/${post.id}">
                Show post
              </a>
            </div>
          </article>
          `
        }
      });
    }
  })