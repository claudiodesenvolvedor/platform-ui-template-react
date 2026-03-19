export interface LoginResponse {
  token: string
  user: {
    name: string
    email: string
    avatarUrl: string
  }
  roles: string[]
  features: Record<string, boolean>
}
