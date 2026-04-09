// Needed Resources 
const express = require("express")
const router = new express.Router()
const favoritesController = require("../controllers/favoritesController")
const utilities = require("../utilities/")
const validatePermission = require("../utilities/favorite-validation")


// Route to build favorites view
router.get("/", utilities.checkLogin, validatePermission.checkLoginPermission, utilities.handleErrors(favoritesController.buildFavoritesCars))


// Route to add a favorite
router.post("/add/:inv_id", utilities.checkLogin, utilities.handleErrors(favoritesController.registerFavoriteCars))


// Route to delete a favorite
router.post("/delete/:fav_id", utilities.checkLogin, utilities.handleErrors(favoritesController.deleteFavoriteCar))

module.exports = router