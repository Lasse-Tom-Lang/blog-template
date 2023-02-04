interface post {
  lastChange: string
  title: string
  text: string
  id: string
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