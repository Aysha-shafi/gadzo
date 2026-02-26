import express from 'express';
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js';


const userRouter = express.Router();

//user login route
userRouter.post('/login', loginUser);

//user registration route
userRouter.post('/register', registerUser);

//admin login route
userRouter.post('/admin', adminLogin);

export default userRouter;