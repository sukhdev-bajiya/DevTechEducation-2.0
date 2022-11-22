import express from "express";
import devtechUserModel from "../model/user.model.js";
const AuthRouter = express.Router();

AuthRouter.post("/signup", async (req, res) => {
  const data = req.body;
  data.role = "student";
  data.email = data.email.toLowerCase();
  data.username = Date.now()
  const { number, email } = req.body;
  try {
    const user = await devtechUserModel.find({ $or: [{ number }, { email: { $regex: email, $options: "i" } }] });
    let obj
    if (user.length > 0) {
      obj = {
        success: false,
        error: false,
        message: "User data already exists",
      }
    } else {
      const devtechUser = devtechUserModel(data);
      await devtechUser.save();

      obj = {
        success: true,
        error: false,
        message: "User created successfully",
        user: {
          username: data.username,
        }
      }
    }
    return res.status(201).send(obj);
  } catch (error) {

    let obj = {
      success: false,
      error: true,
      message: error.message
    }

    return res.status(500).send(obj);
  }
});

AuthRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const devtechUser = await devtechUserModel.find({ username, password }, { securityQuestion1: 0, securityAnswer1: 0, securityQuestion2: 0, securityAnswer2: 0, password: 0 });
    if (devtechUser.length > 0) {
      return res.status(201).send({ success: true, error: false, message: "Login Successful", user: devtechUser[0] });
    } else {
      return res.status(201).send("Wrong Credentials");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

AuthRouter.post("/resetpassword", async (req, res) => {
  try {
    const { username, email, number } = req.body;
    const devtechUser = await devtechUserModel.find({ username, email, number }, { securityQuestion1: 1, securityAnswer1: 1, securityQuestion2: 1, securityAnswer2: 1, _id: 1 });
    if (devtechUser.length > 0) {
      return res.status(201).send({ success: true, error: false, message: "Go to Security Questions", user: devtechUser[0] });
    } else {
      return res.status(201).send({ success: false, error: true, message: "Wrong Credentials", user: {} });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
AuthRouter.post("/resetpassword/newpassword", async (req, res) => {
  try {
    const { password, id } = req.body;
    await devtechUserModel.findByIdAndUpdate({ _id: id }, { password: password })
    return res.status(201).send({ success: true, error: false, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

AuthRouter.post("/resetusername", async (req, res) => {
  try {
    const { email, number } = req.body;
    const devtechUser = await devtechUserModel.find({ email, number }, { securityQuestion1: 1, securityAnswer1: 1, securityQuestion2: 1, securityAnswer2: 1, _id: 1, username: 1 });
    if (devtechUser.length > 0) {
      return res.status(201).send({ success: true, error: false, message: "Go to Security Questions", user: devtechUser[0] });
    } else {
      return res.status(201).send({ success: false, error: true, message: "Wrong Credentials", user: {} });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});


AuthRouter.get("/getalluserlist", async (req, res) => {
  console.log(req.header("Authorization"))
  return res.status(201).send({ status: "Hiii." })
  // try {
  //   const { email, number } = req.body;
  //   const devtechUser = await devtechUserModel.find({ email, number }, { securityQuestion1: 1, securityAnswer1: 1, securityQuestion2: 1, securityAnswer2: 1, _id: 1, username: 1 });
  //   if (devtechUser.length > 0) {
  //     return res.status(201).send({ success: true, error: false, message: "Go to Security Questions", user: devtechUser[0] });
  //   } else {
  //     return res.status(201).send({ success: false, error: true, message: "Wrong Credentials", user: {} });
  //   }
  // } catch (error) {
  //   return res.status(500).send(error.message);
  // }
});


export default AuthRouter;


