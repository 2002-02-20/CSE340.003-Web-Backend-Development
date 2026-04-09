const utilities = require("../utilities/index.js")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/favorites-model")


/* ******************************
* Check login data and return errors or continue to login
* ***************************** */
validate.checkLoginPermission = async (req, res, next) => {

    if (!res.locals.accountData) {
        req.flash("notice", "Please log in.")
        return res.redirect("/account/login")
    }

    const accountType = res.locals.accountData.account_type
    if (accountType === 'Client') {
        return next()
    }

    req.flash("notice", "You do not have permission to access this page.")
    return res.redirect("/account/")
}


module.exports = validate