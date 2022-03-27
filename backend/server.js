const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();
const db = require("./db")
require("dotenv").config();
const PORT = process.env.PORT || 80;
const router = require('./routers')
console.log(PORT)
//db connections
//using .connect defined in db.js to connect with database
db.connect()

//middleware
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))

app.use(express.json())

//headers
app.use((req,res,next)=>{
    res.header('Access-control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

//api
app.use('/api', router)

//static path to run frontend and backend together
app.use('/upload', express.static(path.join(__dirname, '/../uploads')))
app.use(express.static(path.join(__dirname, '/../frontend/build')))

app.get('*', (req, res) =>{
    try{
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
    } catch(e){
        res.send('Oops! error sending file')
    }
    
})

//cors
app.use(cors())

//server listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})