import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import router from './routes/router.js';
import './auth/localStrategy.js' // runs the passport config
import passport from 'passport';
const app = express();

//default middleware

//sets up a in memory session - users between req
app.use(express.json());
// cookie is just a small txt file from browser - this is used to read cookies being sent in - session is stored in cookie
app.use(cookieParser());
app.use(session({
    //track between req - unique to users
    secret: "e~IZ9|)Aw2E`26u1'I<cRt=g,?HQrZ",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))

//configure passport...
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
// this allows us to read from a form
app.use(express.urlencoded({ extended: false }));
app.set('views', 'views');
app.set('view engine', 'pug');

//load routers
app.use('/', router);

//error handling
app.use((err, req, res, next) => {
    const status = err.status || 500; 
    const message = err.message || "Unknown server error!";

    res.status(200).render('error', {
        status,
        message
    })
})

//start the server
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`http://localhost:${port}`);
});