import React from "react";
import "./styles/Card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApplicantCard } from "./ApplicantCard";

type IMyCard = {
  listOfApplicants: any[];
};

const ListOfApplicants: React.FC<IMyCard> = ({ listOfApplicants }) => {
  return (
    <>
      {listOfApplicants.map((applicant, index) => (
        <ApplicantCard applicant={applicant} key={index} />
      ))}
    </>
  );
};

export default ListOfApplicants;
