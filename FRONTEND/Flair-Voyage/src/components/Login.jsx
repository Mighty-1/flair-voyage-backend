import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../ToolKit/authSlice";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch(); // Redux dispatch
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://flair-voyage-backend.onrender.com/api/login",
        loginData
      );
      if (response.status === 200) {
        const { token, user } = response.data;
        // console.log(response), console.log(token);

        // localStorage.setItem("token", (token)); // Store token
        dispatch(login({user, token})); // Update Redux state
        setErrorMessage("");
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      if (error.message && error.status === 400) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("Failed to login. Please try again.");
      }
    }
  };

  return (
    <div className="lg-form-div">
      <form action="" className="lg-login-form">
        <h1 className="lg-title">Welcome</h1>
        <label className="lg-lb">Email :</label>
        <input
          type="email"
          className="lg-input"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <label className="lg-lb">Password :</label>
        <input
          type="password"
          className="lg-input"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="lg-submitBtn" onClick={handleSubmit}>
          Login
        </button>
        <Link to={"/signup"} className="lg-signup-link">
          Don&apos;t have an account? Sign Up
        </Link>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
