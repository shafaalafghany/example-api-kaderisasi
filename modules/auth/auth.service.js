const connection = require('../../utils/database')

const tableName = 'user'

module.exports = {
    register: (data, callback) => {
        connection.query(
            `insert into ${tableName} (username, email, password) values (?,?,?)`,
            [
                data.username,
                data.email,
                data.password,
            ],
            (err, res) => {
                if (err) { return callback(err) }

                return callback(null, res)
            }
        )
    },
    signIn: (data, callback) => {
        connection.query(
            `select * from ${tableName} where email = ? and password = ?`,
            [
                data.email,
                data.password,
            ],
            (err, res) => {
                if (err) { return callback(err) }

                return callback(null, res)
            }
        )
    },
    checkUserId: (data, callback) => {
        connection.query(
            `select * from ${tableName} where id = ?`,
            [
                data.id,
            ],
            (err, res) => {
                if(err) { return callback(err) }

                return callback(null, res)
            }
        )
    }
}