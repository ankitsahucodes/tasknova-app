import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    if (!email || !password) {
      return toast.error("All Field are required!");
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, loginInfo);
      // console.log(response);

      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userMail", response.data.email);
      localStorage.setItem("userName", response.data.name);
      setLoginInfo({
        email: "",
        password: "",
      });

      toast.success(response.data.message || "Logged In Successfully!");

      navigate("/");
    } catch (error) {
      //   console.log(error);
      return toast.error(error?.response?.data?.error || "Login failed!");
    }
  };
  // console.log(import.meta.env.VITE_API_BASE_URL);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className=" p-5 shadow-lg ">
        <h1 style={{ color: "#6650EC" }} className="text-center fs-3">
          Tasknova
        </h1>
        <h3 className="text-center">Login in to your account</h3>
        <div className="text-center text-secondary">
          Please enter your details
        </div>
        <br />
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <br />
            <input
              type="email"
              className="w-100 form-control rounded-md shadow-sm p-2 my-2"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              value={loginInfo.email}
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
              onChange={handleChange}
              name="password"
              value={loginInfo.password}
              required
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an Account?
          <Link to="/signup" className="text-decoration-none">
            &nbsp;Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
