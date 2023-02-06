const sendForm = document.getElementsByClassName("commentForm") as HTMLCollectionOf<HTMLFormElement>

function sendComment(event:Event) {
  const target = event.target as HTMLFormElement
  const commentText = target.querySelector("input[type='text']") as HTMLInputElement
  event.preventDefault()
  if (commentText.value.trim() != "") {
    let answerToID = target.getAttribute("data-answerToID")
    fetch(`/addComment?commentText=${commentText.value}&postID=${postID}${answerToID?"&answerToID=" + answerToID:""}`)
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
          }, target)
          commentText.value = ""
        }
      })
  }
}

sendForm[0].addEventListener("submit", sendComment)