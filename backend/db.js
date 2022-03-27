const mongoose = require('mongoose')
require("dotenv").config();
console.log(process.env.MONGO_KEY)
const url = `mongodb+srv://testing:${process.env.MONGO_KEY}@cluster0.hfncg.mongodb.net/stackoverflow?retryWrites=true&w=majority`


module.exports.connect = () => {
    mongoose.connect(url)
    .then((res) => console.log("MongoDb is connected"))
    .catch((err) => console.log("Error ", err));
}