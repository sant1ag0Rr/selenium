import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

const expireDate = new Date(Date.now() + 3600000);

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return next(errorHandler(400, "El email ya está registrado"));
      }
      if (existingUser.username === username) {
        return next(errorHandler(400, "El nombre de usuario ya está en uso"));
      }
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    // Solo incluir campos que se proporcionen
    const userData = {
      username,
      email,
      password: hashedPassword,
      isUser: true,
    };
    
    // Solo agregar phoneNumber si se proporciona
    if (req.body.phoneNumber && req.body.phoneNumber.trim() !== '') {
      userData.phoneNumber = req.body.phoneNumber.trim();
    }
    
    const newUser = new User(userData);
    
    await newUser.save();
    res.status(200).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error en signUp:", error);
    
    // Manejar errores específicos de MongoDB
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      let message;
      if (field === 'email') {
        message = 'El email ya está registrado';
      } else if (field === 'username') {
        message = 'El nombre de usuario ya está en uso';
      } else {
        message = 'Error de duplicado en el sistema';
      }
      return next(errorHandler(400, message));
    }
    
    next(error);
  }
};

//refreshTokens
export const refreshToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(errorHandler(403, "bad request no header provided"));
  }

  const refreshToken = req.headers.authorization.split(" ")[1].split(",")[0];
  const accessToken = req.headers.authorization.split(" ")[1].split(",")[1];

  console.log(refreshToken);
  console.log(accessToken);

  if (!refreshToken) {
    return next(errorHandler(401, "You are not authenticated"));
  }

  try {
    const decoded = Jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const user = await User.findById(decoded.id);

    if (!user) return next(errorHandler(403, "Invalid refresh token"));
    if (user.refreshToken !== refreshToken) {
      return next(errorHandler(403, "Invalid refresh token"));
    }

    const newAccessToken = Jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    const newRefreshToken = Jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    // Update the refresh token in the database for the user
    await User.updateOne({ _id: user._id }, { refreshToken: newRefreshToken });

    res
      .cookie("access_token", newAccessToken, {
        httpOnly: true,
        maxAge: 900000,
        sameSite: "lax",
        secure: false,
      }) // 15 minutes
      .cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        maxAge: 604800000,
        sameSite: "lax",
        secure: false,
      }) // 7 days
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error in refreshToken controller in server"));
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Sanitizar email para prevenir NoSQL injection
    const sanitizedEmail = email?.toString().trim();
    if (!sanitizedEmail || !password) {
      return next(errorHandler(400, "Email and password are required"));
    }
    
    const validUser = await User.findOne({ email: sanitizedEmail });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    let accessToken = "";
    let refreshToken = "";
    accessToken = Jwt.sign({ id: validUser._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    }); //accessToken expires in 15 minutes
    refreshToken = Jwt.sign({ id: validUser._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    }); //refreshToken expires in 7 days

    const updatedData = await User.findByIdAndUpdate(
      { _id: validUser._id },
      { refreshToken },
      { new: true }
    ); //store the refresh token in db

    //separating password from the updatedData
    const { password: userPassword, isAdmin, ...rest } = updatedData._doc;

    //not sending users hashed password to frontend
    const responsePayload = {
      refreshToken: refreshToken,
      accessToken,
      isAdmin,
      ...rest,
    };

    req.user = {
      ...rest,
      isAdmin: validUser.isAdmin,
      isUser: validUser.isUser,
    };

    //the code for the cookie
    // .cookie("access_token", accessToken, {
    //   httpOnly: true,
    //   maxAge: 900000,
    //   sameSite: "None",
    //   secure: true,
    //   domain: "rent-a-ride-two.vercel.app"
    // }) // 15 minutes
    // .cookie("refresh_token", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 604800000,
    //   sameSite: "None",
    //   secure: true,
    //   domain: "rent-a-ride-two.vercel.app"
    // })
    // 7 days

    res.status(200).json(responsePayload);

    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const google = async (req, res, next) => {
  try {
    // Sanitizar email para prevenir NoSQL injection
    const email = req.body.email?.toString().trim();
    if (!email) {
      return next(errorHandler(400, "Email is required"));
    }
    
    const user = await User.findOne({ email }).lean();
    if (user && !user.isUser) {
      return next(errorHandler(409, "email already in use as a vendor"));
    }
    if (user) {
      const { password: userPassword, ...rest } = user;
      const token = Jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
          SameSite: "None",
          Domain: ".vercel.app",
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); //we are generating a random password since there is no password in result
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        profilePicture: req.body.photo,
        password: hashedPassword,
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        isUser: true,
        //we cannot set username to req.body.name because other user may also have same name so we generate a random value and concat it to name
        //36 in toString(36) means random value from 0-9 and a-z
      });
      const savedUser = await newUser.save();
      const userObject = savedUser.toObject();

      const token = Jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN);
      const { password: userPassword, ...rest } = userObject;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
          sameSite: "None",
          secure: true,
          domain: ".vercel.app",
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
