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

app.get("/article", (req, res) => {
  res.sendFile(__dirname + "/client/article.html")
})

app.get("/getNewestPosts.js", (req, res) => {
  res.sendFile(__dirname + "/client/getNewestPosts.js")
})

// c99865fb-b5a8-422a-bace-89f2f6cae430
// da4b890c-9aa5-4959-87f7-43486cf6bbe5

app.get("/posts/:postID", async (req, res) => {
  const postID = req.params.postID as string
  const post = await prisma.post.findUnique({
    where: {
      id: postID
    }
  })
  res.json(post)
  res.end()
})

app.get("/newestPosts", async (req, res) => {
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