const User = require('../model/auth');
const bcryptjs = require(`bcryptjs`);
const jwt = require('jsonwebtoken');



exports.postSignUp = async (req,res)=>{
    try {
        
        const email = req.body.email;
        const fullname = req.body.fullname;
        const address = req.body.address;
        const phoneno = req.body.phoneno;
        const password = req.body.password;

        const confirmEmail  = await User.findOne({email: email});

        if(confirmEmail){
            return res.send({
                message: 'User email is already used !!'
            })
        }

        const encryptPassword = await bcryptjs.hash(password,10);



        const userData = new User({
            email: email,
            fullname: fullname,
            address: address,
            phoneno: phoneno,
            password: encryptPassword,
        });
let token = jwt.sign({id: userData._id}, "JWT_SECRET",{  
    expiresIn: 86400, // 24 hours  
});
  // Save the user data
  await userData.save();
        res.send({
            success: true,
            message: "user SignUp Sucessfully !!",
            userData: userData,
            token: token

        });



        
    } catch (error) {
        console.error('Sign_Up error:', error);
        res.status(500).json({ success: false, message: 'Internal server error'});
    }
}


exports.getAllUsers = async (req,res)=>{

    try {

        const userData = await User.find();
        const userCount = await User.countDocuments();
        
        if(!userData){
            return res.send({
                success: true,
                message: "no user exist !",
                userData: userData,
                userCount: userCount,
            });
        }

        res.send({
            success: true,
            message: 'All Users data get Sucessfully !!',
            userCount: userCount,
            userData: userData
        });
        
    } catch (error) {
        console.error('All-users error:', error);
        res.status(500).json({ success: false, message: 'Internal server error'});
    }
}


exports.getbyUserId = async (req,res)=>{
    try {

        const id = req.params.id;
        console.log(id);
        const user = await User.findById(id);
        console.log(user);

        if(!user){
            return res.send({
                message: 'No User Found!!',
            });
        }
res.send({
    success: true,
    message: "user found sucessfully!!",
    user: user,
});
        
    } catch (error) {
        console.log('User id',error);
        res.status(500).json({ success: false, message: 'Internal server error'});
    }
}