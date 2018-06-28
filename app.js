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

// ========DEFINE ALL TABLES===============




// User Table
// const User = sequelize.define('user', {
// 	fname: Sequelize.STRING,
// 	lname: Sequelize.STRING,
// 	username: Sequelize.STRING,
// 	password: Sequelize.STRING,
// 	email: Sequelize.STRING,
// })

// ======Prospective properties table====(database collumn names)
const Prospective = sequelize.define('prospective', {
	address: Sequelize.STRING,
	price: Sequelize.INTEGER,
	downpayment: Sequelize.FLOAT,
	financing: Sequelize.FLOAT,
	proptax: Sequelize.INTEGER,
	insurance: Sequelize.INTEGER,
	rents: Sequelize.INTEGER,
	utilities: Sequelize.INTEGER,
	maintenance: Sequelize.INTEGER,
	cashflow: Sequelize.FLOAT,
	cashoncash: Sequelize.FLOAT,
	caprate: Sequelize.FLOAT
})

// ======Owned properties table====(database collumn names)
const Owned = sequelize.define('owned', {
	address: Sequelize.STRING,
	price: Sequelize.INTEGER,
	downpayment: Sequelize.FLOAT,
	financing: Sequelize.FLOAT,
	proptax: Sequelize.INTEGER,
	insurance: Sequelize.INTEGER,
	rents: Sequelize.INTEGER,
	utilities: Sequelize.INTEGER,
	maintenance: Sequelize.INTEGER,
	cashflow: Sequelize.FLOAT,
	cashoncash: Sequelize.FLOAT,
	caprate: Sequelize.FLOAT
})
// // Portfolio Talbe
// const Portfolio = sequelize.define('portfolio', {
// 	fname: Sequelize.STRING,
// 	lname: Sequelize.STRING,
// 	username: Sequelize.STRING,
// 	password: Sequelize.STRING,
// 	email: Sequelize.STRING,
// })

// Tenants Table
const Tenant = sequelize.define('tenant',
    {
        name: Sequelize.STRING,
        addressten: Sequelize.STRING,
        unit: Sequelize.STRING,
		leaseend: Sequelize.DATE,
		email: Sequelize.STRING,
		phone: Sequelize.STRING
})




// Prospective.findAll().then((prospective)=>{
//     console.log(prospective[0].dataValues.name)
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

// sequelize.sync()
// sessionStore.sync();

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

	// app.use(session({ 
	// 	secret: 'keyboard cat', 
	// 	store: sessionStore,
	// 	resave: false, 
	// 	saveUninitialized: false 
	// }));

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
// PULLS SQL Data from database
app.get('/dashboard', (req, res)=>{
	Owned.findAll()
	.then((rows)=>{
		let count = 0
		let countmaintenance = 0
		let countrent = 0
		let countprice = 0
		let countfinancing = 0
		let countproptax = 0
		let countutilities = 0


		
		for(let i=0; i<rows.length; i++){
			count = count + rows[i].dataValues.cashflow
			countmaintenance = countmaintenance + rows[i].dataValues.maintenance
			countrent = countrent + rows[i].dataValues.rents
			countprice = countprice + rows[i].dataValues.price
			countfinancing = countfinancing + rows[i].dataValues.financing
			countproptax = countproptax + rows[i].dataValues.proptax
			countutilities = countutilities + rows[i].dataValues.utilities


		} 
		console.log(count)
		console.log(countmaintenance)
		return res.render('dashboard',{count, countmaintenance, countrent, countprice, countfinancing, countproptax, countutilities, rows})
	})
})

app.get('/user', (req,res)=>{
	return res.render('user')
})

// Catches get request for initializer
app.get('/initializer',( req,res)=>{
	Prospective.findAll()
	.then((rows)=>{
		const arr = [67, 152, 193, 240, 800, 700,800, 800, 800];
		// arr.push(rows[0].dataValues.financing)
		// arr.push(rows[0].dataValues.proptax)
		// arr.push(rows[0].dataValues.insurance)
		// arr.push(rows[0].dataValues.insurance)
		// arr.push(rows[0].dataValues.insurance)
		// arr.push(rows[0].dataValues.insurance)
		// arr.push(rows[0].dataValues.insurance)
		// arr.push(rows[0].dataValues.insurance)

		
		console.log(arr)
		// console.log("==============",rows)
		return res.send(arr)
		// brings data from the backend to use oon the frontend through AJAX

	})
})
// app.get('/research', (req,res)=>{
// 	return res.render('cashFlowCalculator')
// })




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

app.get('/research', (req, res)=>{
	Prospective.findAll()
	.then((rows)=>{
		console.log("==============",rows)
		return res.render('cashFlowCalculator',{rows})
	})
})

app.get('/tenants', (req,res)=>{
	Tenant.findAll()
	.then((rows)=>{
		return res.render('tenants', {rows})
    })
})

app.get('/addtenant',(req,res)=>{
	return res.render('addtenant')
})


// =======OWNED PROPERTIES ROUTES========


app.get('/performance', (req, res)=>{
	Owned.findAll()
	.then((rows)=>{
		console.log("==============",rows)
		return res.render('propertyperformance',{rows})
	})
})

// =====Performance/Owned Database=====
app.post('/addowned',(req,res)=>{
	// =========ADD RECORDS to the table======
	// sequelize.sync()
	// .then(()=> 
	Owned.create({
    address: req.body.address,
	price: req.body.price,
	downpayment: req.body.downpayment,
    financing: req.body.financing, 
	proptax: req.body.proptax,
	insurance: req.body.insurance,
	rents: req.body.rents,
	water: req.body.water,
	utilities: req.body.utilities,
	maintenance: req.body.maintenance,
	cashflow: req.body.cashflow,
	cashoncash:req.body.cashoncash,
	caprate:req.body.caprate,
})
.then(row=>{
	return res.redirect('/performance')
})
})

// DELETE Owned record
app.post('/delete/:id', (req,res)=>{
    let id = req.params.id
// find the record you want deleted
    Owned.findById(id)
//    use 'destroy' method to delete
    .then(row => row.destroy())
    .then(()=>{
        return res.redirect('/performance')
    })
})



	// =========Prospective: ADD RECORDS to the table======

app.post('/add',(req,res)=>{
	// sequelize.sync()
	// .then(()=> 
	Prospective.create({
    address: req.body.address,
	price: req.body.price,
	downpayment: req.body.downpayment,
    financing: req.body.financing, 
	proptax: req.body.proptax,
	insurance: req.body.insurance,
	rents: req.body.rents,
	water: req.body.water,
	utilities: req.body.utilities,
	maintenance: req.body.maintenance,
	cashflow: req.body.cashflow,
	cashoncash:req.body.cashoncash,
	caprate:req.body.caprate,
})
.then(row=>{
	return res.redirect('/research')
})
})

// DELETE prospective record
app.post('/delete/:id', (req,res)=>{
    let id = req.params.id
// find the record you want deleted
    Prospective.findById(id)
//    use 'destroy' method to delete
    .then(row => row.destroy())
    .then(()=>{
        return res.redirect('/research')
    })
})

app.get('/paymentCalc', (req, res)=>{
	return res.render('research')
})

// ==========================

// Pass Tenant data to use on front end EJS

app.get('/tenants',(req,res)=>{
    Tenant.findAll()
    .then((rows)=>{
        return rows;
    })
    .then((rows)=>{
        return res.render('tenants',{rows})
    })
})

// ADD tenant record to the table
app.post('/addten', (req,res)=>{
    Tenant.create({
        name: req.body.name,
        addressten: req.body.addressten,
        unit: req.body.unit,
		leaseend: req.body.leaseend,
		email: req.body.email,
		phone: req.body.phone,
	})
	.then(row=>{
		return res.redirect('/tenants')
	})
})	

// DELETE tenant record
app.post('/delete/:id', (req,res)=>{
    let id = req.params.id
// find the record you want deleted
    Tenant.findById(id)
//    use 'destroy' method to delete
    .then(row => row.destroy())
    .then(()=>{
        return res.redirect('/tenants')
    })
})



 // ---------------------------------------------------------
//===Server ============
// ---------------------------------------------------------
sequelize.sync()
.then(function(){
	app.listen(PORT, ()=>{
		console.log("server running")
	})
})


// app.listen(PORT, ()=>{
// 	console.log("Server is running...")
// })
