//domain/.netlify/functions/2-students

exports.handler = async (event, context, cb) => {
  return {
   headers: {'Access-Control-Allow-Origin': "*"},
    statusCode: 200,
    body: 'Hello World',
  }
}
