export interface UserObjectType {
  firstName?: string | null
  lastName?: string | null
  phone?: string | number | null
  email?: string | null
}
export interface ParsedUserType {
  firstName: string
  lastName: string
  phone: string
  email: string
}
