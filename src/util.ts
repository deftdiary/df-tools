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
  const getExpire = new Date(new Date().getTime() + 24 * 60 * 60000) // 有效期24小时
  const expire = `;expires=${getExpire.toUTCString()}`
  document.cookie = `${key}=${value};path=/;domain=.qq.com${expire}`
}


/**
 * 环境验证
 */
export const getUserAgent = (): string =>
  (typeof navigator !== 'undefined' && navigator && navigator.userAgent) || ''

export const ua = getUserAgent()
export const isQQ = /\bQQ\/([\d.]+)/.test(ua)
export const isIOS = /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/.test(ua)
export const isAndroid = /\bAndroid\s*([^;]+)/.test(ua)
export const isWeiXin =
  navigator.userAgent.toLowerCase().search(/MicroMessenger/i) !== -1 // 当前是否在QQ浏览器中运行
export const qb = navigator.userAgent.toLowerCase()
export const isQQBrowser = !!qb.match(/mqqbrowser|qqbrowser|nowsdk/i)


/**
 * 查询 URL 中的参数值
 * @param name
 */
export function query(name: string) {
  return location.search.match(new RegExp(`(\\?|&)${name}=([^&]*)(&|$)`))
    ? decodeURIComponent(RegExp.$2)
    : ''
}


/**
 * 获取一个随机布尔值 (true/false)
 */
export const randomBoolean = (): boolean => Math.random() >= 0.5


/**
 * 检查日期是否为工作日
 */
export const isWeekday = (date: Date): boolean => date.getDate() % 6 !== 0


/**
 * 反转字符串
 */
export const reverse = (str: string): string => str.split('').reverse().join('')


/**
 * 检查当前 Tab 页是否在前台
 */
export const isBrowserTabInView = (): boolean => document.hidden


/**
 * 检查数字是否为偶数
 */
export const isEven = (num: number): boolean => (num & 1) === 0


/**
 * 数字地板除以 2
 */
export const divideTwo = (num: number): number => num >> 1

/**
 * 从日期中获取时间
 */
export const timeFromDate = (date: Date): string =>
  date.toTimeString().slice(0, 8)


/**
 * 保留小数点（非四舍五入）
 *
 * Examples
 * toFixed(25.198726354, 1);       // 25.1
 * toFixed(25.198726354, 2);       // 25.19
 * toFixed(25.198726354, 3);       // 25.198
 * toFixed(25.198726354, 4);       // 25.1987
 * toFixed(25.198726354, 5);       // 25.19872
 * toFixed(25.198726354, 6);       // 25.198726
 */
export const toFixed = (n: number, fixed: number): number =>
  ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed)


/**
 * 检查元素当前是否为聚焦状态
 */
export const elementIsInFocus = (el: HTMLElement): boolean =>
  el === document.activeElement


/**
 * 检查浏览器是否支持触摸事件
 * DocumentTouch 废弃 --MDN
 */
export const touchSupported = (): boolean => {
  // return ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)
  return 'ontouchstart' in window
}


/**
 * 检查当前用户是否为苹果设备
 */
export const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform)


/**
 * 滚动到页面顶部
 */
export const goToTop = (): void => window.scrollTo(0, 0)

/**
 * 获取所有参数平均值
 */
export const average = (...args: number[]): number =>
  args.reduce((a, b) => a + b) / args.length


/**
 * 转换华氏度/摄氏度
 */
export const celsiusToFahrenheit = (celsius: number): number =>
  (celsius * 9) / 5 + 32
export const fahrenheitToCelsius = (fahrenheit: number): number =>
  ((fahrenheit - 32) * 5) / 9


/**
 * Convert an Array-like object to a real Array.
 */
export function toarray(list: any, start?: number): any[] {
  start = start || 0
  let i = list.length - start
  const ret: any[] = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}


/**
 * Object.is polyfill
 */
export function is(x: unknown, y: unknown): boolean {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}


/**
 * 浅比较
 */
const hasOwn = Object.prototype.hasOwnProperty
export function shallowEqual(objA: unknown, objB: unknown): boolean {
  if (is(objA, objB)) return true

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
        !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}