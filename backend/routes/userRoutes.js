import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { isAuth, isAdmin, generateToken, baseUrl, mailgun } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        lastName: updatedUser.lastName,
        userName:updatedUser.userName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {

      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.post(
  '/forget-password',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
      });
      user.resetToken = token;
      await user.save();

      //reset link
      console.log(`${baseUrl()}/reset-password/${token}`);

      mailgun()
        .messages()
        .send(
          {
            from: 'Amazona <me@mg.yourdomain.com>',
            to: `${user.name} <${user.email}>`,
            subject: `Reset Password`,
            html: ` 
             <p>Please Click the following link to reset your password:</p> 
             <a href="${baseUrl()}/reset-password/${token}"}>Reset Password</a>
             `,
          },
          (error, body) => {
            console.log(error);
            console.log(body);
          }
        );
      res.send({ message: 'We sent reset password link to your email.' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.post(
  '/reset-password',
  expressAsyncHandler(async (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        const user = await User.findOne({ resetToken: req.body.token });
        if (user) {
          if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
            await user.save();
            res.send({
              message: 'Password reseted successfully',
            });
          }
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      }
    });
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      await user.remove();
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    try {

    const newUser = new User({
      name: req.body.name,
      lastName: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      lastName: user.name,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Código 11000 indica clave duplicada (E11000)
      res.status(400).send({ message: 'Email already exists' });
    } else {
      // Otro tipo de error
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
})
);


userRouter.post(
  '/signup-google',
  expressAsyncHandler(async (req, res) => {
    const { name, lastName, email } = req.body;

    try {
      // Buscar si ya existe un usuario con el correo electrónico de Google
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        // Si el usuario ya existe, enviar los detalles del usuario existente
        res.send({
          _id: existingUser._id,
          name: existingUser.name,
          lastName: existingUser.lastName,
          userName: existingUser.userName,
          email: existingUser.email,
          isAdmin: existingUser.isAdmin,
          token: generateToken(existingUser),
        });
      } else {
        // Si el usuario no existe, crear un nuevo usuario en la base de datos
        const newUser = new User({
          name,
          lastName,
          email,
          password: 'generated-password-for-google-user', // Puedes generar una contraseña única para usuarios de Google
        });

        const savedUser = await newUser.save();

        // Enviar detalles del nuevo usuario
        res.send({
          _id: savedUser._id,
          name: savedUser.name,
          lastName: savedUser.lastName,
          userName: savedUser.userName,
          email: savedUser.email,
          isAdmin: savedUser.isAdmin,
          token: generateToken(savedUser),
        });
      }
            console.log('Signup with Google:', req.body);
    } catch (error) {
      console.error('Error during signup with Google:', error);
      res.status(500).send({ message: 'Internal Server Error' });    }
  })
);

export default userRouter;
