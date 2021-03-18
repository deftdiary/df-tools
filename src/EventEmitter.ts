/**
 * EventEmitter
 */
class EventEmitter {
  private _events: Map<string, Function[]>
  private _maxLen: number
  constructor() {
    this._events = this._events || new Map() // 发布订阅中心
    this._maxLen = this._maxLen || 10 // 设置监听上限
  }

  addListener(type: string, fn: Function): void {
    const handler = this._events.get(type)
    if (!handler) {
      this._events.set(type, [fn])
    } else {
      if (handler.length >= this._maxLen) return
      handler.push(fn)
    }
  }

  emit(type: string, ...args: any[]): void {
    let handler: Function[]
    handler = this._events.get(type)
    handler.forEach(handle => {
      if (args.length > 0) {
        handle.apply(this, args)
      } else {
        handle(args)
      }
    })
  }

  removeListener(type: string, fn: Function) {
    let handler = this._events.get(type)
    handler.forEach((handle, idx) => {
      if (handle === fn) handler.splice(idx, 1)
    })
  }

  once(type: string, fn: Function) {
    const cb = (...args: any[]) => {
      fn(...args)
      this.removeListener(type, cb)
    }
    this.addListener(type, cb)
  }

  changeMaxLen(num: number) {
    this._maxLen = num > 0 ? num : 10
  }
}

export default EventEmitter