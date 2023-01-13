require('dotenv').config()
const express = require('express');
const app = express();
const moongose = require('mongoose')
moongose.set("strictQuery", true)
moongose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      app.emit('pronto')
   })
   .catch(err => console.log(err))
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes')
const path = require('path')
const csrf = require('csurf')
const { middlawareGlobal, checkCsrfError, csrfMiddlaware } = require('./src/middlewares/middleware');


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
   secret: 'adsdsadasdadgsfdsfdsfdsesea',
   store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
   resave: false,
   saveUninitialized: false,
   useFindAndModify: false,
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
   },
})
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src' , 'views'))
app.set('view engine', 'ejs')

app.use(csrf())
// Nosso proprios middlawares
app.use(middlawareGlobal) 
app.use(checkCsrfError) 
app.use(csrfMiddlaware) 
app.use(routes) 

app.on('pronto', () => {
   app.listen(3000, ()=> {
      console.log('Acessar http://localhost:3000')
      console.log('Servidor executando na porta  3000')
   });
})