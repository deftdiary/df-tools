const rx_one = /^[\],:{}\s]*$/;
const rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
const rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
const rx_four = /(?:^|:|,)(?:\s*\[)+/g;

export default function jsonParse(jsonStr: string) {
  // if (rx_one.test(
  //   jsonStr.replace(rx_two, "@")
  //     .replace(rx_three, "]")
  //     .replace(rx_four, "")
  // ))
  return eval("(" + jsonStr + ")")
}