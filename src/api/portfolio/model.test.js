import { Portfolio } from '.'

let portfolio

beforeEach(async () => {
  portfolio = await Portfolio.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = portfolio.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(portfolio.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = portfolio.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(portfolio.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
