import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
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
    courses: {
      type: String,
    },
    lectures: [mongoose.Schema.Types.ObjectId],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const devtechSubjectModel = mongoose.model(
  "devtechsubject",
  subjectSchema,
  "devtechsubjects"
);
export default devtechSubjectModel;
