const express = require(`express`);
const routes = express.Router();
const userController = require('../controller/auth');
const authJWT = require('../middlewires/auth');

routes.post('/auth/Sign_up',userController.postSignUp);
routes.get('/auth/Sign_up_all_users',userController.getAllUsers);
routes.get('/auth/userid/:id',userController.getbyUserId);
routes.post('/auth/adminSignIn',userController.postAdminSignIn);
routes.post('/auth/UserSignIn',userController.postSignIn);
routes.patch('/auth/update/:id',userController.updateUser);



module.exports = routes;