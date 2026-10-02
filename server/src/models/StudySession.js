import { Schema, model } from "mongoose";

const studySessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },

    quiz: {
      type: Array,
      default: [],
    },

    explanation: {
      type: String,
      default: "",
    },

    studyPlan: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model("StudySession", studySessionSchema);