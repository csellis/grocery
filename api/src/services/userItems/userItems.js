import { db } from 'src/lib/db'

export const userItems = () => {
  return db.userItem.findMany()
}
