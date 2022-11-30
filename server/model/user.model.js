import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    securityQuestionFlag: {
      type: Boolean,
    },
    securityQuestion1: {
      type: String,
    },
    securityAnswer1: {
      type: String,
    },
    securityQuestion2: {
      type: String,
    },
    securityAnswer2: {
      type: String,
    },
    postAddress: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: Number,
      },
    },
    courses: [mongoose.Schema.Types.ObjectId],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const devtechUserModel = mongoose.model(
  "devtechUser",
  userSchema,
  "devtechUsers"
);
export default devtechUserModel;
