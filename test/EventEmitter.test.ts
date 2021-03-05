import EventEmitter from '../src/EventEmitter'

let bus: EventEmitter
let fn: jest.Mock<any, any>
beforeEach(() => {
  bus = new EventEmitter()
  fn = jest.fn()
})

describe('test EventEmitter', () => {
  test('addListner and emit', () => {
    bus.addListener('hey', fn)
    bus.emit('hey', 'deft')
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledWith('deft')
  })

  test('removeListener', () => {
    bus.addListener('hey', fn)
    bus.emit('hey', 'deft')
    bus.removeListener('hey', fn)
    bus.emit('hey', 'deft')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('once', () => {
    bus.once('hey', fn)
    bus.emit('hey')
    bus.emit('hey')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('changeMaxLen', () => {
    bus.changeMaxLen(15)
    expect((bus as any)._maxLen).toBe(15)
    bus.changeMaxLen(0)
    expect((bus as any)._maxLen).toBe(10)
  })
})
