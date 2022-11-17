import express from "express";
import userModel from "../model/user.model.js";
const AuthRouter = express.Router();

AuthRouter.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    const devtechUser = userModel(data);
    await devtechUser.save();
    return res.status(201).send(devtechUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

AuthRouter.get("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const devtechUser = await userModel.find({ username, password });
    if (devtechUser.length > 0) {
      return res.send({ message: "Login Successful", token: 54321, user: devtechUser });
    } else {
      return res.send("Wrong Credentials");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default AuthRouter;
