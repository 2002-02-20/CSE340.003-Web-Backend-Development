// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../utilities/inventory-validation")
const managementController = require("../controllers/managementController")

//router.get("/", managementController.buildManagement)

// inventoryRoute.js — verifica que esto esté así
router.get("/", utilities.checkAccountType, utilities.handleErrors(invController.buildManagement))

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build add classification view
router.get("/add-classification", utilities.checkAccountType, invController.buildAddClassificationView);

// Route to build add vehicle view
router.get("/add-vehicle", utilities.checkAccountType, invController.buildAddVehicleView);

// Route to add new vehicle
router.post("/add-vehicle", utilities.checkAccountType,
  validate.inventoryRules(),
  validate.checkInventory,
  utilities.handleErrors(invController.addVehicle)
);

router.get("/delete/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.deleteView));

//UPDATE VEHICLE ITEM
router.get("/edit/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.editInventoryView));

router.post("/update/", utilities.checkAccountType,
  validate.inventoryRules(),
  validate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);


// Route to add new classification
router.post("/add-classification", utilities.checkAccountType, validate.classificationRules(), validate.checkClassification,
  utilities.handleErrors(invController.addClassification)
);


router.post("/delete", utilities.checkAccountType, utilities.handleErrors(invController.deleteItem))




module.exports = router;