const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listOfApplicantsSchema = new Schema(
  {
    jobName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    disability: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a compound index on 'jobName' and 'userName' fields
listOfApplicantsSchema.index({ jobName: 1, userName: 1 }, { unique: true });

module.exports = mongoose.model("List-Of-Applicant", listOfApplicantsSchema);
