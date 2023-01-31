interface post {
  lastChange: Date
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