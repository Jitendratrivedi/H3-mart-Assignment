const express = require('express');
const router = express.Router();
const creatorController=require("../controller/creatorController")
const categoryController=require("../controller/categoryController")
const productController=require("../controller/productController")
router.post('/creator',creatorController.creator)
router.post('/createCategory',categoryController.createCategory)
router.put('/updatePrice/:title',productController.updatePrice)

router.get("//api.storerestapi.com/products/:productId",productController.getProductById)
module.exports = router;