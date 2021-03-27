const parseBodyParams = (str) => {
  const keyValue = str.split('&')
  const params = {}
  keyValue.forEach(element => {
    const [key, value] = element.split('=')
    params[key] = value
  });
  return params
}

module.exports = parseBodyParams