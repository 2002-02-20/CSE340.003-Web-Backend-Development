const favoriteModel = require("../models/favorites-model")
const utilities = require("../utilities/")


const favoriteCont = {}

/* ***************************
 *  registerFavoriteCars 
 * ************************** */
favoriteCont.registerFavoriteCars = async function (req, res, next) {

  const account_id = req.user.account_id
  const inventory_id = req.params.inv_id
  const data = await favoriteModel.registerFavorite(account_id, inventory_id)
  if (data && data.rowCount > 0) {
    req.flash("notice", "Your favorite has been added.")
    res.redirect(`/inv/detail/${inventory_id}`)
  } else {
    req.flash("notice", "Sorry, there was an error adding your favorite.")
    res.redirect(`/inv/detail/${inventory_id}`)
  }
}

/* ***************************
 *  Build Favorites Grid
 * ************************** */
favoriteCont.buildFavoritesCars = async function (req, res, next) {
 
  const account_id = req.user.account_id
  const data = await favoriteModel.getFavorite(account_id)
  const grid = await utilities.buildFavoriteGrid(data)
  let nav = await utilities.getNav()
  res.render("account/favorites", {
    title: 'Favorites Section',
    nav,
    grid,
    loggedin: true,
    accountData: req.user
  })
}

/* ***************************
 *  Remove Favorite Cars
 * ************************** */
favoriteCont.deleteFavoriteCar = async function (req, res, next) {
  const fav_id = req.params.fav_id
  const data = await favoriteModel.deleteFavorite(fav_id)
  if (data) {
    req.flash("notice", "Your favorite has been removed.")
    res.redirect("/account/favorites")
  } else {
    req.flash("notice", "Sorry, there was an error removing your favorite.")
    res.redirect("/account/favorites")
  }
}



module.exports = favoriteCont



/*
  const grid = await utilities.buildFavoriteGrid(data)
  let nav = await utilities.getNav()
  res.render("./detailsInventory/details", {
    title: 'Favorites Section',
    nav,
    grid,
  })

  */