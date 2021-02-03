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
  return function cached(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  } as T
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
export function deepClone(obj: any, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
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
  emit: (type: string) => void
  addListener: (type: string, fn: any) => void
}

export class Emitter implements EmitterProps {
  events: any
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
 * curry
 */
export function curry(fn: any) {
  let allArgs: any = []
  return function temp(...args: any) {
    if (args.length === 0) {
      return fn.apply(temp, allArgs)
    } else {
      ;[].push.apply(allArgs, args)
      return temp
    }
  }
}

/**
 * isPalindrome
 */
export function isPalindrome(s: string): boolean {
  s = s.toLowerCase().replace(/[\W_]/g, '')
  if (s.length < 2) return true
  let left = 0
  let right = s.length - 1
  while (left < right) {
    if (s[left] !== s[right]) {
      return false
    }
    left++
    right--
  }
  return true
}

/**
 * reverse string
 */
export function reverseStr(s: string) {
  return s.split('').reverse().join('')
}

/**
 * unique
 */
export function unique(arr: any[]) {
  return [...new Set(arr)]
}

/**
 * debounce
 */
export function debounce(func: () => any, wait: number) {
  let timeout: NodeJS.Timeout
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}

/**
 * throttle
 */
export function throttle(func: () => any, wait: number) {
  let prev: number = 0,
    context: any,
    args: any
  return function () {
    let now = +new Date()
    context = this
    args = arguments
    if (now - prev > wait) {
      func.apply(context, args)
      prev = now
    }
  }
}

/**
 * 时间戳转化日期
 */
export function getFormatTime(time: number) {
  // init date
  const date = new Date(time)
  // get detail
  const getM = date.getMonth() + 1
  const getD = date.getDate()
  const getH = date.getHours()
  const getMin = date.getMinutes()
  const getSec = date.getSeconds()
  // set y m d h min sec
  const y = date.getFullYear()
  const m = getM < 10 ? `0${getM}` : getM
  const d = getD < 10 ? `0${getD}` : getD
  const h = getH < 10 ? `0${getH}` : getH
  const min = getMin < 10 ? `0${getMin}` : getMin
  const sec = getSec < 10 ? `0${getSec}` : getSec
  return {
    fmtDate: `${y}-${m}-${d}`,
    fmtTime: `${h}:${min}:${sec}`
  }
}

/**
 * 获取指定名称的 cookie 的值
 */
export function getCookie(name: string) {
  const arr = document.cookie.split(';')
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i].split('=')
    if (str[0].trim() === name) {
      return str[1]
    }
  }
}

/**
 * 写入 cookie
 */
export function setCookie(key, value) {
  const getExpire = new Date((new Date()).getTime() + 24 * 60 * 60000); // 有效期24小时
  const expire = `;expires=${getExpire.toUTCString()}`;
  document.cookie = `${key}=${value};path=/;domain=.qq.com${expire}`;
}

// 解析出query参数字段
// export function parseQueryKey(url) {
//   let urlParsed = new URL(url);
//   let result = [...urlParsed.searchParams].reduce((cur, [key, value]) => (cur[key] = value, cur), {});
//   return result;
// }

/**
 * 环境验证
 */ 
export function getUserAgent() {
  return (typeof navigator !== 'undefined' && navigator && navigator.userAgent) || '';
}
export const ua = getUserAgent();
export const isQQ = /\bQQ\/([\d.]+)/.test(ua);
export const isIOS = /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/.test(ua);
export const isAndroid = /\bAndroid\s*([^;]+)/.test(ua);
export const isWeiXin = navigator.userAgent.toLowerCase().search(/MicroMessenger/i) !== -1;// 当前是否在QQ浏览器中运行
export const qb = navigator.userAgent.toLowerCase();
export const isQQBrowser = !!qb.match(/mqqbrowser|qqbrowser|nowsdk/i);


/**
 * 查询 URL 中的参数值
 * @param name 
 */
export function query(name: string) {
  return location.search.match(new RegExp(`(\\?|&)${name}=([^&]*)(&|$)`)) ? decodeURIComponent(RegExp.$2) : '';  
}
