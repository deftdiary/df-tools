import ListNode from './ListNode'

export default class LRUCache {
  public capacity: number
  private hash: Object
  private count: number
  private dummyHead: ListNode
  private dummyTail: ListNode
  constructor(capacity: number) {
    this.capacity = capacity
    this.hash = {}
    this.count = 0
    this.dummyHead = new ListNode()
    this.dummyTail = new ListNode()
    this.dummyHead.next = this.dummyTail
    this.dummyTail.prev = this.dummyHead
  }

  get(key: any) {
    let node = this.hash[key]
    if (node == null) return -1
    this.moveToHead(node)
    return node.val
  }

  put(key: any, val: any) {
    let node = this.hash[key]
    if (node == null) {
      if (this.count === this.capacity) {
        this.removeLRUItem()
      }
      let newNode = new ListNode(key, val)
      this.hash[key] = newNode
      this.addToHead(newNode)
      this.count++
    } else {
      node.val = val
      this.moveToHead(node)
    }
  }

  private moveToHead(node: ListNode) {
    this.removeFromList(node)
    this.addToHead(node)
  }

  private removeFromList(node: ListNode) {
    let temp1 = node.prev
    let temp2 = node.next
    temp1.next = temp2
    temp2.prev = temp1
  }

  private addToHead(node: ListNode) {
    node.prev = this.dummyHead
    node.next = this.dummyHead.next
    this.dummyHead.next.prev = node
    this.dummyHead.next = node
  }

  private removeLRUItem() {
    let tail = this.popTail()
    delete this.hash[tail.key]
    this.count--
  }

  private popTail() {
    let tail = this.dummyTail.prev
    this.removeFromList(tail)
    return tail
  }
}