const users = require('./users.json')

async function getUserByName (username) {

    for (const user of users) {
        if (username === user.username) return user
    }

    console.info(`User "${username}" not found`)
}

async function getUserById (id) {

    for (const user of users) {
        if (id == user.id)
            return user
    }

    console.log(`User ${id} not found`)
}

module.exports = { getUserByName, getUserById }
