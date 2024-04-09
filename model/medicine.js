const mongoose = require(`mongoose`);


const MedicineSchema = new mongoose.Schema({
    title:{
        type: String
    }
});



module.exports = mongoose.model('Medicine',MedicineSchema);