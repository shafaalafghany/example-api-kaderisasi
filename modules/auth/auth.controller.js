const jwt = require('jsonwebtoken')
const { register, signIn, checkUserId } = require('./auth.service')
const { payloadCheck } = require('../../middleware/payload.middleware')
const { ERROR, SUCCESS } = require('../../utils/constant')

let payload

module.exports = {
    createAccount: (req, res) => {
        payload = {
            username: '',
            email: '',
            password: '',
        }
        const verify = payloadCheck(req.body, payload, ['username', 'email', 'password'])
        if (!verify.status) return ERROR(res, 501, false, verify.message)

        register(req.body, (error, result) => {
            if (error) return ERROR(res, 500, false, error)

            if (!result) return ERROR(res, 500, false, 'Internal server error')

            checkUserId({ id: result.insertId }, (errors, results) => {
                if (errors) return ERROR(res, 500, false, errors)

                const data = results[0]
                delete data.password
                data.token = jwt.sign({ user: data }, process.env.APP_KEY, {
                    expiresIn: (60 * 60 * 24 * 7),
                    algorithm: 'HS256'
                })

                return SUCCESS(res, 200, true, data)
            })
        })
    },
    signIn: (req, res) => {
        payload = {
            email: '',
            password: '',
        }

        const verify = payloadCheck(req.body, payload, ['email', 'password'])
        if (!verify.status) return ERROR(res, 501, false, verify.message)

        signIn(req.body, (error, result) => {
            if (error) return ERROR(res, 500, false, error)

            if (result.length === 0) return ERROR(res, 403, false, 'Incorrect email or password')
            const data = result[0]
            delete data.password
            data.token = jwt.sign({ user: data }, process.env.APP_KEY, {
                expiresIn: (60 * 60 * 24 * 7),
                algorithm: 'HS256',
            })

            return SUCCESS(res, 200, 'Sign in succesful', data)
        })
    }
}