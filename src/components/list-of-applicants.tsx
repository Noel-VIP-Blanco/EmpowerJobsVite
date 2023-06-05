import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApplicantCard } from "./ApplicantCard";
import "../pages/list-of-jobs/style.css";
import "./styles/Card.css";

type IMyCard = {
  listOfApplicants: any[];
};

const ListOfApplicants: React.FC<IMyCard> = ({ listOfApplicants }) => {
  return (
    <div style={{ flex: 1, height: "100%" }}>
      {listOfApplicants.map((applicant, index) => (
        <ApplicantCard applicant={applicant} key={index} />
      ))}
    </div>
  );
};

export default ListOfApplicants;
