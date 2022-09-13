const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { urlencoded } = require('express');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { default: mongoose } = require('mongoose');
const passport = require('passport')
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy
const authController = require('../src/app/controllers/AuthController');
var bcrypt = require('bcrypt-nodejs')
const MongoStore = require('connect-mongo');
const app = express();
const port = 3000;
const route = require('./routes');
var userRoutes = require('./routes/user')
const db = require('./config/db');
const Register = require('./app/models/Register');
const Cart = require('./app/models/Cart');
// const router = require('./routes/cart');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });  
var bodyParser = require('body-parser');
const Category = require('./app/models/Category');
var parseForm = bodyParser.urlencoded({ extended: false })
//Connect to DB
db.connnect();
require('./config/passport')(passport);



app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
// app.use(morgan('combined'))
app.use(methodOverride('_method'))
//Template engine
app.engine('handlebars', handlebars.engine({
  helpers: {
    sum: (a, b) => a + b,
    nhan: (a, b) => a * b,
    isdefined: (a) => {
      return a !== undefined;
    },
    exits:(a) => {
      return a == 'Đã Giao Hàng';
    },
    zero: (a) => {
      return a == 0;
    },
    load:(a) => {
      return a == 'Đang Xử Lý';
    },
    handlex:(a) => {
      return a == 'Đang Giao Hàng';
    },
    admin:(a) => {
      return a == '1'
    },
    discount:(a, b) =>{
      return a - (a*b)/100;
    }
    
  }
}));

app.use(cookieParser())
app.use(session({
  secret: 'notsecret',
  store: MongoStore.create({mongoUrl:'mongodb://localhost:27017/mazir_shop_dev'}),
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 180 * 60 * 1000}
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
//public folder CSS
app.use(express.static(path.join(__dirname, 'public')));

//cookie


// app.use(expressValidator({
//   errorFormatter: function(param, msg, value){{
//     var namespace = param.split('.')
//     , root = namespace.shift()
//     , formParam = root;
//     while (namespace.length) {{
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param: formParam,
//       msg: msg,
//       value: value
//     }
//   }
//   }}
// }))
Category.find({}).lean()
  .then(category => 
    app.locals.category = category
    )

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated()
  res.locals.session = req.session
  next()
})
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.locals.errors = null;


app.get('*', function(req, res, next){
  res.locals.cart = req.session.cart;
  res.locals.user = req.user || null;
  next();
})



app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));
// Routes
route(app);
// app.use('/user', userRoutes)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
