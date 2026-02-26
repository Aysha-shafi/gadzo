import express from 'express';
import { listProducts,addProduct,removeProduct,singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

//route to add product
productRouter.post('/add',adminAuth ,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct);

//route to list products
productRouter.get('/list', listProducts);

//route to remove product
productRouter.post('/remove',adminAuth ,removeProduct);

//route to get single product info
productRouter.post('/single', singleProduct);

export default productRouter;