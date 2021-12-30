require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appezs25n28mMLRK4')
  .table('students')

exports.handler = async (event, context, cb) => {
  const { id } = event.multiValueQueryStringParameters
  const method = event.httpMethod;
 if(method === 'GET') {
if (id) {
  try {
    const student = await airtable.retrieve(id)

    if (student.error) {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        statusCode: 404,
        body: `No student with id: "${id}"`,
      }
    }
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200,
      body: JSON.stringify(student),
    }
  } catch (error) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
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
      adminMessageSummary,
      message,
      adminMessage,
      adminMessageResolved,
      subject,
      level,
      contact,
      online,
      lessonRequirements,
      requestStatus,
      startTime,
      endTime,
      rate,
      tutorAddress,
      address,
      postcode,
      statusColor,
      notification1,
      notification2,
      weekly,
      requestMessage,
      starred,
      unread,
      archived,
      requestAction1,
      requestAction1Color,
      requestAction1BgColor,
      requestAction1BorderColor,
      requestAction1ClassName,
      requestAction2,
      requestAction2Color,
      requestAction2BgColor,
      requestAction2BorderColor,
      requestAction2ClassName,
      adminCaseResolveMessage,
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
      adminMessageResolved,
      adminCaseResolveMessage,
      lessonRequest,
      message,
      starred,
      unread,
      archived,
      adminMessageSummary,
      lessonDetails: {
        subject,
        level,
        online,
        lessonRequirements,
        requestStatus,
        startTime,
        endTime,
        rate,
        tutorAddress,
        address,
        postcode,
        statusColor,
        weekly,
        requestMessage,
        requestActions: [
          {
            requestAction1,
            requestAction1Color,
            requestAction1BgColor,
            requestAction1BorderColor,
            requestAction1ClassName,
          },
          {
            requestAction2,
            requestAction2Color,
            requestAction2BgColor,
            requestAction2BorderColor,
            requestAction2ClassName,
          },
        ],
      },
      initialNotifications: [notification1, notification2],
    }
  })
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: 200,
    body: JSON.stringify(students),
  }
} catch (error) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: 500,
    body: 'Server error',
  }
}
 }
  if(method === 'PUT') {
    try {
      const { id, unread } = JSON.parse(event.body);
      if(!id || !unread) {
        return {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          statusCode: 400,
          body: 'Please pass id and unread values',
        }
      }
      const fields ={unread: true}
      const item = await airtable.update(id, {fields});
      if(item.error) {
        return {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          statusCode: 400,
          body: JSON.stringify(item),
        }
      }
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        statusCode: 200,
        body: JSON.stringify(item),
      }
    } catch (error) {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        statusCode: 400,
        body: 'Please pass id and unread values',
      }
    }
  }
}
