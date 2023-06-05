const express = require("express");
const router = express.Router();

//import controller
const {
  getAllApplicants,
  createApplicants,
  deleteApplicantsAfterAccepted,
  deleteApplicantsAfterDeclined,
} = require("../controllers/listOfApplicants.controller");

router.post("/", createApplicants);
router.get("/", getAllApplicants);
router.delete("/", deleteApplicantsAfterAccepted);
router.delete("/:userName/:jobName", deleteApplicantsAfterDeclined);

module.exports = router;
