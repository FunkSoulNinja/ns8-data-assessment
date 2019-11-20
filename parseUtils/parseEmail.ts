import { UserObjectType } from '../types'
import { NA } from './constants'

function parseEmail({ email }: UserObjectType) {
  if (!email) return NA
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (emailRegex.exec(email) && email) || NA
}

export default parseEmail
