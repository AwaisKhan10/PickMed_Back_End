const express = require(`express`);
const routes = express.Router();
const medicineController = require('../controller/medicine');


routes.post('/medicine/title',medicineController.postMedicine);

routes.get('/medicine/getAll-Medicines',medicineController.getAllMedicines);

module.exports = routes;