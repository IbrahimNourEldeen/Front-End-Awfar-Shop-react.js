import React, { useState } from "react";
import "./Form.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../Components/Navbar/NavigationBar";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      email: "",
      password: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const loginResponse = await axios.post(
        "http://localhost/ecommerce/ap/login.php",
        user
      );

      if (loginResponse.data) {
        dispatch(
          login({
            customer: loginResponse.data.data,
          })
        );

        console.log(loginResponse.data.data);
        if (loginResponse.data.data.role === "user") {
          navigate("/", { replace: true });
        } else if (loginResponse.data.data.role === "admin") {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (error) {
      console.error("Error Details:", error.message);
      if (error.response) {
        setApiError(error.response.data.message);
      } else if (error.request) {
        setApiError("No response received from the server.");
      } else {
        setApiError("An error occurred while setting up the request.");
      }
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container" style={{ height: "91vh" }}>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-5 p-5 rounded-5 bg-light text-center">
            <h2 className="mb-5 fw-bold" style={{ color: "#d25795" }}>
              Log in
            </h2>

            
            <form onSubmit={handleSubmit}>
              <input
                className={`form-control mb-3 inputField ${
                  errors.email ? "errorInput" : ""
                }`}
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={user.email}
              />
              <span className="text-danger">{errors.email}</span>

              <input
                className={`form-control mb-3 inputField ${
                  errors.password ? "errorInput" : ""
                }`}
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={user.password}
              />
              <span className="text-danger">{errors.password}</span>

              <button
                className="form-control btn btn-primary border-0"
                style={{ backgroundColor: "#d25795" }}
                type="submit"
              >
                Login
              </button>
            {apiError && <div className="alert alert-danger mt-2">{apiError}</div>}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;