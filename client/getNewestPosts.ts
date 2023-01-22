const newestPosts = document.getElementById("newestPosts") as HTMLElement

interface post {
  lastChange: Date
  title: string
  text: string
  id: string
}

let posts: post[]

fetch("/newestPosts?count=3")
  .then(data => data.json())
  .then(data => {
    if (data.length) {
      posts = data
      posts.forEach(post => {
        newestPosts.innerHTML += `
        <article>
          <img src="/images/titleImage.png">
          <div>
            <h3>
              ${post.title}
            </h3>
            <p>
              ${post.text}
            </p>
            <a href="/article">
              Show post
            </a>
          </div>
        </article>
        `
      });
    }
  })