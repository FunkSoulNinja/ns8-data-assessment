import { UserObjectType, ParsedUserType } from '../../types'
import parseNames from './parseNames'
import parseEmail from './parseEmail'
import parsePhone from './parsePhone'

function parseItem(dataObject: UserObjectType): ParsedUserType {
  return {
    ...parseNames(dataObject),
    email: parseEmail(dataObject),
    phone: parsePhone(dataObject)
  }
}

export default parseItem
