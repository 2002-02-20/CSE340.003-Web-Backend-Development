const pool = require("../database/")

/* *****************************
*   Register new favorite
* *************************** */
async function registerFavorite(fav_account, fav_inventory){
  try {
    const sql = "INSERT INTO public.favorites (fav_account, fav_inventory) VALUES ($1, $2) RETURNING *"
    return await pool.query(sql, [fav_account, fav_inventory])
  } catch (error) {
    return error.message
  }
}

/* **********************
 *   Get for favorites
 * ********************* */
async function getFavorite(fav_account){
  try {
    const sql = "SELECT	a.fav_id, b.INV_ID, b.INV_MAKE,b.INV_MODEL,b.INV_DESCRIPTION,b.INV_IMAGE,b.INV_THUMBNAIL,b.INV_PRICE,b.INV_YEAR,b.INV_MILES,b.INV_COLOR FROM	PUBLIC.FAVORITES A	INNER JOIN PUBLIC.INVENTORY B ON A.FAV_INVENTORY = B.INV_ID WHERE FAV_ACCOUNT = $1"
    const favorite = await pool.query(sql, [fav_account])
    return favorite.rows
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Delete Favorites Item
 * ************************** */
async function deleteFavorite(fav_id) {
  try {
    const sql = 'DELETE FROM public.favorites WHERE fav_id = $1'
    const data = await pool.query(sql, [fav_id])
    return data.rowCount
  } catch (error) {
    console.error("Delete Favorite Error " + error)
    return 0
  }
}


module.exports = {
  registerFavorite, 
  getFavorite,
  deleteFavorite
};
