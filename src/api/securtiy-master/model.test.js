import { SecurtiyMaster } from '.'

let securtiyMaster

beforeEach(async () => {
  securtiyMaster = await SecurtiyMaster.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = securtiyMaster.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(securtiyMaster.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = securtiyMaster.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(securtiyMaster.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
