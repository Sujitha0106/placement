const { createUser, login, Updateuser, getUserByID } = require('./usercontroller');
const router = require("express").Router();
const { checkToken } = require("../auth/token");
const { userValidationResult, loginValidator } = require("../auth/validation")
router.post("/register", loginValidator, userValidationResult, createUser);
router.post("/signin", login);
router.put("/update/:id", checkToken, loginValidator, userValidationResult, Updateuser);
router.get("/registration/:id", getUserByID);

module.exports = router;