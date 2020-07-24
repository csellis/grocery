import { db } from 'src/lib/db'

export const userItems = () => {
  return db.userItem.findMany()
}

export const createUserItem = props => {
  console.log(props)
}