import { AuthenticationClient, ManagementClient } from "auth0";
import { db } from 'src/lib/db'

export const userManagers = () => {
  return db.userManager.findMany()
}

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
})

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  scope: 'read:users update:users',
})



export const fetchUserProfileByToken = async (token) => {
  try {
    const auth0User = await auth0.getProfile(token)
    console.log(auth0User)
    return {
      email: auth0User.email,
      emailVerified: auth0User.email_verified,
      name: auth0User.name,
      nickname: auth0User.nickname,
      picture: auth0User.picture,
      userId: auth0User.user_id,
    }
  } catch (error) {
    console.log(error)
    throw new Error('Could not fetch profile')
  }
}