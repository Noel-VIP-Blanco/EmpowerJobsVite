import MyCard from "../../components/MyCard";
import ListOfApplicants from "../../components/list-of-applicants";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

//interface
interface Job {
  jobName: string;
  prefferedSkills: string[];
  suitableDisabilities: string[];
  salaryPerYear: number;
  description: string;
}

const ListOfJobs = () => {
  const [listOfJobs, setListOfJobs] = useState<Job[]>([]);
  const [listOfApplicants, setListOfApplicants] = useState([]);
  const [loginUser, setLoginUser] = useState<{
    userName: string;
    skills: string[];
    disability: string;
    hasJob: boolean;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      setLoginUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (loginUser?.userName !== "admin" || loginUser === null) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/list-of-jobs"
          );
          setListOfJobs(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [loginUser]);

  useEffect(() => {
    if (loginUser?.userName === "admin") {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/list-of-applicants"
          );
          setListOfApplicants(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [loginUser]);

  //filtered jobs only appear based on disability of the user
  const filteredJobs = listOfJobs.filter((job) => {
    return (
      loginUser &&
      loginUser.disability &&
      job.suitableDisabilities.includes(loginUser.disability)
    );
  });
  console.log(filteredJobs);
  return (
    <>
      {!loginUser || loginUser.userName !== "admin" ? (
        <div className="pageContainer">
          <MyCard
            listOfJobs={filteredJobs.length > 0 ? filteredJobs : listOfJobs}
            loginUser={loginUser}
          />
        </div>
      ) : (
        <div className="pageContainer">
          <ListOfApplicants listOfApplicants={listOfApplicants} />
        </div>
      )}
    </>
  );
};

export default ListOfJobs;
