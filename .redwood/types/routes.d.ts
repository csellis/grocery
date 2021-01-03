
            declare module '@redwoodjs/router' {
              interface AvailableRoutes {
                landing: () => "/"
newCategory: () => "/categories/new"
editCategory: () => "/categories/{id:Int}/edit"
category: () => "/categories/{id:Int}"
categories: () => "/categories"
stores: () => "/stores"
newStore: () => "/stores/new"
editStore: () => "/stores/{id:Int}/edit"
store: () => "/stores/{id:Int}"
newItem: () => "/items/new"
editItem: () => "/items/{id:Int}/edit"
item: () => "/items/{id:Int}"
items: () => "/items"
shop: () => "/shop"
plan: () => "/plan"
              }
            }

            import type CategoriesPageType from '/home/chris/Projects/grocerylist/web/src/pages/CategoriesPage/CategoriesPage'
import type CategoryPageType from '/home/chris/Projects/grocerylist/web/src/pages/CategoryPage/CategoryPage'
import type EditCategoryPageType from '/home/chris/Projects/grocerylist/web/src/pages/EditCategoryPage/EditCategoryPage'
import type EditItemPageType from '/home/chris/Projects/grocerylist/web/src/pages/EditItemPage/EditItemPage'
import type EditStorePageType from '/home/chris/Projects/grocerylist/web/src/pages/EditStorePage/EditStorePage'
import type FatalErrorPageType from '/home/chris/Projects/grocerylist/web/src/pages/FatalErrorPage/FatalErrorPage'
import type ItemPageType from '/home/chris/Projects/grocerylist/web/src/pages/ItemPage/ItemPage'
import type ItemsPageType from '/home/chris/Projects/grocerylist/web/src/pages/ItemsPage/ItemsPage'
import type LandingPageType from '/home/chris/Projects/grocerylist/web/src/pages/LandingPage/LandingPage'
import type NewCategoryPageType from '/home/chris/Projects/grocerylist/web/src/pages/NewCategoryPage/NewCategoryPage'
import type NewItemPageType from '/home/chris/Projects/grocerylist/web/src/pages/NewItemPage/NewItemPage'
import type NewStorePageType from '/home/chris/Projects/grocerylist/web/src/pages/NewStorePage/NewStorePage'
import type NotFoundPageType from '/home/chris/Projects/grocerylist/web/src/pages/NotFoundPage/NotFoundPage'
import type PlanPageType from '/home/chris/Projects/grocerylist/web/src/pages/PlanPage/PlanPage'
import type ShopPageType from '/home/chris/Projects/grocerylist/web/src/pages/ShopPage/ShopPage'
import type StorePageType from '/home/chris/Projects/grocerylist/web/src/pages/StorePage/StorePage'
import type StoresPageType from '/home/chris/Projects/grocerylist/web/src/pages/StoresPage/StoresPage'
            declare global {
              const CategoriesPage: typeof CategoriesPageType
const CategoryPage: typeof CategoryPageType
const EditCategoryPage: typeof EditCategoryPageType
const EditItemPage: typeof EditItemPageType
const EditStorePage: typeof EditStorePageType
const FatalErrorPage: typeof FatalErrorPageType
const ItemPage: typeof ItemPageType
const ItemsPage: typeof ItemsPageType
const LandingPage: typeof LandingPageType
const NewCategoryPage: typeof NewCategoryPageType
const NewItemPage: typeof NewItemPageType
const NewStorePage: typeof NewStorePageType
const NotFoundPage: typeof NotFoundPageType
const PlanPage: typeof PlanPageType
const ShopPage: typeof ShopPageType
const StorePage: typeof StorePageType
const StoresPage: typeof StoresPageType
            }
          