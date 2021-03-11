import ListNode from '../src/ListNode'

describe('ListNode', () => {
  test('key val', () => {
    const listNode = new ListNode('y', 'x')
    expect(listNode.key).toBe('y')
    expect(listNode.val).toBe('x')
  })
  test('prev next', () => {
    const listNode1 = new ListNode('1', 'a')
    const listNode2 = new ListNode('2', 'b')
    listNode1.next = listNode2
    listNode2.prev = listNode1
    expect(listNode1.next).toBe(listNode2)
    expect(listNode2.prev).toBe(listNode1)
  })
})