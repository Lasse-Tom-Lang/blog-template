const blogTitle = document.querySelector("h1") as HTMLHeadingElement
const blogImage = document.querySelector("header img") as HTMLImageElement
const aboutMe = document.querySelector("#aboutMe div div") as HTMLDivElement

let blogData: blogData

fetch("/getBlogData")
  .then(data => data.json())
  .then(data => {
    blogData = data
    blogTitle.innerHTML = blogData.title
    blogImage.src = `/images/${blogData.coverImage}`
    aboutMe.innerHTML = `
      <h3>
        ${blogData.aboutTitle}
      </h3>
      <p>
        ${blogData.aboutMe}
      </p>
    `
  })