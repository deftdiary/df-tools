import { camelize } from '../util'

test('camelize function test', () => {
  const foo1 = 'get-element-by-id'
  const foo2 = 'Aaa-bbb-ccc'
  const ret1 = camelize(foo1)
  const ret2 = camelize(foo2)
  expect(ret1).toBe('getElementById')
  expect(ret2).toBe('AaaBbbCcc')
})
