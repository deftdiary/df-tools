/**
 * Camelize string
 */
const camelizeRE = /-(\w)/g
export const camelize = (str: string, big?: boolean): string => {
  return big
    ? str.charAt(0).toUpperCase() +
        str.slice(1).replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
    : str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * cache
 */
export function cached<T extends (str: string) => any>(fn: T): T {
  const cache = Object.create(null)
  return (function cached(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}

/**
 * compose
 */
export function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return (v: any) => v
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)))
}

/**
 * deepClone
 */
export function deepClone (obj: any, hash = new WeakMap()){
  if (obj === null || typeof obj !== 'object')  return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  if (hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  hash.set(obj, cloneObj)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

/**
 * emitter
 */
interface EmitterProps {
  emit: (type: string) => void;
  addListener: (type: string, fn: any) => void;
}

class Emitter implements EmitterProps {
  events: any;
  constructor() {
    this.events = this.events || new Map()
  }

  addListener(type: string, fn: any) {
    if (!this.events.get(type)) {
      this.events.set(type, fn)
    }
  }

  emit(type: string, ...args: any[]) {
    let handle = this.events.get(type)
    handle.apply(this, [...args])
  }
}

/**
 * throttle
 */
function throttle() {
  
}