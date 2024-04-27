const express =  require(`express`);
const routes = express.Router();
const medicineTypeController = require('../controller/medicine_type');
const upload = require('../middlewires/upload');



routes.post('/medicineType/medicines',upload.single('image'),medicineTypeController.post);


routes.get('/medicineType/All-medicines',medicineTypeController.getAllMedicines);
routes.get('/medicineType/medicinesbyId/:id',medicineTypeController.getMedicineTypeId);

routes.patch('/medicineType/medicines-update/:id',medicineTypeController.update);
routes.delete('/medicineType/medicines-delete/:id',medicineTypeController.delete);

module.exports  = routes;