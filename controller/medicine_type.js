const { countDocuments } = require('../model/auth');
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

exports.getAllMedicines = async (req,res)=>{

   try {
    const medicinesdata = await MedicineType.find();
    const allmedicines = await MedicineType.countDocuments();

    if(!medicinesdata){
        res.send({
            message: "No Data Found!!",
        });
    }

    res.send({

        success: true,
        allmedicines: allmedicines,
        message: "Medcincine data get Sucessfully!!",
        medicinesdata: medicinesdata,
       
    })
    
   } catch (error) {
    console.error('Medicine Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error });
   }

    
}


exports.getMedicineTypeId = async (req,res)=>{
    try {

        const id = req.params.id;
        const medcineData  = await MedicineType.findById(id);

        if(!medcineData){
            res.send({
                message: 'No Medcine type found!!',
            });

        }

        res.send({
            sucess: true,
            message: 'Medcine get by id Sucessfully!!!',
            medcineData: medcineData,
        });        
    } catch (error) {
        console.error('Medicine-id Error:',error);
        res.status(500).json({success:false,message: 'Internal server error',error: error});
    }
}

exports.update = async(req,res)=>{
    try {
        
        const id = req.params.id;
        const image = req.file;
        const name = req.body.name;
        const price = req.body.price;

        const medcineData  = await MedicineType.findById(id);

        if(!medcineData){
            res.send({
                message: 'No Medcine type found!!',
            });
        }

        medcineData.image = image || medcineData.image;
        medcineData.name = name || medcineData.name;
        medcineData.price = price || medcineData.price;

        const medicineUpdate = medcineData.save();       

        res.send({
            sucess: true,
            message: 'MedcineType update Sucessfully!!!',
            medcineData: medcineData,
        });        

    } catch (error) {
        console.error('Medicine-id Error:',error);
        res.status(500).json({success:false,message: 'Internal server error',error: error});
    }
}

exports.delete = async (req,res)=>{
    try {
        const id = req.params.id;
        const medicinedelete  = await MedicineType.findByIdAndDelete(id);
      console.log(medicinedelete);


      if (!medicinedelete) {
        return res.send({
            message: "Medicine data not found!!"
        });
    }
    
    res.send({
        success: true,
        message: "Medicine delete sucessfully !!",
        medicinedelete: medicinedelete,
    });
    
      
    } catch (error) {
      res.send({
        message: "Error"
    })
    }
  }