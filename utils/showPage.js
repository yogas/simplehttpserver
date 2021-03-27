const fs = require('fs')

const showPage = (page, {title, res, params={}}) => {
  const tpl = fs.readFileSync(`./pages/template.html`, 'utf-8')
  const content = fs.readFileSync(`./pages/${page}.html`, 'utf-8')
  let html = tpl.replace(/\$\{title\}/g, title).replace(/\$\{content\}/g, content)
  // replace params
  for (let key in params) {
    const regExp = new RegExp(`\\$\\{${key}\\}`, 'gm')
    html = html.replace(regExp, params[key])
  }
  res.setHeader('Content-type', 'text/html')
  res.write(html)
  return res.end()
}

module.exports = showPage