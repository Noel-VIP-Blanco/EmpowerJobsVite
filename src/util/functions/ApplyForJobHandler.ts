import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
interface IApplyForJobHandler {
  loginUser: {
    userName: string;
    skills: string[];
    disability: string;
    hasJob: boolean;
  } | null;
  job: {
    jobName: string;
    prefferedSkills: string[];
    suitableDisabilities: string[];
    salaryPerYear: string;
    description: string;
  };
}

export const ApplyForJobHandler = async ({
  loginUser,
  job,
}: IApplyForJobHandler) => {
  //check if there is a login user
  if (loginUser === null) {
    Swal.fire({
      title: "No user logged in",
      text: "Proceed to login page!",
      icon: "error",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      window.location.href = "/login";
    });
  } else if (loginUser.hasJob === true) {
    console.log(loginUser.hasJob);
    Swal.fire({
      title: "Applied Failed",
      text: "You have already accepted on company!",
      icon: "error",
      confirmButtonColor: "#3085d6",
    });
  } else {
    try {
      const response = await axios.post(
        "http://localhost:4000/list-of-applicants/",
        {
          jobName: job.jobName,
          userName: loginUser?.userName,
          skills: loginUser?.skills,
          disability: loginUser?.disability,
        }
      );
      Swal.fire("You are all done!", "Job applied!", "success");
    } catch (error) {
      // Handle error here
      Swal.fire("Bad Request", "You already applied on this job!", "error");
    }
  }
};
