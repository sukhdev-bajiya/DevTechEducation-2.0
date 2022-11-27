import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    descriptionHtml: {
      type: String,
    },
    links: [
      {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    subDescription: {
      type: String,
    },
    video: {
      type: String,
    },
    image: {
      type: String,
    },
    courses: {
      type: String,
    },
    subject: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const devtechLectureModel = mongoose.model(
  "devtechlecture",
  lectureSchema,
  "devtechlectures"
);
export default devtechLectureModel;
