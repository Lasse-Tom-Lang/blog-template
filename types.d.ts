interface post {
  lastChange: string
  title: string
  text: string
  id: string
  comments: comment[]
}

interface comment {
  id: string,
  text: string,
  author: {
    name: string
  },
  answerToID: string,
  lastChange: string
}

interface user {
  id: string
  name: string
  password: string
  role: role
}

type role = "admin" | "user"

interface dashboardData {
  status: 1 | 0
  user: user
  posts: post[]
}

interface blogData {
  id: string
  title: string
  coverImage: string
  aboutTitle: string
  aboutMe: string
}