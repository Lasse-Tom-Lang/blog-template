import express from 'express';
const app = express()

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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

app.get("/article/:id", (req, res) => {
  res.sendFile(__dirname + "/client/article.html")
})

app.get("/getNewestPosts.js", (req, res) => {
  res.sendFile(__dirname + "/client/getNewestPosts.js")
})

app.get("/getArticle.js", (req, res) => {
  res.sendFile(__dirname + "/client/getArticle.js")
})

app.get("/getPost/:postID", async (req, res) => {
  const postID = req.params.postID as string
  const post = await prisma.post.findUnique({
    where: {
      id: postID
    }
  })
  res.json(post)
  res.end()
})

app.get("/getNewestPosts", async (req, res) => {
  const count = Number(req.query.count)
  if (count) {
    const posts = await prisma.post.findMany({
      orderBy: {
        lastChange: "desc"
      },
      take: count
    })
    res.json(posts)
  }
  else {
    res.json({})
  }
  res.end()
})