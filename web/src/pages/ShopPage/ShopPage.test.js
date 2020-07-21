import { render } from '@redwoodjs/testing'

import ShopPage from './ShopPage'

describe('ShopPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShopPage />)
    }).not.toThrow()
  })
})
