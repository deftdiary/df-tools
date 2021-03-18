/**
 * JSON.stringfy polyfill
 */

export default function jsonStringfy(data: any): string {
  const type = typeof data
  if (type !== 'object') {
    let result = data
    if (Number.isNaN(data) || data === Infinity || data === -Infinity) {
      result = 'null'
    } else if (
      type === 'function' ||
      type === 'undefined' ||
      type === 'symbol'
    ) {
      return void 0
    } else if (type === 'string') {
      result = '"' + data + '"'
    }
    return String(result)
  } else if (type === 'object') {
    if (data === null) {
      return 'null'
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      return jsonStringfy(data.toJSON())
    } else if (data instanceof Array) {
      let result: any = []
      data.forEach((item, index) => {
        if (
          typeof item === 'undefined' ||
          typeof item === 'function' ||
          typeof item === 'symbol'
        ) {
          result[index] = 'null'
        } else {
          result[index] = jsonStringfy(item)
        }
      })
      result = '[' + String(result) + ']'
      return result.replace(/'/g, '"')
    } else if (data instanceof RegExp) {
      return '{}'
    } else {
      let result = []
      Object.keys(data).forEach((item) => {
        if (typeof item !== 'symbol') {
          if (
            data[item] !== undefined &&
            typeof data[item] !== 'function' &&
            typeof data[item] !== 'symbol'
          ) {
            result.push('"' + item + '"' + ':' + jsonStringfy(data[item]))
          }
        }
      })
      return ('{' + String(result) + '}').replace(/'/g, '"')
    }
  }
}
