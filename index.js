const axios = require('axios')
const fs = require('fs')

const NA = 'N/A'

async function getData() {
  const res = await axios('https://data-endpoint.herokuapp.com/data')
  return res.data
}

function parseNames({ firstName, lastName }) {
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
}

function parseEmail({ email }) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (emailRegex.exec(email) && email) || NA
}

function parsePhone({ phone }) {
  if (!phone) {
    return NA
  }
  if (typeof phone === 'string') {
    return phone.replace(/\D/g, '')
  }
  // Phone field exists but is not a string
  return phone.toString()
}

function parseItem(dataObject) {
  return {
    ...parseNames(dataObject),
    email: parseEmail(dataObject),
    phone: parsePhone(dataObject)
  }
}

async function fetchAndParseData() {
  const data = await getData()
  const parsedData = data.map(parseItem)

  fs.writeFileSync('output.json', JSON.stringify(parsedData))
}

fetchAndParseData()
