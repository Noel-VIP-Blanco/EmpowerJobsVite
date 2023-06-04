import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./styles/RegisterForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

//import functions in function folder
import {
  handleCheckboxChange,
  handleRadioChange,
} from "../util/functions/FormHandler";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [checkboxes, setCheckboxes] = useState({
    react: false,
    angular: false,
    javascript: false,
    java: false,
    database: false,
    photography: false,
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [disability, setDisability] = useState("");

  //get all users to compare if user exists
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/register/${username}`
        );
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchData();
  }, [username]);

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //function called when button is pressed
  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === "" ||
      password === "" ||
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      age === 0 ||
      skills.length === 0 ||
      disability === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `All Fields are required`,
      });
      return;
    }

    if (!isEmailValid()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Invalid Email`,
      });
      return;
    }

    if (user !== null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${username} already exist`,
      });
    } else {
      await axios
        .post(`http://localhost:4000/register/`, {
          userName: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          hasJob: false,
          age: age,
          email: email,
          skills: skills,
          disability: disability,
        })
        .then(() => {
          Swal.fire("You are all done!", "User Registered!", "success");
          setUsername("");
          setPassword("");
          setEmail("");
          setFirstName("");
          setLastName("");
          setAge(0);
          setCheckboxes({
            react: false,
            angular: false,
            javascript: false,
            java: false,
            database: false,
            photography: false,
          });
          setSkills([]);
          setDisability("");
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${email} already exist`,
          });
        });
    }
  };

  return (
    <div className="formContainer">
      <div className="formCard">
        <Form style={{ color: "white" }}>
          {/* Text Fields */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="whiteText">
              <span className="whiteText">Username</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                value={username}
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              <span className="whiteText">Password</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              <span className="whiteText">Email</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalFirstName"
          >
            <Form.Label column sm={2}>
              <span className="whiteText">First Name</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                value={firstName}
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalLastName"
          >
            <Form.Label column sm={2}>
              <span className="whiteText">Last Name</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                value={lastName}
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalAge">
            <Form.Label column sm={2}>
              <span className="whiteText">Age</span>
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                required
                value={age}
                type="number"
                placeholder="Age"
                onChange={(e) => {
                  setAge(parseInt(e.target.value));
                }}
              />
            </Col>
          </Form.Group>

          {/* Skills */}
          <Form.Group as={Row} className="mb-3">
            <Row>
              <Form.Label column sm={2}>
                <span className="whiteText">Skills</span>
              </Form.Label>
              <Col sm={10}>
                <Row>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      label="React"
                      name="react"
                      checked={checkboxes.react}
                      onChange={(event) => {
                        handleCheckboxChange({
                          event,
                          setCheckboxes,
                          setSkills,
                        });
                      }}
                    />
                  </Col>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      label="Angular"
                      name="angular"
                      checked={checkboxes.angular}
                      onChange={(event) => {
                        handleCheckboxChange({
                          event,
                          setCheckboxes,
                          setSkills,
                        });
                      }}
                    />
                  </Col>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      label="JavaScript"
                      name="javascript"
                      checked={checkboxes.javascript}
                      onChange={(event) => {
                        handleCheckboxChange({
                          event,
                          setCheckboxes,
                          setSkills,
                        });
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      label="Java"
                      name="java"
                      checked={checkboxes.java}
                      onChange={(event) => {
                        handleCheckboxChange({
                          event,
                          setCheckboxes,
                          setSkills,
                        });
                      }}
                    />
                  </Col>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      label="Database"
                      name="database"
                      checked={checkboxes.database}
                      onChange={(event) => {
                        handleCheckboxChange({
                          event,
                          setCheckboxes,
                          setSkills,
                        });
                      }}
                    />
                  </Col>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      label="Photography"
                      name="photography"
                      checked={checkboxes.photography}
                      onChange={(event) => {
                        handleCheckboxChange({
                          event,
                          setCheckboxes,
                          setSkills,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form.Group>

          {/* Disabilities */}
          <Form.Group as={Row} className="mb-3">
            <Row>
              <Form.Label column sm={2}>
                <span className="whiteText">Disability</span>
              </Form.Label>
              <Col sm={10}>
                <Row>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      type="radio"
                      label="Blind"
                      name="formHorizontalRadios"
                      id="blindRadio"
                      value="Blind"
                      checked={disability === "Blind"}
                      onChange={(event) => {
                        handleRadioChange({ event, setDisability });
                      }}
                    />
                  </Col>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      type="radio"
                      label="Leg Amputation"
                      name="formHorizontalRadios"
                      id="legAmputationRadio"
                      value="Leg Amputation"
                      checked={disability === "Leg Amputation"}
                      onChange={(event) => {
                        handleRadioChange({ event, setDisability });
                      }}
                    />
                  </Col>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      type="radio"
                      label="Deaf"
                      name="formHorizontalRadios"
                      id="deafRadio"
                      value="Deaf"
                      checked={disability === "Deaf"}
                      onChange={(event) => {
                        handleRadioChange({ event, setDisability });
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      type="radio"
                      label="Mute"
                      name="formHorizontalRadios"
                      id="muteRadio"
                      value="Mute"
                      checked={disability === "Mute"}
                      onChange={(event) => {
                        handleRadioChange({ event, setDisability });
                      }}
                    />
                  </Col>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      type="radio"
                      label="Hand Amputation"
                      name="formHorizontalRadios"
                      id="handAmputationRadio"
                      value="Hand Amputation"
                      checked={disability === "Hand Amputation"}
                      onChange={(event) => {
                        handleRadioChange({ event, setDisability });
                      }}
                    />
                  </Col>
                  <Col sm={{ span: 4 }}>
                    <Form.Check
                      type="radio"
                      label="Speech Impairment"
                      name="formHorizontalRadios"
                      id="speechImpairmentRadio"
                      value="Speech Impairment"
                      checked={disability === "Speech Impairment"}
                      onChange={(event) => {
                        handleRadioChange({ event, setDisability });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                type="submit"
                onClick={(e) => {
                  registerHandler(e);
                }}
              >
                Register
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
