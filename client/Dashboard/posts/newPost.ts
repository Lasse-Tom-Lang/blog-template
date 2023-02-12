const newPostForm = document.getElementById("newPostForm") as HTMLFormElement
const newPostTitle = document.getElementById("newPostTitle") as HTMLInputElement
const newPostTitleImage = document.getElementById("newPostTitleImage") as HTMLInputElement
const newPostTitleImageButton = document.getElementById("newPostTitleImageButton") as HTMLButtonElement
const newPostText = document.getElementById("newPostText") as HTMLTextAreaElement
const newPostImages = document.getElementById("newPostImages") as HTMLInputElement
const newPostImagesButton = document.getElementById("newPostImagesButton") as HTMLButtonElement

newPostForm.addEventListener("submit", (event) => {
  event.preventDefault()
})

newPostTitleImageButton.addEventListener("click", () => {
  newPostTitleImage.click()
})

newPostImagesButton.addEventListener("click", () => {
  newPostImages.click()
})