import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const AcceptHandler = async (username: string) => {
  console.log(username);
  try {
    await axios.patch(`http://localhost:4000/register/${username}`, {
      hasJob: true,
    });
    await axios.delete(`http://localhost:4000/list-of-applicants/`, {
      params: {
        userName: username,
      },
    });
    // Handle success
    Swal.fire({
      title: "Successful",
      text: "User Accepted to job",
      icon: "success",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    // Handle error
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Invalid action`,
    });
  }
};
