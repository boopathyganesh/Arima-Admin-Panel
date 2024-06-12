export const numberToIndianSystem = (inputValue) => {
  let x = inputValue ? parseFloat(inputValue) : parseFloat(0)
  let result = x.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
  return result
}
