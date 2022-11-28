import express from "express";
import cors from "cors";
import Jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import cookieParser from "cookie-parser";

import connection from "./config/index.js";
import AuthRouter from "./middleware/authorization.js";
import StudentAuthRouter from "./middleware/studentauth.js";
import devtechUserModel from "./model/user.model.js";

const app = express();

const ServerToken = process.env.JwtToken;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);

app.use("/student", StudentAuthRouter);

app.get("/uservalid", async (req, res) => {
  try {
    let token = req.header("token");
    await Jwt.verify(token, ServerToken, async (error, response) => {
      if (error) {
        return res.status(401).send(error);
      } else {
        const devtechUser = await devtechUserModel.findById(response.id, {
          securityAnswer1: 0,
          securityAnswer2: 0,
        });

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
      }
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/", (req, res) => {
  return res.status(200).send("DEV TECH EDUCATION");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Listening on port 8080");
  } catch (error) {
    console.log(error.message);
  }
});
