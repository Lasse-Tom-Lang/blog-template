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

app.get("/logintracker.js", (req, res) => {
  res.sendFile(__dirname + "/client/logintracker.js")
})

app.get("/comment.js", (req, res) => {
  res.sendFile(__dirname + "/client/comment.js")
})

app.get("/dashboard", (req, res) => {
  if (req.session.role == "admin") {
    res.sendFile(__dirname + "/client/dashboard.html")
  }
  else if (req.session.role == "user") {
    res.redirect("/")
  }
  else {
    res.redirect("/login")
  }
})

app.get("/dashboard.js", (req, res) => {
  res.sendFile(__dirname + "/client/dashboard.js")
})

app.get("/getPost/:postID", async (req, res) => {
  const postID = req.params.postID as string
  const post = await prisma.post.findUnique({
    where: {
      id: postID
    },
    select: {
      lastChange: true,
      title: true,
      text: true,
      id: true,
      comments: {
        select: {
          id: true,
          text: true,
          author: {
            select: {
              name: true
            }
          },
          answerToID: true,
          lastChange: true
        },
        orderBy: {
          lastChange: "desc"
        }
      }
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

app.get("/getDashboardData", async (req, res) => {
  if (req.session.role != "admin") {
    res.json({status: 0})
    res.end()
    return
  }
  let user = await prisma.user.findUnique({
    where: {
      id: req.session.userID
    },
    select: {
      name: true,
      id: true,
      role: true
    }
  })
  let posts = await prisma.post.findMany({
    orderBy: {
      lastChange: "desc"
    },
    take: 20
  })
  res.json({status: 1, user, posts})
  res.end()
})

app.get("/loggedIn", async (req, res) => {
  if (!req.session.userID) {
    res.json({status: 0})
    res.end()
    return
  }
  let user = await prisma.user.findFirst({
    where: {
      id: req.session.userID
    }
  })
  if (!user) {
    res.json({status: 0})
    res.end()
    return
  }
  res.json({status: 1, name: user.name, id: user.id})
  res.end()
})

app.get("/logout", (req, res) => {
  req.session.userID = undefined
  req.session.role = undefined
  res.end()
})

app.get("/addComment", async (req, res) => {
  if (!req.session.userID || !req.query.commentText || !req.query.postID) {
    res.json({status: 0})
    res.end()
    return
  }
  const commentText = req.query.commentText as string
  const postID = req.query.postID as string
  const comment = await prisma.comment.create({
    data: {
      text: commentText,
      authorID: req.session.userID,
      postID: postID
    }
  })
  res.json({status: 1, id: comment.id})
  res.end()
})