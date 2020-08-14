// Define what you want `currentUser` to return throughout your app. For example,
// to return a real user from your database, you could do something like:
//
//   export const getCurrentUser = async ({ email }) => {
//     return await db.user.findOne({ where: { email } })
//   }
import { context } from '@redwoodjs/api'
import { AuthenticationError } from '@redwoodjs/api'
import { db } from './db'
// export const getCurrentUser = async (decoded, { token, type }) => {
//   return decoded
// }

// Use this function in your services to check that a user is logged in, and
// optionally raise an error if they're not.

export const requireAuth = () => {
  console.log('Issued from requireAuth()')
  console.log(context)
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}

export const getUserServer = async () => {
  return context.currentUser;
}

export const getCurrentUser = async (decoded, { type, token }) => {
  // console.log(decoded)
  // Defined in auth0 Rules
  const email = decoded["http://localhost:8910/email"]
  if (!email) {
    throw new AuthenticationError('Uh oh, no email')
  }
  let user = await db.user.findOne({ where: { email } })
  if (!user) {
    user = await db.user.create({ data: { email } })
  }
  return user
}

export const createUser = async (name, email) => {
  return await db.user.create({
    data: { name, email }
  })
}