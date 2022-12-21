const express = require("express")
const app = express()

app.listen(80, () => {
  console.log("Server started on port 80")
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html")
})

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/client/style.css")
})

app.get("/images/titleImage.png", (req, res) => {
  res.sendFile(__dirname + "/client/images/titleImage.png")
})

app.get("/article", (req, res) => {
  res.sendFile(__dirname + "/client/article.html")
})