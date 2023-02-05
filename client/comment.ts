const sendForm = document.getElementById("commentForm") as HTMLFormElement
const commentText = document.querySelector("#commentForm input[type='text']") as HTMLInputElement

sendForm.addEventListener("submit", (event) => {
  event.preventDefault()
  if (commentText.value.trim() != "") {
    fetch(`/addComment?commentText=${commentText.value}&postID=${postID}`)
      .then(data => data.json())
      .then(data => {
        if (data.status == 1) {
          addComment({
            id: data.id,
            text: commentText.value,
            author: {
              name: userData.name
            },
            answerToID: "",
            lastChange: ""
          }, comments)
          commentText.value = ""
        }
      })
  }
})