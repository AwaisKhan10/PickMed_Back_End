const Medicine = require('../model/medicine');


exports.postMedicine = async(req,res)=>{
    try {
        
        const title = req.body.title;


        const medicine = await Medicine.findOne({title:title});

        if(medicine){
            return res.send({
                message: 'Medicine are already exist !!',
            });
        }

        const  medicineTitle = new Medicine({
            title: title
        });

        const medicinedata  = await medicineTitle.save();


        res.send({
            success: true,
            message: 'Medicine name post Sucessfully!!',
            medicine: medicineTitle,
        })


    } catch (error) {
   
            console.error('Medcine_Post error:', error);
            res.status(500).json({ success: false, message: 'Internal server error'});
  
    }
}

exports.getAllMedicines = async(req,res)=>{

    try {


        const medicines = await Medicine.find();
        const countMedicine = await Medicine.countDocuments();

        if(!medicines){
            res.send({
                message: 'Medicine are not avialable !!',
            })
        }
        

        res.send({
            success: true,
            message: "Medicine are get sucessfully !!",
            countMedicine: countMedicine,
            medicines: medicines,
        })
    } catch (error) {
        
        console.error('getAll_Medicines error:', error);
        res.status(500).json({ success: false, message: 'Internal server error'});
    }
}