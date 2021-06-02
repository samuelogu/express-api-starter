const routes = require('express').Router();
const user = require('../controllers/user.controller')
const auth = require('../middlewares/auth')
const check = require('../middlewares/check')
const validator = require('../middlewares/validator')
const schemas = require('../validators/user.validator')

routes.post("/register", [validator(schemas.register), check.email], user.register)
routes.get("/check-email/:email", [validator(schemas.checkEmail, 'params'), check.emailExist], user.checkEmail)
routes.get("/check-username/:username", [validator(schemas.checkUsername, 'params'), check.usernameExist], user.checkUsername)
routes.post("/login", validator(schemas.login), user.login)
routes.get("/verify/:token", validator(schemas.verify, 'params'), user.verify)
routes.post("/reset-password", validator(schemas.resetPassword), user.resetPassword)
routes.post("/forgot-password", [validator(schemas.checkEmail), check.email], user.forgotPassword)
routes.post("/refresh-token", [validator(schemas.refreshToken)], user.refreshToken)
routes.post("/logout", [auth, validator(schemas.refreshToken)], user.logout)
routes.post('/change-password', [auth, validator(schemas.changePassword)], user.changePassword)


module.exports = routes
