const Router = require('express')
const router = new Router()
const RegisterController = require('../controllers/user/registerController')
const AuthController = require('../controllers/user/authController')
const RefreshTokenController = require('../controllers/user/refreshTokenController')
const LogoutController = require('../controllers/user/logoutController')
const verifyJWT = require('../middleware/verifyJWT')
const userController = require('../controllers/user/userController')

router.post("/registration", RegisterController.create);
router.post("/auth", AuthController.handleLogin);
router.get("/refresh", RefreshTokenController.handleRefreshToken);
router.get("/logout", LogoutController.handleLogout);
router.put("/update", verifyJWT, userController.update);
router.get("/myprofile", verifyJWT, userController.getProfile);
router.delete("/userdel", userController.deleteUserById)

module.exports = router