const express = require('express')
const connectDB = require('./db/connect_db')
const app = express()
const port = 3000
const bodyParser=require('body-parser')
var session = require('express-session')
var flash = require('connect-flash');
const router = require('./routes/web')
const cookieParser = require('cookie-parser')
app.use(cookieParser())


//file upload image
const fileUpload = require("express-fileupload");
app.use(fileUpload({useTempFiles: true}));

//setup ejs
app.set('view engine','ejs')

//static files path
app.use(express.static('public'))

//body parser
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))

//message
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  
}));

app.use(flash());

//router link
app.use('/',router)



//conection mongo db
connectDB()

//server create
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 