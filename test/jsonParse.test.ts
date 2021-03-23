import jsonParse from '../src/jsonParse'

describe('json parse', () => {
  test('{a:1,b:2}', () => {
    const ret = jsonParse('{a:1,b:2}')
    expect(ret).toEqual({ a: 1, b: 2 })
    expect(ret.a).toBe(1)
  })
})
