export default class ListNode {
  key: any;
  val: any;
  next: any;
  prev: any;
  constructor(key?: any, val?: any) {
    this.key = key
    this.val = val
    this.next = null
    this.prev = null
  }
}