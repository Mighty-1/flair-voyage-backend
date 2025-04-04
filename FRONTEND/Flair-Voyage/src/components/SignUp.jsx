import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAgent: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox separately
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        formData
      );
      if (response.status === 201) {
        setSuccessMessage("Signup successful! You can now log in.");
        setErrorMessage("");
      } else {
        setErrorMessage("Signup failed. Please try again.");
        setSuccessMessage(""); // Clear any previous success message
      }
    } catch (error) {
      if (error.message && error.status === 400) {
        // 400 Conflict: User already exists
        setErrorMessage("Email already exists. Please log in.");
      } else {
        setErrorMessage("Failed to signup. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <p className="text-2xl font-semibold mb-4">Sign Up</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">
            Name:
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Email:
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Password:
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isAgent"
              className="mr-2"
              checked={formData.isAgent}
              onChange={handleChange}
              // onClick={handleCheckboxClick}
            />
            Boat Agent
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Sign Up
        </button>
        <p className="text-sm text-gray-600">
          <Link to="/login" className="text-blue-500">
            Already have an account? Log In
          </Link>
        </p>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
