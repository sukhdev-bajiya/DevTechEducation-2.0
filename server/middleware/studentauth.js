import express from "express";
import devtechUserModel from "../model/user.model.js";
const StudentAuthRouter = express.Router();

StudentAuthRouter.get("/getalluserlist", async (req, res) => {
  let user = req.header("Authorization")
  try {
    let userAuth = await devtechUserModel.findById(user);
    if (userAuth && (userAuth.role === "admin" || userAuth.role === "teacher")) {
      let devtechUser = await devtechUserModel.find();
      return res.status(201).send({ success: true, error: false, message: "", user: devtechUser[0] });
    } else {
      return res.status(201).send({ success: false, error: true, message: "Wrong Credentials", user: {} });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});


export default StudentAuthRouter