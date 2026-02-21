export interface User {
  id: string
  email: string
  username: string
  profilePicture?: string
  roles?: string[]
  verifiedAt: Date | null
}
