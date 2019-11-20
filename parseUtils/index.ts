import parseNames from './parseNames'
import parseEmail from './parseEmail'
import parsePhone from './parsePhone'

function parseItem(dataObject) {
  return {
    ...parseNames(dataObject),
    email: parseEmail(dataObject),
    phone: parsePhone(dataObject)
  }
}

export default parseItem
