import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../ToolKit/authSlice";
import "../styles/addYacht.css";

const AddYacht = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);

  const [features, setFeatures] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    capacity: "",
    availability: true,
    images: [],
    features: [],
    location: "",
    owner: "",
  });

  // Handle file uploads
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    setImages((prevImages) => [...prevImages, ...selectedFiles]); // Append new files to existing ones
  };

  const handleFeaturesChange = (e) => {
    setFeatures(e.target.value.split(","));
  };

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData to handle multipart data
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("capacity", formData.capacity);
    data.append("availability", formData.availability);
    images.forEach((image) => {
      data.append("images", image); // Append each image file
    });
    for (let i = 0; i < features.length; i++) {
      data.append("features", features[i]); // append each feature
    }
    data.append("location", formData.location);
    data.append("owner", user.id);

    try {
      // const token = localStorage.getItem("token");
      const createYacht = await axios.post(
        "http://localhost:3000/api/create-a-yacht",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add bearer token
          },
        }
      );
      if (createYacht.status === 201) {
        alert("Boat added successfully!");
        navigate("/my-boats");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else if (error.message && error.status === 400) {
        alert("Failed to add Boats! Please try again");
      }
    }
  };

  return (
    <div className="add-yacht-container">
      <h1>Add Boat</h1>
      <form onSubmit={handleSubmit} className="add-yacht-form">
        <div>
          <label className="add-yachtInput">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <label className="add-yachtInput">
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <label className="add-yachtInput">
            Price:
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <label className="add-yachtInput">
            Capacity:
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <label className="add-yachtInput">
            Availability:
            <input
              type="checkbox"
              name="availability"
              value={formData.availability}
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <label className="add-yachtInput">
            Images:
            {Array.from({ length: 5 }).map((_, i) => (
              <input
                key={i}
                type="file"
                name={`images-${i}`}
                accept="image/*"
                multiple // Allows selecting multiple files at once
                onChange={handleFileChange}
              />
            ))}
          </label>
        </div>
        <div>
          <label className="add-yachtInput">
            Features:
            <input
              type="text"
              name="features"
              placeholder='Add "," after each feature'
              onChange={handleFeaturesChange}
            />
          </label>
        </div>
        <div>
          {features.map((feature, index) => (
            <p key={index} className="a-y-p">
              {feature}
            </p>
          ))}
        </div>
        <div>
          <label className="add-yachtInput">
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onChange}
            />
          </label>
        </div>
        <button type="submit" className="a-y-addBoatBtn">
          Add Boat
        </button>
      </form>
    </div>
  );
};

export default AddYacht;
