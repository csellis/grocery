import { render } from '@redwoodjs/testing'

import LandingLayout from './LandingLayout'

describe('LandingLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LandingLayout />)
    }).not.toThrow()
  })
})
