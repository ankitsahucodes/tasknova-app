import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const SignUp = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return toast.error("All Field are required!");
    }

    try {
      const response = await axios.post(
       `${BASE_URL}/auth/signup`,
        signupInfo,
      );
      toast.success(response.data.message || "User added Successfully!");

      setSignupInfo({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add User");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className=" p-5 shadow-lg ">
        <h1 style={{ color: "#6650EC" }} className="text-center fs-3">
          Tasknova
        </h1>
        <h3 className="text-center">Register your account</h3>
        <div className="text-center text-secondary">
          Please enter your details
        </div>
        <br />
        <form onSubmit={handleSignup}>
          <div>
            <label>Name</label>
            <br />
            <input
              type="text"
              className="w-100 form-control rounded-md shadow-sm p-2 my-2"
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              value={signupInfo.name}
              required
            />
            <label>Email</label>
            <br />
            <input
              type="email"
              className="w-100 form-control rounded-md shadow-sm p-2 my-2"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              value={signupInfo.email}
              required
            />
          </div>
          <div>
            <label className="mt-2">Password</label>
            <br />
            <input
              type="password"
              className="w-100 form-control rounded-md shadow-sm p-2 my-2"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={signupInfo.password}
              required
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="text-decoration-none">
            &nbsp;Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
