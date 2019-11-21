import fs from 'fs'

import { NA } from '../src/parseUtils/constants'
import parsePhone from '../src/parseUtils/parsePhone'
import parseEmail from '../src/parseUtils/parseEmail'
import parseNames from '../src/parseUtils/parseNames'
import parseItem from '../src/parseUtils'
import fetchAndParseData from '../src/fetchAndParseData'

const API_ENDPOINT = 'https://data-endpoint.herokuapp.com/data'

describe('Parsing Functions', () => {
  describe('Phone', () => {
    it('should correctly parse phone from a number', () => {
      const phone = 1234567
      const parsedPhoneNumber = parsePhone({ phone })
      expect(parsedPhoneNumber).toEqual(phone.toString())
    })
    it('should correctly parse phone from a string', () => {
      const phone = '1234567'
      const parsedPhoneNumber = parsePhone({ phone })
      expect(parsedPhoneNumber).toEqual(phone)
    })
    it('should correctly parse phone with hyphens from a string', () => {
      const phone = '123-4567'
      const parsedPhoneNumber = parsePhone({ phone })
      expect(parsedPhoneNumber).toEqual('1234567')
    })
    it(`should return ${NA} with missing phone`, () => {
      const parsedPhoneNumber = parsePhone({})
      expect(parsedPhoneNumber).toEqual(NA)
    })
  })

  describe('Email', () => {
    it('should correctly parse a properly formatted email', () => {
      const email = 'goodemail@mymail.com'
      const parsedEmail = parseEmail({ email })
      expect(parsedEmail).toEqual(email)
    })

    it(`should return ${NA} for an email without a domain`, () => {
      const email = 'bademail@'
      const parsedEmail = parseEmail({ email })
      expect(parsedEmail).toEqual(NA)
    })
    it(`should return ${NA} for an email with a bad domain`, () => {
      const email = 'bademail@mymail'
      const parsedEmail = parseEmail({ email })
      expect(parsedEmail).toEqual(NA)
    })
    it(`should return ${NA} for an email without an "@" symbol`, () => {
      const email = 'badmeailmymail.com'
      const parsedEmail = parseEmail({ email })
      expect(parsedEmail).toEqual(NA)
    })
    it(`should return ${NA} for an email without a username`, () => {
      const email = '@mymail.com'
      const parsedEmail = parseEmail({ email })
      expect(parsedEmail).toEqual(NA)
    })

    it(`should return ${NA} for a missing email`, () => {
      const parsedEmail = parseEmail({})
      expect(parsedEmail).toEqual(NA)
    })
  })

  describe('Names', () => {
    it('should return the first and last names when both are given correctly', () => {
      const firstName = 'Anthony'
      const lastName = 'Falcon'
      const parsedNames = parseNames({ firstName, lastName })

      expect(parsedNames).toMatchObject({ firstName, lastName })
    })
    it(`should return ${NA} for both first and last names when both missing`, () => {
      const parsedNames = parseNames({})

      expect(parsedNames).toMatchObject({ firstName: NA, lastName: NA })
    })
    it(`should return ${NA} for both first and last names when both are null`, () => {
      const firstName = null
      const lastName = null
      const parsedNames = parseNames({ firstName, lastName })

      expect(parsedNames).toMatchObject({ firstName: NA, lastName: NA })
    })
    it(`should return ${NA} for both first and last names when both are empty strings`, () => {
      const parsedNames = parseNames({ firstName: '', lastName: '' })

      expect(parsedNames).toMatchObject({ firstName: NA, lastName: NA })
    })
    it(`should return ${NA} and last when first name is missing`, () => {
      const lastName = 'Falcon'
      const parsedNames = parseNames({ lastName })

      expect(parsedNames).toMatchObject({ firstName: NA, lastName })
    })
    it(`should return ${NA} and last when first name is null`, () => {
      const firstName = null
      const lastName = 'Falcon'
      const parsedNames = parseNames({ firstName, lastName })

      expect(parsedNames).toMatchObject({ firstName: NA, lastName })
    })
    it(`should return ${NA} and last when first name is an empty string`, () => {
      const firstName = ''
      const lastName = 'Falcon'
      const parsedNames = parseNames({ firstName, lastName })

      expect(parsedNames).toMatchObject({ firstName: NA, lastName })
    })
    it(`should return first name and ${NA} when last name is missing`, () => {
      const firstName = 'Anthony'
      const parsedNames = parseNames({ firstName })

      expect(parsedNames).toMatchObject({ firstName, lastName: NA })
    })
    it(`should return first name and ${NA} when last name is null`, () => {
      const firstName = 'Anthony'
      const lastName = null
      const parsedNames = parseNames({ firstName, lastName })

      expect(parsedNames).toMatchObject({ firstName, lastName: NA })
    })
    it(`should return first name and ${NA} when last name is an empty string`, () => {
      const firstName = 'Anthony'
      const lastName = ''
      const parsedNames = parseNames({ firstName, lastName })

      expect(parsedNames).toMatchObject({ firstName, lastName: NA })
    })
    it('should split names when both are in firstName field with no lastName prop', () => {
      const firstName = 'Anthony'
      const lastName = 'Falcon'
      const parsedNames = parseNames({ firstName: `${firstName} ${lastName}` })

      expect(parsedNames).toMatchObject({ firstName, lastName })
    })
    it('should split names when both are in firstName field with lastName as an empty string', () => {
      const firstName = 'Anthony'
      const lastName = 'Falcon'
      const parsedNames = parseNames({
        firstName: `${firstName} ${lastName}`,
        lastName: ''
      })

      expect(parsedNames).toMatchObject({ firstName, lastName })
    })
    it('should split names when both are in firstName field with lastName as null', () => {
      const firstName = 'Anthony'
      const lastName = 'Falcon'
      const parsedNames = parseNames({
        firstName: `${firstName} ${lastName}`,
        lastName: null
      })

      expect(parsedNames).toMatchObject({ firstName, lastName })
    })
    it('should split names when both are in lastName field with no firstName prop', () => {
      const firstName = 'Anthony'
      const lastName = 'Falcon'
      const parsedNames = parseNames({ lastName: `${firstName} ${lastName}` })

      expect(parsedNames).toMatchObject({ firstName, lastName })
    })
    it('should split names when both are in lastName field with firstName as an empty string', () => {
      const firstName = 'Anthony'
      const lastName = 'Falcon'
      const parsedNames = parseNames({
        firstName: '',
        lastName: `${firstName} ${lastName}`
      })

      expect(parsedNames).toMatchObject({ firstName, lastName })
    })
    it('should split names when both are in lastName field with firstName as an null', () => {
      const firstName = 'Anthony'
      const lastName = 'Falcon'
      const parsedNames = parseNames({
        firstName: null,
        lastName: `${firstName} ${lastName}`
      })

      expect(parsedNames).toMatchObject({ firstName, lastName })
    })
  })
  describe('User Object Parsing', () => {
    const firstName = 'Anthony'
    const lastName = 'Falcon'
    const email = 'anthony@mymail.com'
    const phone = '(000) 123-4567'

    it('should return new object with parsed fields', () => {
      const parsedItem = parseItem({ firstName, lastName, email, phone })
      expect(parsedItem).toMatchObject({
        firstName,
        lastName,
        email,
        phone: '0001234567'
      })
    })
    it(`should return new object with missing, falsey, or incorrectly formatted fields parsed to ${NA}`, () => {
      const parsedItem = parseItem({ firstName: '', email: 'wrong@wrong', phone: null })
      expect(parsedItem).toMatchObject({
        firstName: NA,
        lastName: NA,
        email: NA,
        phone: NA
      })
    })
  })
  describe('Fetching, parsing, and saving data from api to output.json', () => {
    const outputFilePath = './output.json'
    fs.unlinkSync(outputFilePath)

    it('should correctly fetch and parse data from the API', async done => {
      expect.hasAssertions()

      const parsedData = await fetchAndParseData(API_ENDPOINT)
      expect(parsedData).toBeTruthy()
      expect(Array.isArray(parsedData)).toBeTruthy()
      parsedData.forEach(parsedUser => {
        expect(typeof parsedUser.firstName).toEqual('string')
        expect(typeof parsedUser.lastName).toEqual('string')
        expect(typeof parsedUser.phone).toEqual('string')
        expect(typeof parsedUser.email).toEqual('string')
      })
      fs.writeFileSync(outputFilePath, JSON.stringify(parsedData, null, 2), 'utf8')
      expect(fs.existsSync(outputFilePath)).toEqual(true)
      done()
    })
  })
})
