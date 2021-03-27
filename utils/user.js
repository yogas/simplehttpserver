const fs = require('fs')
const parseBodyParams = require('./parseBodyParams')

const readDB = () => {
  let db = []
  let json = ''
  try {
    json = fs.readFileSync('./db/db.json', 'utf-8')
  } catch (err) { 
    console.log('Error: /db/db.json was not found')
  }
  if (json.trim() !== '') {
    db = JSON.parse(json)
  }
  return db
}

const addUserToDB = (user) => {
  const db = readDB()
  if (user.username) {
    db.push(user)
  }
  fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2), 'utf-8')
}

const createUser = (req, res) => {
  const body = []
  req.on('data', chunk => {
    body.push(chunk)
  })
  req.on('end', () => {
    const postBody = Buffer.concat(body).toString()
    const post = parseBodyParams(postBody)
    addUserToDB(post)
  })
  res.statusCode = 302
  res.setHeader('Location', '/')
  res.end()
}

const getUsers = () => {
  const db = readDB()
  const users = []
  db.forEach( ({username, first_name}) => {
    users.push(`<li>${first_name} (${username})</li>`)
  })
  return users.join('\n')
}

module.exports = {
  createUser,
  getUsers
}