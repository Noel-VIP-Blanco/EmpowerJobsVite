import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import functions
import {
  AcceptHandler,
  DeclineHandler,
} from "../util/functions/AcceptDeclineJob";
type IApplicantCard = {
  applicant: any;
};

export const ApplicantCard: React.FC<IApplicantCard> = ({ applicant }) => {
  return (
    <div className="card-container">
      <Card bg="dark" text="light" style={{ width: "60rem" }}>
        <Card.Body className="card-body">
          <div className="left-content">
            <Card.Title style={{ textAlign: "center" }}>
              {applicant.jobName}
            </Card.Title>
            <Card.Text>Applicant: {applicant.userName}</Card.Text>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <Card.Text>
                  <b>Skills</b>
                </Card.Text>
                {applicant.skills.map((skill: string, index: number) => {
                  return <Card.Text key={index}>* {skill}</Card.Text>;
                })}
              </div>
              <div className="col-md-6">
                <Card.Text>
                  <b>Disability</b>
                </Card.Text>
                <Card.Text>{applicant.disability}</Card.Text>
              </div>
            </div>
          </div>
          <div className="right-content">
            <Button
              variant="success"
              onClick={() => {
                AcceptHandler(applicant.userName);
              }}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                DeclineHandler(applicant.userName, applicant.jobName);
              }}
            >
              Decline
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
