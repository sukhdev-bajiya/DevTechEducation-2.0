import express from "express";
import devtechUserModel from "../model/user.model.js";

const StudentAuthRouter = express.Router();

StudentAuthRouter.get("/getalluserlist", async (req, res) => {
  // let user = req.header("Authorization");
  // let usertype = req.header("userType");
  // try {
  //   let userAuth = await devtechUserModel.findById(user);
  //   if (
  //     usertype !== "admin" &&
  //     userAuth &&
  //     (userAuth.role === "admin" || userAuth.role === "teacher")
  //   ) {
  //     let devtechUser = await devtechUserModel.find(
  //       { role: usertype },
  //       {
  //         securityQuestion1: 0,
  //         securityAnswer1: 0,
  //         securityQuestion2: 0,
  //         securityAnswer2: 0,
  //       }
  //     );
  //     return res
  //       .status(201)
  //       .send({ success: true, error: false, message: "", user: devtechUser });
  //   } else {
  //     return res.status(201).send({
  //       success: false,
  //       error: true,
  //       message: "Wrong Credentials",
  //       user: {},
  //     });
  //   }
  // } catch (error) {
  //   return res.status(500).send(error.message);
  // }

  console.log(req.cookies.devtechusercookie);
});

export default StudentAuthRouter;
