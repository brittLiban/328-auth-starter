import User from './../model/user.js'
import passport from 'passport';
//register
const registerPage = (req, res) => res.status(200).render("register.pug", {
    error: req.query.error
});
const register = async (req, res) => {
    const newUser = req.body; // reading in the new users info from the form on the pug file
    console.log(`adding new user ${newUser.username}`);
    await User.create(newUser);

    res.redirect('/login');


}

//login
const loginPage = (req, res) => res.status(200).render("login.pug", {
    error: req.query.error
});
const login = passport.authenticate("local",  {
    successRedirect: "/user",
    failureRedirect: "/login?error= Invalid Credentials"
})

//logout
const logout = (req, res) => {
    
}

//middleware to protect routes
const isLoggedIn = (req, res, next) => {

}

const hasRole = (req, res, next) => {

}

export default { registerPage, register, loginPage, login, logout, isLoggedIn, hasRole }