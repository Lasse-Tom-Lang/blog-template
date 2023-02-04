const welcome = document.querySelector("h1") as HTMLHeadingElement
const postList = document.querySelector("#postList") as HTMLUListElement

let dashboardData: dashboardData

fetch("/getDashboardData")
  .then(data => data.json())
  .then(data => {
    if (data.status == 0) {
      return
    }
    dashboardData = data
    welcome.innerHTML = `Hello ${dashboardData.user.name}`
    dashboardData.posts.forEach(post => {
      let date = new Date(post.lastChange)
      postList.innerHTML += `
        <div>
          <span>${post.title}</span>
          <span>Last changed at ${date.toLocaleString("en-us", {day: "2-digit", month: "2-digit", year: "numeric"})}</span>
          <span>${post.id}</span>
        </div>`
    })
  })