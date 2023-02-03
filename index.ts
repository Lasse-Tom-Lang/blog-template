import express from 'express';
import sessions from 'express-session';
import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';
import figlet from 'figlet';
import gradient from "gradient-string";

const prisma = new PrismaClient()
const oneDay = 86400000
const app = express()

declare module 'express-session' {
  interface SessionData {
    userID: string,
    role: role
  }
}

app.listen(80, () => {
  console.log(gradient.rainbow.multiline(figlet.textSync('Server started'), { interpolation: 'hsv' }));
  console.log("Listening on port 80");
})

app.use(sessions({
  secret: ".f2.97rrh34?r318b24!82rb",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

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

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/client/login.html")
})

app.get("/login.js", (req, res) => {
  res.sendFile(__dirname + "/client/login.js")
})

app.get("/dashboard", (req, res) => {
  if (req.session.role == "admin") {
    res.sendFile(__dirname + "/client/dashboard.html")
  }
  else {
    res.redirect("/login")
  }
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

app.get("/loginCheck", async (req, res) => {
  const userName = req.query.userName as string

  if (!userName || !req.query.password) {
    res.json({status: 0})
    res.end()
    return
  }
  let password = req.query.password as string
  password = createHash('sha256').update(password).digest('base64') as string
  const user = await prisma.user.findFirst({
    where: {
      name: userName,
      password: password
    },
    select: {
      id: true,
      role: true
    }
  })
  if (!user) {
    res.json({status: 0})
    res.end()
    return
  }
  req.session.userID = user.id
  req.session.role = user.role as role
  res.json({status: 1, user})
  res.end()
})