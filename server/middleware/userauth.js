import express from "express";
import Jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import emailTemplate from "./emailtemplate.js";
import devtechUserModel from "../model/user.model.js";
import devtechCourseModel from "../model/courses.model.js";
import devtechLectureModel from "../model/lecture.model.js";
import devtechSubjectModel from "../model/subject.model.js";

const UserAuthRouter = express.Router();
const ServerToken = process.env.JwtToken;
const EmailToken = process.env.EmailToken;

UserAuthRouter.get("/getalluserlist", async (req, res) => {
  let token = req.header("Authorization");
  try {
    await Jwt.verify(token, ServerToken, async (error, response) => {
      if (error) {
        // Error part
        let Obj = {
          success: false,
          error: true,
          message: error.message,
        };

        // Send response back
        return res.status(401).send(Obj);
      } else {
        // Success part
        let Obj;

        if (response.role === "admin") {
          // Admin part

          let teacher = await devtechUserModel.find(
            { role: "teacher" },
            {
              password: 0,
              securityAnswer1: 0,
              securityAnswer2: 0,
              lastLogin: 0,
              lastUpdateData: 0,
            }
          );
          let student = await devtechUserModel.find(
            { role: "student" },
            {
              password: 0,
              securityAnswer1: 0,
              securityAnswer2: 0,
              lastLogin: 0,
              lastUpdateData: 0,
            }
          );

          let course = await devtechCourseModel.find();
          let lecture = await devtechLectureModel.find();
          let subject = await devtechSubjectModel.find();

          teacher = CryptoJS.AES.encrypt(
            JSON.stringify(teacher),
            token
          ).toString();
          student = CryptoJS.AES.encrypt(
            JSON.stringify(student),
            token
          ).toString();
          course = CryptoJS.AES.encrypt(
            JSON.stringify(course),
            token
          ).toString();
          lecture = CryptoJS.AES.encrypt(
            JSON.stringify(lecture),
            token
          ).toString();
          subject = CryptoJS.AES.encrypt(
            JSON.stringify(subject),
            token
          ).toString();

          Obj = {
            success: true,
            error: false,
            teacher,
            student,
            course,
            lecture,
            subject,
          };
        } else if (response.role === "teacher") {
          // Teacher part

          let student = await devtechUserModel.find(
            { role: "student" },
            {
              password: 0,
              securityAnswer1: 0,
              securityAnswer2: 0,
              lastLogin: 0,
              lastUpdateData: 0,
            }
          );
          let course = await devtechCourseModel.find();
          let lecture = await devtechLectureModel.find();
          let subject = await devtechSubjectModel.find();

          student = CryptoJS.AES.encrypt(
            JSON.stringify(student),
            token
          ).toString();
          course = CryptoJS.AES.encrypt(
            JSON.stringify(course),
            token
          ).toString();
          lecture = CryptoJS.AES.encrypt(
            JSON.stringify(lecture),
            token
          ).toString();
          subject = CryptoJS.AES.encrypt(
            JSON.stringify(subject),
            token
          ).toString();

          Obj = {
            success: true,
            error: false,
            student,
            course,
            lecture,
            subject,
          };
        } else if (response.role === "student") {
          // User part
          let course = await devtechCourseModel.find();
          let subject = await devtechSubjectModel.find();

          course = CryptoJS.AES.encrypt(
            JSON.stringify(course),
            token
          ).toString();
          subject = CryptoJS.AES.encrypt(
            JSON.stringify(subject),
            token
          ).toString();

          Obj = {
            success: true,
            error: false,
            course,
            subject,
          };
        } else {
          Obj = {
            success: false,
            error: true,
            message: "Invalid Role",
          };
          return res.status(401).send(Obj);
        }

        return res.status(201).send(Obj);
      }
    });
  } catch (error) {
    // Error part
    let Obj = {
      success: false,
      error: true,
      message: error.message,
    };

    // Send response back
    return res.status(401).send(Obj);
  }
});
UserAuthRouter.post("/add/newuser", async (req, res) => {
  let token = req.header("Authorization");
  let data = req.body;
  try {
    await Jwt.verify(token, ServerToken, async (error, response) => {
      if (error) {
        // Error part
        let Obj = {
          status: "error",
        };
        // Send response back
        return res.status(401).send(Obj);
      } else {
        // Success part
        let Obj;
        // Update email, username, flag and password
        data.email = data.email.toLowerCase();
        data.username = Date.now();
        data.password = data.email.split("@")[0];

        // Update email body
        const emailBody = emailTemplate(
          data.name,
          data.username,
          data.password
        );

        // Convert password to secure password
        data.password = await bcrypt.hash(data.password, 10);

        const { number, email } = data;
        const user = await devtechUserModel.findOne({
          $or: [{ number }, { email: { $regex: email, $options: "i" } }],
        });

        if (user) {
          // Output Obj User already exists
          Obj = {
            status: "false",
          };
          console.log(3);
        } else {
          // Add new user
          const devtechUser = devtechUserModel(data);
          await devtechUser.save();

          // Send mail to user
          // fetch(
          //   `${EmailToken}?Name=${data.name}&Email=${email}&Number=${number}&Template=${emailBody}&Subject=Dev Tech Education Online Course Platform Login Credentials`
          // );

          // Output Obj User created successfully
          Obj = {
            status: "true",
          };
        }
        // Send response back
        return res.status(201).send(Obj);
      }
    });
  } catch (error) {
    // Error part
    let Obj = {
      status: "error",
    };
    // Send response back
    return res.status(401).send(Obj);
  }
});

export default UserAuthRouter;
