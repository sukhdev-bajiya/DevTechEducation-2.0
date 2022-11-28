import express from "express";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

import devtechUserModel from "../model/user.model.js";
const AuthRouter = express.Router();

const ServerToken = process.env.JwtToken;

AuthRouter.post("/signup", async (req, res) => {
  const data = req.body;
  data.email = data.email.toLowerCase();
  data.username = Date.now();
  data.password = await bcrypt.hash(data.password, 10);
  const { number, email } = data;

  try {
    const user = await devtechUserModel.findOne({
      $or: [{ number }, { email: { $regex: email, $options: "i" } }],
    });
    let obj;
    if (user) {
      obj = {
        success: false,
        error: false,
        message: "User data already exists",
        user: {},
      };
    } else {
      const devtechUser = devtechUserModel(data);
      await devtechUser.save();

      obj = {
        success: true,
        error: false,
        message: "User created successfully",
        user: {
          username: data.username,
        },
      };
    }
    return res.status(201).send(obj);
  } catch (error) {
    let obj = {
      success: false,
      error: true,
      message: error.message,
    };

    return res.status(500).send(obj);
  }
});

AuthRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const devtechUser = await devtechUserModel.findOne(
      { username },
      {
        securityAnswer1: 0,
        securityAnswer2: 0,
      }
    );
    if (devtechUser && (await bcrypt.compare(password, devtechUser.password))) {
      devtechUser.password = "Welcome to Dev Tech Education";

      const token = await Jwt.sign(
        { id: devtechUser._id.toString(), role: devtechUser.role },
        ServerToken,
        { expiresIn: "1d" }
      );

      const data = CryptoJS.AES.encrypt(
        JSON.stringify(devtechUser),
        token
      ).toString();

      return res.status(201).send({
        success: true,
        error: false,
        message: "Login Successful",
        user: {
          role: devtechUser.role,
          username: devtechUser.username,
          name: devtechUser.name,
          email: devtechUser.email,
          number: devtechUser.number,
        },
        data,
        token,
      });
    } else {
      return res.status(201).send({
        success: false,
        error: false,
        message: "Wrong Credentials",
        user: {},
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

AuthRouter.post("/resetpassword", async (req, res) => {
  try {
    const { username, email, number } = req.body;
    const devtechUser = await devtechUserModel.find(
      { username, email, number },
      {
        securityQuestion1: 1,
        securityAnswer1: 1,
        securityQuestion2: 1,
        securityAnswer2: 1,
        _id: 1,
      }
    );
    if (devtechUser.length > 0) {
      return res.status(201).send({
        success: true,
        error: false,
        message: "Go to Security Questions",
        user: devtechUser[0],
      });
    } else {
      return res.status(201).send({
        success: false,
        error: true,
        message: "Wrong Credentials",
        user: {},
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

AuthRouter.post("/resetpassword/newpassword", async (req, res) => {
  try {
    const { password, id } = req.body;
    await devtechUserModel.findByIdAndUpdate(
      { _id: id },
      { password: password }
    );
    return res.status(201).send({
      success: true,
      error: false,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

AuthRouter.post("/resetusername", async (req, res) => {
  try {
    const { email, number } = req.body;
    const devtechUser = await devtechUserModel.find(
      { email, number },
      {
        securityQuestion1: 1,
        securityAnswer1: 1,
        securityQuestion2: 1,
        securityAnswer2: 1,
        _id: 1,
        username: 1,
      }
    );
    if (devtechUser.length > 0) {
      return res.status(201).send({
        success: true,
        error: false,
        message: "Go to Security Questions",
        user: devtechUser[0],
      });
    } else {
      return res.status(201).send({
        success: false,
        error: true,
        message: "Wrong Credentials",
        user: {},
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default AuthRouter;
