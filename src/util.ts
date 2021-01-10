/**
 * Camelize string
 */
const camelizeRE = /-(\w)/g
export const camelize = (str: string, big?: boolean): string => {
  if (big) {return str.charAt(0).toUpperCase() + str.slice(1).replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')}
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

/**
 * 
 */
