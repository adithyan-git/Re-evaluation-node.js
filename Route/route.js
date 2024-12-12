const express= require('express');
const { registration, userLogin, displayProfile, updateProfile, deleteProfile, addProduct, updateProduct, deleteProduct, displayProducts, displayUsers } = require('../Controller/controller');
const { authentication, authorization } = require('../MiddleWare/auth');

const router = express.Router();
router.route('/register').post(registration);
router.route('/login').post(userLogin);
router.route('/viewprofile/:id').get(authentication,displayProfile);
router.route('/editprofile/:id').put(authentication,updateProfile);
router.route('/deleteprofile/:id').delete(authentication,deleteProfile);
router.route('/addproduct').post(authentication,authorization('seller,admin'),addProduct);
router.route('/updateproduct/:id').put(authentication,authorization('seller,admin'),updateProduct);
router.route('/deleteproduct/:id').delete(authentication,authorization('seller,admin'),deleteProduct);
router.route('/displayproduct').get(authentication,displayProducts);
router.route('/displayusers').get(authentication,authorization('admin'),displayUsers)


module.exports = router;