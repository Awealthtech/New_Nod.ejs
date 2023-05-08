const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
// const {authCheck} = require("../middleware/index")


router.post("/signup", authController.signup_user);
router.get("/signup", authController.signup_get);
router.get("/login", authController.login);
router.post("/login", authController.login_get);
router.get('/', authController.index_get);
router.get('/about', authController.about_get);
router.get('/profile', authController.profile);
router.get('/post', authController.create_post);
router.post('/post', authController.get_post);
router.get('/logout', authController.logout);

module.exports = router;
