// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/categories/new" page={NewCategoryPage} name="newCategory" />
      <Route path="/categories/{id:Int}/edit" page={EditCategoryPage} name="editCategory" />
      <Route path="/categories/{id:Int}" page={CategoryPage} name="category" />
      <Route path="/categories" page={CategoriesPage} name="categories" />
      <Route path="/" page={HomePage} name="home" />
      <Private unauthenticated="home">
        <Route path="/stores" page={StoresPage} name="stores" />
        <Route path="/stores/new" page={NewStorePage} name="newStore" />
        <Route path="/stores/{id:Int}/edit" page={EditStorePage} name="editStore" />
        <Route path="/stores/{id:Int}" page={StorePage} name="store" />
        <Route path="/items/new" page={NewItemPage} name="newItem" />
        <Route path="/items/{id:Int}/edit" page={EditItemPage} name="editItem" />
        <Route path="/items/{id:Int}" page={ItemPage} name="item" />
        <Route path="/items" page={ItemsPage} name="items" />
        <Route path="/shop" page={ShopPage} name="shop" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
