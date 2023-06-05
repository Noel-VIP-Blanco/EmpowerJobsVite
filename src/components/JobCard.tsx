import React, { useState } from "react";
import ModalForDetails from "./ModalForDetails";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

type IJobCard = {
  job: any;
  applyForJobHandler: () => void;
};
const JobCard: React.FC<IJobCard> = ({ job, applyForJobHandler }) => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  return (
    <div className="card-container">
      <ModalForDetails
        toggleShow={toggleShow}
        centredModal={centredModal}
        setCentredModal={setCentredModal}
        job={job}
        applyForJobHandler={() => {
          applyForJobHandler();
        }}
      />
      <Card bg="dark" text="light" style={{ width: "60rem" }}>
        <Card.Body className="card-body">
          <div className="left-content">
            <Card.Title>{job.jobName}</Card.Title>
            <Card.Text>{job.description}</Card.Text>
          </div>
          <div className="right-content">
            <Button variant="primary" className="mr-2" onClick={toggleShow}>
              Details
            </Button>
            <Button
              variant="success"
              onClick={() => {
                applyForJobHandler();
              }}
            >
              Apply
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobCard;
