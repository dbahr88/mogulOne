// ==========Dependencies=========
const express = require('express')
var twilio = require('twilio');
const ejs = require('ejs')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const sharp = require('sharp')
const path = require('path')
const multer = require('multer')
const dotenv = require('dotenv')
const LocalStrategy = require('passport-local').Strategy
const SequelizeStore = require('connect-session-sequelize')(session.Store)

dotenv.load();
const postgres_user = process.env.DB_USER;
const postgres_pass = process.env.DB_PASS;

// ---------------------------------------------------------
// =======SQL shell login setup=========
// ---------------------------------------------------------

const Op = Sequelize.Op
const sequelize = new Sequelize('mogulone', postgres_user, postgres_pass, {
	host: 'localhost',
	port: '5433', //david-port: 5433
	dialect: 'postgres',
	operatorsAliases:{
		$and: Op.and,
		$or: Op.or,
		$eq: Op.eq,
		$like: Op.like,
		$iLike: Op.iLike
	}
})


// User Talbe
const User = sequelize.define('user', {
	fname: Sequelize.STRING,
	lname: Sequelize.STRING,
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	email: Sequelize.STRING,
})

// // Prospective Talbe
// const Portfolio = sequelize.define('prospective', {
// 	fname: Sequelize.STRING,
// 	lname: Sequelize.STRING,
// 	username: Sequelize.STRING,
// 	password: Sequelize.STRING,
// 	email: Sequelize.STRING,
// })

// // Portfolio Talbe
// const Portfolio = sequelize.define('portfolio', {
// 	fname: Sequelize.STRING,
// 	lname: Sequelize.STRING,
// 	username: Sequelize.STRING,
// 	password: Sequelize.STRING,
// 	email: Sequelize.STRING,
// })

// ---------------------------------------------------------
// =======Photo storage in SQL - Defining the Table=========
// ---------------------------------------------------------

// const Pic = sequelize.define('pic',{
//     username: Sequelize.STRING,
//     image: Sequelize.STRING,
//     comment: Sequelize.STRING
// })



const sessionStore = new SequelizeStore({
    db: sequelize
  });

sequelize.sync()
sessionStore.sync();

// ---------------------------------------------------------
// ======Boilerplate=============== 
// ---------------------------------------------------------
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))



passport.serializeUser(function(user, done) {
		console.log("*********SerializeUser*********")
      done(null, user)
});
	passport.deserializeUser(function(obj,done){
		console.log("--deserializeUser--");
		console.log(obj)	
			done(null, obj);
	})

    // ---------------------------------------------------------
//================Start Passport Local Config===============
// ---------------------------------------------------------

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, processSignupCallback));   

function processSignupCallback(req, username, password, done) {
    User.findOne({
        where: {
            'username' :  username
				}
    })
    .then((user)=> {
        if (user) {
            return done(null, false);
        } else {

			let newUser = req.body; 
			User.create(newUser)
			.then((user)=>{
			   console.log("Yay!!! User created")
			    return done(null, user);
			})

		}	 
	})
}


// ---------------------------------------------------------
//==============Start of Passport Login==========
// ---------------------------------------------------------

// passport.use('local-login', new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true
// }, processLoginCallback));   

// function processLoginCallback(req, username, password, done) {
//     User.findOne({
//         where: {
//             'username' :  username
// 				},
//     })
//     .then((user)=> {
//         if (!user) {
//             return done(null, false);
//         }else if(password !== user.password){
// 						return done(null, false)
// 					}else{
// 			   console.log("Yay!!! User is logged in")

// 			    return done(null, user);
// 			  }
// 		})

// }	 


  app.use(require('morgan')('combined'));
	app.set('view engine', 'ejs')
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static('public'))
	app.use(cookieParser());

	app.use(session({ 
		secret: 'keyboard cat', 
		store: sessionStore,
		resave: false, 
		saveUninitialized: false 
	}));

// ---------------------------------------------------------
//================ Passport Middleware ==============
// ---------------------------------------------------------

app.use(passport.initialize());
 app.use(passport.session());


// ---------------------------------------------------------
//=========Routes==================
// ---------------------------------------------------------


// sets the home route
app.get('/', (req, res)=>{
	// if(req.user){
	return res.render('login')
})

app.get('/login',(req,res)=>{
	return res.render('login')
})

app.post('/login',(reg,res)=>{
	return res.render('dashboard')
})

// Registration Form Route from 'login'
app.get('/register', (req, res)=>{
	return res.render('register')
})

app.get('/homepage', (req, res)=>{
	return res.render('homepage')
})

// set routes to match EJS files
app.get('/dashboard', (req,res)=>{
	return res.render('dashboard')
})

app.get('/user', (req,res)=>{
	return res.render('user')
})

app.get('/research', (req,res)=>{
	return res.render('cashFlowCalculator')
})

app.get('/performance', (req,res)=>{
	return res.render('propertyperformance')
})

app.get('/tenants', (req,res)=>{
	return res.render('tenants')
})

app.get('/table', (req,res)=>{
	return res.render('table')
})

app.get('/typography', (req,res)=>{
	return res.render('typography')
})

app.get('/notifications', (req,res)=>{
	return res.render('notifications')
})

app.get('/icons', (req, res)=>{
	return res.render('icons')
})

app.get('/maps', (req, res)=>{
	return res.render('maps')
})

app.get('/notifications', (req, res)=>{
	return res.render('notifications')
})

app.get('/prospective', (req, res)=>{
	return res.render('prospective')
})

app.get('/paymentCalc', (req, res)=>{
	return res.render('paymentCalc')
})





 // ---------------------------------------------------------
//===Server ============
// ---------------------------------------------------------

app.listen(PORT, ()=>{
	console.log("Server is running...")
})
