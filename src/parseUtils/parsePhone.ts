import { UserObjectType } from '../../types'
import { NA } from './constants'

function parsePhone({ phone }: UserObjectType) {
  if (!phone) {
    return NA
  }
  return phone.toString().replace(/\D/g, '')
}

export default parsePhone
