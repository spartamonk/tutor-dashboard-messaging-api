require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appezs25n28mMLRK4')
  .table('students')

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  if (id) {
    try {
     const student= await airtable.retrieve(id);
     if(student.error) {
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
  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 400,
    body: 'Please  provide student id',
  }
}
