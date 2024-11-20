export const randC = () => {
  const str = '#' + Math.random().toString(16).substr(2, 6)
  return str + str + str + str
}
