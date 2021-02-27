import { camelize, isPalindrome, reverseStr, unique } from '../src/main'

describe('util test', () => {
  test('camelize function', () => {
    const foo1 = 'get-element-by-id'
    const foo2 = 'aaa-bbb-ccc'
    const ret1 = camelize(foo1)
    const ret2 = camelize(foo2, true)
    expect(ret1).toBe('getElementById')
    expect(ret2).toBe('AaaBbbCcc')
  })

  test('isPalindrome function', () => {
    const str = 'TENET'
    expect(isPalindrome(str)).toBeTruthy()
  })

  test('reverseStr function', () => {
    const str = 'hello world'
    const str1 = reverseStr(str)
    expect(str1).toBe('dlrow olleh')
  })

  test('unique function', () => {
    const arr = [1, 2, 2, 3, 4, 5, 5, 6]
    expect(unique(arr)).toEqual([1, 2, 3, 4, 5, 6])
  })
})
