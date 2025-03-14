import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import NavigationBar from "../../Components/Navbar/NavigationBar";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
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
    let newErrors = { fullName: "", email: "", phone: "", password: "" };

    if (!user.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!user.phone.trim()) {
      newErrors.phone = "Phone number is required";
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
      const registerResponse = await axios.post(
        "http://localhost/ecommerce/ap/register.php",
        user
      );

      if (registerResponse.data) {
        dispatch(
          login({
            customer: registerResponse.data.data,
          })
        );

        if (registerResponse.data.data.role === "user") {
          navigate("/", { replace: true });
        } else if (registerResponse.data.data.role === "admin") {
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
          <div className="col-12 col-md-8 col-lg-6 p-5 rounded-5 bg-light text-center">
            <h2 className="mb-5 fw-bold" style={{ color: "#d25795" }}>
              Sign up
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                className={`form-control mb-3 inputField ${
                  errors.fullName ? "errorInput" : ""
                }`}
                type="text"
                name="fullName"
                placeholder="Full name"
                onChange={handleChange}
                value={user.fullName}
              />
              <span className="text-danger">{errors.fullName}</span>

              <input
                className={`form-control mb-3 inputField ${
                  errors.email ? "errorInput" : ""
                }`}
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
              />
              <span className="text-danger">{errors.email}</span>

              <input
                className={`form-control mb-3 inputField ${
                  errors.phone ? "errorInput" : ""
                }`}
                type="number"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                value={user.phone}
              />
              <span className="text-danger">{errors.phone}</span>

              <input
                className={`form-control mb-3 inputField ${
                  errors.password ? "errorInput" : ""
                }`}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
              />
              <span className="text-danger">{errors.password}</span>

              <button
                className="form-control btn btn-primary border-0 mt-3"
                style={{ backgroundColor: "#d25795" }}
                type="submit"
              >
                Create Your Account
              </button>
            </form>
            <button
              className="mt-3 text-decoration-none btn fw-bold"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            
            {apiError && <div className="alert alert-danger">{apiError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;