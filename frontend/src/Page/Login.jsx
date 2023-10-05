import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaBus } from "react-icons/fa";
import { styled } from "styled-components";
import axios from "axios";
import { baseUrl } from "../Url";
import { toast } from "react-toastify";
const Contain = styled(Container)`
  height: 100vh;
  display: flex;
  align-items: center;
  font-family: "Open Sans", sans-serif;
`;
const LeftDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  width: 17rem;
  border-radius: 1rem 0 0 1rem;
`;

const RightDiv = styled.div`
  padding: 0 40px;
  margin: auto;
  justify-content: space-evenly;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px 13px;
`;

const Button = styled.button`
  padding: 10px 20px;
  width: fit-content;
  color: white;
  border: none;
  cursor: ${(props) => (props.loading ? "not-allowed" : "pointer")};
`;

const Register = styled(Link)`
  /* Styles for the "Login" link */
  color: #0084ff;
  cursor: pointer;
  text-decoration: none;
`;

const RegisterAccount = styled.p`
  /* Styles for the paragraph */
  font-size: 14px;
  margin-top: 30px;

  /* Make the "Login" span a child of this paragraph */
  & ${Register} {
    margin-left: 5px;
  }
`;

const Icon = styled(FaBus)`
  font-size: 7rem;
  color: white;
`;
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        email,
        password,
      };

      // console.log(formData);
      const response = await axios.post(`${baseUrl}/user/login`, formData);
      console.log(response.data);
      localStorage.setItem("_id", response.data._id);
      toast.success("Login successful!");
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error(`Login failed. ${error.response.data.error}.`);
      setLoading(false);
    }
  };
  return (
    <Contain>
      <div
        style={{ borderRadius: "1rem", width: "45rem", height: "26.3rem" }}
        className="row mx-auto shadow"
      >
        <LeftDiv className="col-5 bg-dark d-none d-md-flex">
          <div>
            <h4 className=" text-white">Book Bus</h4>
          </div>
          <div>
            <Icon />
          </div>
        </LeftDiv>
        <RightDiv className="col-7 mx-auto pt-4 px-0 px-md-3 pb-3">
          <h2 className="mb-3 fw-bold mt-2">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Input
              className="form-control mb-3"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="form-control mb-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="btn btn-dark" type="submit" loading={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Form>
          <RegisterAccount>
            Doesn't have an account?
            <span>
              <Register to="/register">Register</Register>
            </span>
          </RegisterAccount>
        </RightDiv>
      </div>
    </Contain>
  );
};

export default Login;
