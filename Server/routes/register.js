const express=require('express');
const router=express.Router();
const registerController=require('../controllers/registorController');
router.post('/',registerController.handleNewUser)
module.exports=router;