const express = require(`express`);
require(`dotenv`).config();
const app = express();
const mongoose = require(`mongoose`);
const PORT = process.env.PORT;
const mongodb = process.env.MOONGOOSE_URL;
const bodyParser = require(`body-parser`);
console.log(PORT);
console.log(mongodb);

///
/// express urlencoded and Json 
///
///  js Code going to json not come back into js 
///
///


app.use(express.json());
app.use(express.urlencoded({extended:false}));

///
/// bodyParser urlencoded and Json
///
///  Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
///
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



///
/// Server data 
///
app.get('/', (req,res)=>{
    try {
        res.send('Hello Awais khan Your Server Can be Connected !!!');
    } catch (error) {
        res.send(error);
    }
});


///
/// Routes 
///

const authRoute = require(`./route/auth`);
const medicineRoute = require(`./route/medicine`);
const medicintypeRoute = require(`./route/medicine_type`);
app.use(medicintypeRoute);
app.use(authRoute);
app.use(medicineRoute);



///
/// Database Connection
///
mongoose.connect(mongodb).then(()=>{

    app.listen(PORT,()=>{
        console.log(`Server running on ${PORT}`);
        console.log(`DataBase is Connected Sucessfully !!!`);
    });

}).catch(()=>{
    console.log(`DataBase is Not Connected`);
});
