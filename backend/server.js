const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());

//import routes
const registerRoutes = require("./routes/user.route");
const listOfJobsRoutes = require("./routes/listOfJobs.route");
const loginRoute = require("./routes/userLogin.route");
const listOfApplicantsRoutes = require("./routes/listOfApplicants.route");
//Parses req body to json
app.use(express.json());

//setup routes
app.use("/register", registerRoutes);
app.use("/list-of-jobs", listOfJobsRoutes);
app.use("/list-of-applicants", listOfApplicantsRoutes);
app.use("/login", loginRoute);

//Connect to database
mongoose
  .connect(process.env.URI)
  .then(() => {
    //Listen to the port
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to the database and Listening in port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
