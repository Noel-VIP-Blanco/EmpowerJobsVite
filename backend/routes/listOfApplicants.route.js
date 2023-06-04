const express = require("express");
const router = express.Router();

//import controller
const {
  getAllApplicants,
  createApplicants,
  deleteApplicantsAfterAccepted,
} = require("../controllers/listOfApplicants.controller");

router.post("/", createApplicants);
router.get("/", getAllApplicants);
router.delete("/", deleteApplicantsAfterAccepted);

module.exports = router;
