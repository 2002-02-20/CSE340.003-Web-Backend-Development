//Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")


router.get("/login", (accountController.buildLogin))
// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))


router.get("/register", (accountController.buildRegister))

router.post("/register",regValidate.registationRules(),regValidate.checkRegData, (accountController.registerAccount)
)

module.exports = router;