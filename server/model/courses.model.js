import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    subDescription: {
      type: String,
    },
    image: {
      type: String,
    },
    fee: {
      type: String,
    },
    subject: [mongoose.Schema.Types.ObjectId],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const devtechCourseModel = mongoose.model(
  "devtechcourse",
  courseSchema,
  "devtechcourses"
);
export default devtechCourseModel;
