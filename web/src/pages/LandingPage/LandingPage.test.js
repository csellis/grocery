import { render } from '@redwoodjs/testing'

import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LandingPage />)
    }).not.toThrow()
  })
})
