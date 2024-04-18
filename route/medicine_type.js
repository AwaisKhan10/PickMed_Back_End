const express =  require(`express`);
const routes = express.Router();
const medicineTypeController = require('../controller/medicine_type');
const upload = require('../middlewires/upload');



routes.post('/medicineType/medicines',upload.single('image'),medicineTypeController.post);



module.exports  = routes;