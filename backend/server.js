require('dotenv').config();
const express = require('express')
const cors =  require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const allowedOrigins = require('./configs/allowedOrigins')
const connectToMongoDB = require('./configs/database')
const AuthRoutes = require('./routes/AuthRoutes')
const AppRoutes = require('./routes/AppRoutes')
const exportRoutes = require('./routes/ExportRoutes');


//connect to db
connectToMongoDB()

const app = express()


// enable CORS - Cross Origin Resource Sharing
app.use(cors({origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));


// app.use('/api', appRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api', AppRoutes)
app.use('/api/export', exportRoutes) //google sheets export

app.listen(process.env.PORT,()=>{
    console.log("server is up on port: " + process.env.PORT)
})

module.exports = app;