import { UserObjectType } from '../types'
import { NA } from './constants'

function parsePhone({ phone }: UserObjectType) {
  if (!phone) {
    return NA
  }
  if (typeof phone === 'string') {
    return phone.replace(/\D/g, '')
  }
  // Phone field exists but is not a string
  return phone.toString()
}

export default parsePhone
