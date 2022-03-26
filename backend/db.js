const mongoose = require('mongoose')
//Fwxr3uWOFPJmU1m0
const url = "mongodb+srv://testing:Fwxr3uWOFPJmU1m0@cluster0.hfncg.mongodb.net/stackoverflow?retryWrites=true&w=majority"

module.exports.connect = () => {
    mongoose.connect(url)
    .then((res) => console.log("MongoDb is connected"))
    .catch((err) => console.log("Error ", err));
}