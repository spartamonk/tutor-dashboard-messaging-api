require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appezs25n28mMLRK4')
  .table('students')

exports.handler = async (event, context, cb) => {
 
  const { id } = event.queryStringParameters
  if (id) {
    try {
      const student = await airtable.retrieve(id)
      if (student.error) {
        return {
          headers: { 'Access-Control-Allow-Origin': '*' },
          statusCode: 404,
          body: `No student with id: "${id}"`,
        }
      }
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(student),
      }
    } catch (error) {
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 500,
        body: 'Server error',
      }
    }
  }
  try {
    const { records } = await airtable.list({ maxRecords: 400 })
    const students = records.map((i) => {
      const { id } = i
      const {
        firstName,
        lastName,
        image,
        date,
        lessonRequest,
        message,
        adminMessage,
        subject,
        level,
        contact,
        online,
        lessonRequirements,
        requestStatus,
        startTime,
        endTime,
        duration,
        tutorAddress,
        address,
        postcode,
      } = i.fields
      const imageUrl = image[0].url

      return {
        id,
        firstName,
        lastName,
        imageUrl,
        date,
        contact,
        adminMessage,
        lessonRequest,
        lessonDetails: {
          message,
          subject,
          level,
          online,
          lessonRequirements,
          requestStatus,
          startTime,
          endTime,
          duration,
          tutorAddress,
          address,
          postcode,
        },
      }
    })
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 200,
      body: JSON.stringify(students),
    }
  } catch (error) {
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 500,
      body: 'Server error',
    }
  }
 
}
