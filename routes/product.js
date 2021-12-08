import express from 'express'
const router = express.Router()
import {addProduct,newProduct,viewProduct} from '../controllers/productController.js'




router.get('/product',addProduct)
router.post('/add-products',newProduct)
router.get('/view-product',viewProduct)

export default router