const MedicineType = require('../model/medicine_type');


exports.post = async (req,res)=>{
    try {
        const medicineId = req.body.medicineId;
        const image = req.file.filename;
        const name = req.body.name;
        const price = req.body.price;
       
      

        if (!medicineId || !name || !image || !price) {
            return res.status(400).json({ message: 'All fields are required' });
            
        }
        const existingMedicineTypes = await MedicineType.findOne({ name: name, medicineId: medicineId });

        if (existingMedicineTypes) {
            return res.status(400).json({ message: 'MedicineType with the same name already exists in this Medicine' });
        }


const medicineTypes = new MedicineType({

   image: image,
   name: name,
   price: price,
   medicineId: medicineId
});

await medicineTypes.save();
res.send({
    sucess: true,
    message: "MedicineType sucesssfully created !!",
    medicineTypes:medicineTypes
})

        
} catch (error) {
    console.error('MedicineType Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error });
}
}
