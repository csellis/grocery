// export const handler = async (event, context) => {
//   console.log("hey world")
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       data: 'updateUserOnLogin function',
//     }),
//   }
// }

module.exports = (req, res) => {
  console.log("Sent")
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  })
}