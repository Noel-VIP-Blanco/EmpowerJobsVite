import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
//import function helpers

//interface
interface IModal {
  toggleShow: () => void;
  centredModal: boolean;
  setCentredModal: React.Dispatch<React.SetStateAction<boolean>>;
  job: IJob;
  applyForJobHandler: () => void;
}
interface IJob {
  jobName: string;
  prefferedSkills: string[];
  suitableDisabilities: string[];
  salaryPerYear: string;
  description: string;
}

//////////////////////////
const ModalForDetails: React.FC<IModal> = ({
  toggleShow,
  centredModal,
  setCentredModal,
  job: {
    jobName,
    prefferedSkills,
    suitableDisabilities,
    salaryPerYear,
    description,
  },
  applyForJobHandler,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //try get data of the user from localstorage
  const [loginUser, setLoginUser] = useState<{
    userName: string;
    skills: string[];
    disability: string;
  } | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      setLoginUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              <span style={{ color: "black" }}>{jobName}</span>
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="dark" onClick={toggleShow} />
          </MDBModalHeader>
          <MDBModalBody>
            <p style={{ color: "black" }}>
              <strong>Preferred Skills:</strong> {prefferedSkills.join(", ")}
            </p>
            <p style={{ color: "black" }}>
              <strong>Suitable Disabilities:</strong>{" "}
              {suitableDisabilities.join(", ")}
            </p>
            <p style={{ color: "black" }}>
              <strong>Salary per Year:</strong> {salaryPerYear}
            </p>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn
              onClick={() => {
                applyForJobHandler();
              }}
            >
              Apply
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default ModalForDetails;
