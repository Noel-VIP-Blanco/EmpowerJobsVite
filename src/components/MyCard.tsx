import React from "react";
import "./styles/Card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import JobCard from "./JobCard";
import { ApplyForJobHandler } from "../util/functions/ApplyForJobHandler";

type IMyCard = {
  listOfJobs: any[];
  loginUser: {
    userName: string;
    skills: string[];
    disability: string;
    hasJob: boolean;
  } | null;
};

const MyCard: React.FC<IMyCard> = ({ listOfJobs, loginUser }) => {
  return (
    <>
      {listOfJobs.map((job, index) => (
        <JobCard
          key={index}
          job={job}
          applyForJobHandler={() => {
            ApplyForJobHandler({ loginUser, job });
          }}
        />
      ))}
    </>
  );
};

export default MyCard;
