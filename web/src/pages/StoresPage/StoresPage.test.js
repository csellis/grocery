import { render } from '@redwoodjs/testing'

import StoresPage from './StoresPage'

describe('StoresPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StoresPage />)
    }).not.toThrow()
  })
})
