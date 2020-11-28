import { Trade } from '.'

let trade

beforeEach(async () => {
  trade = await Trade.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = trade.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trade.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = trade.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trade.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
