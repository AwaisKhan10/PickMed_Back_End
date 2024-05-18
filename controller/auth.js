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


exports.postAdminSignIn = async(req,res)=>{
try {


    const emails = 'awais.sf10@gmail.com';
    const passwords = '123456789';
    // Find by Users
    const {email,password} = req.body;

    const userData = User({
        emails: emails,
        passwords: passwords,
    });

       // Check if user exists
       if (email == emails && password == passwords) {
        let token = jwt.sign({ email: email }, "JWT_SECRET", {
          expiresIn: 86400, // 24 hours
        });
        
        const admin = userData.save();
      res.status(200).json({ success: true, message: "Logged in successfully", user: userData, token });

      }else{
        return  res.send({
            message: "Email And Password is InCorrect !!"
          })
      }

     

    
} catch (error) {
    console.log('postAdminSigIn', error);
    res.status(500).json({ success: false, message: 'Internal server error'});
}
}

exports.postSignIn = async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userdata = await User.findOne({email: email});

        if(!userdata){
            return res.send({
                success: false,
                message: 'Email not find !!'
            });
        }

        const comparePassword =  await bcryptjs.compare(password,userdata.password);
        if(!comparePassword){
            return res.send({
                success: false,
                message: "Password is incorrect!!",
            })
        }

            let token = jwt.sign({id: userdata._id}, "JWT_SECRET", {
                expiresIn: 86400, // 24 hours
              });

            res.send({
                success: true,
                message: 'user login sucessfully!!',
                userdata: userdata,
                token: token
            });        

    } catch (error) {
        console.log('Sign In Error', error);
        res.status(500).json({ success: false, message: 'Internal server error'});
    }
}



exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming you have userId from the token middleware
        const { email, fullname, address, phoneno } = req.body;

        const updateData = {};

        if (email) updateData.email = email;
        if (fullname) updateData.fullname = fullname;
        if (address) updateData.address = address;
        if (phoneno) updateData.phoneno = phoneno;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        res.send({
            success: true,
            message: "User profile updated successfully!",
            userData: updatedUser
        });
    } catch (error) {
        console.error('Update User error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};