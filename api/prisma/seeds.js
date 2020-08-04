/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

async function main() {
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:
  //
  //   const existing = await db.user.findMany({ where: { email: 'admin@email.com' }})
  //   if (!existing.length) {
  //     await db.user.create({ data: { name: 'Admin', email: 'admin@email.com' }})
  //   }

  const items = ["Milk", "IPAs", "Beer", "Pizza"];
  const categories = ["Baby", "Bakery", "Beer", "Beverages",
    "Bread", "Breakfast & Cereals", "Candy", "Canned Goods & Soups", "Cheese", "Cleaning & Home", "Clothing", "Condiments", "Cookies & Crackers", "Dairy",
    "Deli Counter", "Diet Foods", "Eggs", "Frozen Foods", "Fruits & Vegetables", "Grains & Pasta", "Greeting Cards", "Hardware",
    "International Foods", "Juice", "Kosher", "Meat & Seafood", "Organic Foods", "Other", "Paper Goods", "Party Accessories", "Personal Care",
    "Pet Care", "Pharmacy", "Ready to Bake", "School & Office", "Side Dishes", "Snack Foods", "Sodas", "Spices & Baking", "Spirits", "Tea & Coffee", "Uncategorized", "Wine"
  ]

  categories.forEach(async name => {
    const exists = await db.category.findMany({
      where: {
        name
      }
    });

    if (!exists.length) {
      await db.category.create({
        data: {
          name
        }
      });
    }
  })

  console.log(`Adding ${categories.length} categories.`)

  // items.map(async name => {
  //   const exists = await db.item.findMany({
  //     where: {
  //       name
  //     }
  //   })

  //   if (!exists.length) {
  //     const item = await db.item.create({
  //       data: {
  //         name
  //       }
  //     });
  //     console.log(item)
  //   }
  // });
  // console.log(`Created ${items.length} items.`)
  // console.info('No data to seed. See api/prisma/seeds.js for info.')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.disconnect()
  })
