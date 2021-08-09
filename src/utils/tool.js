
/**
 * 复制
 *
 * @param {*} val 需要复制的内容
 * @param {*} message 复制成功的消息
 */
export const copy = (val, message) => {
  const mes = message || '复制成功!'
  const inp = document.createElement('input')
  inp.value = val
  document.body.appendChild(inp).setAttribute('readOnly', 'true')
  inp.select()
  inp.setSelectionRange(0, inp.value.length)
  document.execCommand('Copy')
  document.body.removeChild(inp)
  ctoast(mes)
}

/**
 *
 * 气泡消息提示
 * @export
 * @param {*} message
 * @param {*} time
 */
export function ctoast(message, time) {
  const el = document.createElement('div')
  el.style.cssText = 'z-index: 9999; position: fixed; top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0); background: rgba(0, 0, 0, 0.7); width: -webkit-fit-content; width: fit-content; min-width: 50px; max-width: 70%; padding: 8px 12px; border-radius: 8px; text-align: center; color: #fff;'
  el.innerHTML = message
  document.body.appendChild(el)
  const ti = time || 2000
  const timer = setTimeout(() => {
    document.body.removeChild(el)
    clearTimeout(timer)
  }, ti)
}

/**
 *
 * rgb转换为16进制颜色
 * @export
 * @param {*} arr
 * @param {*} newstr
 */
export function rgbToHex(arr) {
  if (!(arr instanceof Array)) {
    console.log(`error: function rgbToHex() params << ${arr} >> is not Array or lenght is not equal to 3`)
    return
  }
  let newstr = '#'
  for (var i = 0; i < arr.length; i++) {
    let str = parseInt(arr[i]).toString(16)
    if (str === '0') str += str
    newstr += str
  }
  return newstr
}

/**
 *
 * 16进制转换为rgb颜色
 * @export
 * @param {*} str
 */
export function hexToRgb(str) {
  if (!(typeof str === 'string')) {
    console.log(`error: function hexToRgb() params << ${str} >> must String`)
    return
  }
  let cstr = ''
  cstr = (str.indexOf('#') === -1 ? str.substr(0, 6) : str.substr(1, 6))
  if (cstr.length === 3) cstr += cstr.substr(0, 3)
  const r = parseInt(cstr.substr(0, 2), 16)
  const g = parseInt(cstr.substr(2, 2), 16)
  const b = parseInt(cstr.substr(4, 2), 16)
  return `${r},${g},${b}`
}
