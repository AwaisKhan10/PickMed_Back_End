const mongoose = require(`mongoose`);

const AuthSchema = new mongoose.Schema({

    email:{
        type: String,
    },
    fullname:{
        type: String,
    },
    address:{
        type: String,
    },
    phoneno:{
     type: String,
    },
    password:{
        type: String,
    },
});


module.exports = mongoose.model('SignUp',AuthSchema);
