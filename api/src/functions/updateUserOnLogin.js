// export const handler = async (event, context) => {
//   console.log("hey world")
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       data: 'updateUserOnLogin function',
//     }),
//   }
// }



// export const handler = async (event, context) => {
//   return {
//     statusCode: 201,
//     body: JSON.stringify(event),
//   }
// }

module.exports = (req, res) => {
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  })
}