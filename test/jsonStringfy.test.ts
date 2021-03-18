import jsonStringfy from '../src/jsonStringfy'

describe('jsonStringfy', () => {
  it('null', () => {
    let n1 = null
    expect(jsonStringfy(n1)).toBe(JSON.stringify(null))
  })
  it('undefined', () => {
    let n2 = undefined
    expect(jsonStringfy(n2)).toBe(JSON.stringify(undefined))
  })
  it('bool', () => {
    let n3 = true
    let n4 = false
    expect(jsonStringfy(n3)).toBe(JSON.stringify(true))
    expect(jsonStringfy(n4)).toBe(JSON.stringify(false))
  })
  it('NaN', () => {
    let n5 = NaN
    expect(jsonStringfy(n5)).toBe(JSON.stringify(NaN))
  })
  it('Infinity', () => {
    let n6 = -Infinity
    expect(jsonStringfy(n6)).toBe(JSON.stringify(-Infinity))
  })
  it('string', () => {
    let n7 = 'deft'
    expect(jsonStringfy(n7)).toBe(JSON.stringify(n7))
  })
  it('RegExp', () => {
    let n8 = new RegExp('\w')
    expect(jsonStringfy(n8)).toBe(JSON.stringify(n8))
  })
  it('Date', () => {
    let n9 = new Date()
    expect(jsonStringfy(n9)).toBe(JSON.stringify(n9))
  })
  it('Symbol', () => {
    let n10 = Symbol(1)
    expect(jsonStringfy(n10)).toBe(JSON.stringify(n10))
  })
  it('array', () => {
    let n11 = [1, 2, 3]
    expect(jsonStringfy(n11)).toBe(JSON.stringify(n11))
  })
  it('obj', () => {
    let n12 = {
      name: 'jack',
      age: 18,
      attr: ['coding', 123],
      date: new Date(),
      uni: Symbol(2),
      sayHi: function () {
        console.log('hi')
      },
      info: {
        sister: 'lily',
        age: 16,
        intro: {
          money: undefined,
          job: null
        }
      }
    }
    expect(jsonStringfy(n12)).toBe(JSON.stringify(n12))
  })
})
