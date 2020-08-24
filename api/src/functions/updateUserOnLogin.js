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

export const handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json ' },
    body: JSON.stringify({ event, context }),
  }
}