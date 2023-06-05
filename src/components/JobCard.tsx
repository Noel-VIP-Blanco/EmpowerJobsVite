import React, { useState } from "react";
import ModalForDetails from "./ModalForDetails";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import functions

type IJobCard = {
  job: any;
  applyForJobHandler: () => void;
};
const JobCard: React.FC<IJobCard> = ({ job, applyForJobHandler }) => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // //try get data of the user from localstorage
  // const [loginUser, setLoginUser] = useState<{
  //   userName: string;
  //   skills: string[];
  //   disability: string;
  //   hasJob: boolean;
  // } | null>(null);
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("loginUser");
  //   if (storedUser !== null) {
  //     const parsedUser = JSON.parse(storedUser);
  //     setLoginUser(parsedUser);
  //     setIsLoggedIn(true);
  //   }
  // }, []);

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
              variant="secondary"
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
