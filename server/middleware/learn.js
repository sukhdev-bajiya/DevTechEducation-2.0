import express from "express";
import Jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import devtechUserModel from "../model/user.model.js";
import devtechCourseModel from "../model/courses.model.js";
import devtechLectureModel from "../model/lecture.model.js";
import devtechSubjectModel from "../model/subject.model.js";

const LearnRouter = express.Router();
const ServerToken = process.env.JwtToken;

LearnRouter.post("/add/course", async (req, res) => {
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
        const { title } = req.body;
        const course = await devtechCourseModel.findOne({ title });

        if (!course && response.role === "admin") {
          // update user
          let devtechCourse = devtechCourseModel(data);
          await devtechCourse.save();
          // Output Obj
          Obj = {
            status: "true",
          };
        } else {
          // Output Obj
          Obj = {
            status: "false",
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
LearnRouter.post("/edit/course", async (req, res) => {
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
        const { title } = req.body;
        const id = data.id;
        const course = await devtechCourseModel.find({
          $or: [{ title }, { _id: id }],
        });

        if (course.length === 1 && response.role === "admin") {
          // update user
          delete data.id;
          await devtechCourseModel.findByIdAndUpdate(id, { ...data });

          // Output Obj
          Obj = {
            status: "true",
          };
        } else {
          // Output Obj
          Obj = {
            status: "false",
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
LearnRouter.post("/delete/course", async (req, res) => {
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
        const id = data.id;
        if (response.role === "admin") {
          // update user
          await devtechCourseModel.findByIdAndDelete(id);

          // Output Obj
          Obj = {
            status: "true",
          };
        } else {
          // Output Obj
          Obj = {
            status: "false",
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

LearnRouter.post("/add/subject", async (req, res) => {
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
        const { title, courses } = req.body;
        const subjectIs = await devtechSubjectModel.findOne({ title });

        if (!subjectIs && response.role === "admin") {
          // update user
          let devtechSubject = devtechSubjectModel(data);
          await devtechSubject.save();

          await devtechCourseModel.update(
            {
              title: { $in: courses },
            },
            { $push: { subject: data.title } }
          );

          // Output Obj
          Obj = {
            status: "true",
          };
        } else {
          // Output Obj
          Obj = {
            status: "false",
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

LearnRouter.post("/edit/subject", async (req, res) => {
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
        const { title, courses } = req.body;
        const id = data.id;
        const course = await devtechSubjectModel.find({
          $or: [{ title }, { _id: id }],
        });

        if (course.length === 1 && response.role === "admin") {
          // update user
          delete data.id;
          // await devtechSubjectModel.findByIdAndUpdate(id, { ...data });
          console.log(1);
          await devtechCourseModel.update(
            {
              subject: { $in: data.title },
            },
            { $ }
          );
          console.log(2);
          await devtechCourseModel.update(
            {
              title: { $in: courses },
            },
            { $push: { subject: data.title } }
          );
          console.log(3);
          // Output Obj
          Obj = {
            status: "true",
          };
        } else {
          // Output Obj
          Obj = {
            status: "false",
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
    console.log(error);
    // Send response back
    return res.status(401).send(Obj);
  }
});

LearnRouter.post("/add/lectures", async (req, res) => {
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
        const { title, subject } = req.body;
        const lectureIs = await devtechLectureModel.findOne({ title });

        if (!lectureIs && response.role === "admin") {
          // update user
          let devtechLecture = devtechLectureModel(data);
          await devtechLecture.save();

          await devtechSubjectModel.update(
            {
              title: { $in: subject },
            },
            { $push: { lectures: data.title } }
          );
          // Output Obj
          Obj = {
            status: "true",
          };
        } else {
          // Output Obj
          Obj = {
            status: "false",
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

export default LearnRouter;
