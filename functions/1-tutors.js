//domain/.netlify/functions/1-tutors


exports.handler= async(event, context, cb) => {
 return {
   headers: { 'Access-Control-Allow-Origin': '*' },
   statusCode: 200,
   body: 'Hello, World!',
 }
}