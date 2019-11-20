import { UserObjectType } from '../types'
import { NA } from './constants'

function parseNames({ firstName, lastName }: UserObjectType) {
  if (firstName && lastName) {
    return { firstName, lastName }
  } else if (!firstName && !lastName) {
    return {
      firstName: NA,
      lastName: NA
    }
  } else if (firstName && !lastName) {
    const firstNameField = firstName.split(' ')
    return {
      firstName: firstNameField[0],
      lastName: firstNameField[1] || NA
    }
  } else if (!firstName && lastName) {
    // Check if last name field has two names
    const lastNameField = lastName.split(' ')
    if (lastNameField.length > 1) {
      // field has two names
      return {
        firstName: lastNameField[0],
        lastName: lastNameField[1]
      }
    } else {
      // last name field has only the last name
      return {
        firstName: NA,
        lastName: lastNameField[0]
      }
    }
  }
  return {
    firstName: NA,
    lastName: NA
  }
}

export default parseNames
