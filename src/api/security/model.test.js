import { Security } from '.'

let security

beforeEach(async () => {
  security = await Security.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = security.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(security.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = security.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(security.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
