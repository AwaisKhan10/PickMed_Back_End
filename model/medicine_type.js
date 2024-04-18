const mongoose = require('mongoose');

const MedicineTypes = new mongoose.Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    
    image:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required:true
    },
    // desciption:{
    //     type: String,
    //     required:true
    // },
    
});

module.exports = mongoose.model('MedicineTypes', MedicineTypes);