const fs = require('fs')
const url = require('url')
const showPage = require('./utils/showPAge')
const {getUsers, createUser} = require('./utils/user')

const routes = (req, res) => {
  const {url, method} = req

  switch(url) {
    case '/': {
      showPage('index', {title: 'Welcome page', res})
      break
    }
    case '/users': {
      const users = getUsers()
      showPage('users', {
        title: 'Users list', 
        params: {users}, 
        res
      })
      break
    }
    case '/create-user': {
      createUser(req, res)
      break
    }
    case '/assets/styles.css': {
      const css = fs.readFileSync('./assets/styles.css', 'utf-8')
      res.setHeader('Content-type', 'text/css')
      res.write(css)
      res.end()
      break
    }
    default: {
      showPage('404', {title: 'Error 404', res})
    }
  }
}

module.exports = routes