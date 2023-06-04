import React, { useState, useContext } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
//import contect helper
import { UserContext } from "../util/contexts/UserContext";
export const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login/", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("loginUser", JSON.stringify(response.data));
        setUser(response.data.userName);
        Swal.fire({
          title: "Login Successful",
          text: "You are done!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Invalid username or password`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Invalid username or password`,
      });
    }
  };

  return (
    <div className="formContainer">
      <div style={{ marginTop: "-50px" }}>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-dark text-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "400px" }}
              >
                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <MDBInput
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Username"
                    id="formControlUsername"
                    type="text"
                    size="lg"
                  />
                  <MDBInput
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Password"
                    id="formControlPassword"
                    type="password"
                    size="lg"
                  />

                  <p className="small mb-3 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>
                  <MDBBtn
                    onClick={handleLogin}
                    outline
                    className="mx-2 px-5"
                    color="white"
                    size="lg"
                    style={{ marginBottom: "10px" }}
                  >
                    Login
                  </MDBBtn>

                  <div>
                    <p className="mb-0">
                      Don't have an account?
                      <Link to="/register">
                        <span className="text-white-50 fw-bold">Sign Up</span>
                      </Link>
                    </p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default LoginForm;
