// // ==========Dependencies=========
// const express = require('express')
// const ejs = require('ejs')
// const Sequelize = require('sequelize')
// const bodyParser = require('body-parser')
// const PORT = process.env.PORT || 8080
// const passport = require('passport')
// const session = require('express-session')
// const cookieParser = require('cookie-parser')
// const sharp = require('sharp')
// const path = require('path')
// const multer = require('multer')
// const dotenv = require('dotenv')
// const LocalStrategy = require('passport-local').Strategy
// // const SequelizeStore = require('connect-session-sequelize')(session.Store)

// dotenv.load();
// const postgres_user = process.env.DB_USER;
// const postgres_pass = process.env.DB_PASS;

// // ---------------------------------------------------------
// // =======SQL shell login setup=========
// // ---------------------------------------------------------

// const Op = Sequelize.Op
// const sequelize = new Sequelize('mogulone', postgres_user, postgres_pass, {
// 	host: 'localhost',
// 	port: '5433', //david-port: 5433
// 	dialect: 'postgres',
// 	operatorsAliases:{
// 		$and: Op.and,
// 		$or: Op.or,
// 		$eq: Op.eq,
// 		$like: Op.like,
// 		$iLike: Op.iLike
// 	}
// })

// const User = sequelize.define('user', {
// 	fname: Sequelize.STRING,
// 	lname: Sequelize.STRING,
// 	username: Sequelize.STRING,
// 	password: Sequelize.STRING,
// 	email: Sequelize.STRING,
// })

// // ---------------------------------------------------------
// // =======Photo storage in SQL - Defining the Table=========
// // ---------------------------------------------------------

// const Pic = sequelize.define('pic',{
//     username: Sequelize.STRING,
//     image: Sequelize.STRING,
//     comment: Sequelize.STRING
// })



// // const sessionStore = new SequelizeStore({
// //     db: sequelize
// //   });

// sequelize.sync()
// // sessionStore.sync();

// // ---------------------------------------------------------
// // ======Boilerplate=============== 
// // ---------------------------------------------------------

// const app = express()
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.static('public'))
// app.set('view engine', 'ejs')
// app.use(cookieParser());

// 	// app.use(session({ 
// 	// 	secret: 'keyboard cat', 
// 	// 	store: sessionStore,
// 	// 	resave: false, 
// 	// 	saveUninitialized: false 
// 	// }));

// // ---------------------------------------------------------
// //================ Passport Middleware ==============
// // ---------------------------------------------------------

// app.use(passport.initialize());
// app.use(passport.session());


// // ---------------------------------------------------------
// //=========Routes==================
// // ---------------------------------------------------------


// app.use(cookieParser());
// app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// passport.use(new Strategy(

//     (username, password, cb)=>{
//         // NOTE User / Password confirmation for passportJS login
//         // use squelize search for first data entry with username feild match
//         User.findOne({
//             where: {
//                 username: {
//                     $iLike : `${username}`
//                 }
//             }
//         }).then(data=>{
//             if (!data) {
//                 return cb(null,false);
//             } else if (data.password !== password) {
//                 return cb(null,false);
//             }
//             return cb(null,data);
//         });
//     }

// ));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user,cb){
//     // NOTE?? gets user data from previously defined local strategy, pushes to
//     // user parameter. first callback param is error throw?
//     cb(null, user.id);
// });

// passport.deserializeUser(function(id,cb){

//     User.findById(id).then(data=>{
//         if(!data) {
//             return cb(null,null);
//         }
//         cb(null,data);
//     });

// });




// let message = ''

// app.get('/', (req, res)=>{

// 	res.render('login', {message})
	
// });

// // Registration Form Route from 'login'
// app.post('/register', (req, res)=>{
// 	User.create({
//         fname: req.body.fname,
//         lname: req.body.lname,
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email
//     }).then(x=>{
//         console.log(req.body.username + ' has been created');
//         res.redirect('/');
//     });
// });


// app.post('/login', passport.authenticate('local', {failureRedirect: '/signup'}), (req,res)=>{
//     res.redirect('/profile');
// })




//  // ---------------------------------------------------------
// //===Server ============
// // ---------------------------------------------------------

// app.listen(PORT, ()=>{
// 	console.log("Server is running...")
// })
