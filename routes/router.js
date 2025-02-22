import { Router } from 'express';
import pageController from '../controllers/pageController.js';
import authController from '../controllers/authController.js';

const authRouter = Router();

//access pages
authRouter.get('/admin', pageController.adminPage);     //displays admin (restricted) content
authRouter.get('/user', pageController.userPage);    //displays user content

//register - get to nav to page - post to psot something to db
authRouter.get('/register', authController.registerPage);
authRouter.post('/register', authController.register)

//login
authRouter.get('/login', authController.loginPage);
authRouter.post('/login', authController.login)

//logout
authRouter.post('/logout', authController.logout)

export default authRouter;