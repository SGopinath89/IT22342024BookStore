import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {

  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All fields are required");
      }
      else {
        const response = await axios.post( "http://localhost:1000/api/v1/sign-up", Values );
        alert(response.data.message);
        navigate("/LogIn");
      }
    }
    catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900 px-12 py-8">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="font-bold text-zinc-200 text-2xl uppercase">
          Sign up
        </p>

        <div className="mt-4">
          
          {/* username */}
          <div>
            <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 rounded-lg focus:ring-2 focus:ring-zinc-900 p-2 outline-none" placeholder="username" name="username" value={Values.username} onChange={change} required />
          </div>

          {/* email */}
          <div className="mt-4">
            <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 rounded-lg focus:ring-2 focus:ring-zinc-900 p-2 outline-none" placeholder="example@email.com" name="email" value={Values.email} onChange={change} required />
          </div>
          
          {/* password */}
          <div className="mt-4">
            <input type="password" className="w-full mt-2 bg-zinc-900 text-zinc-100 rounded-lg focus:ring-2 focus:ring-zinc-900 p-2 outline-none" placeholder="password" name="password" value={Values.password} onChange={change} required />
          </div>

          {/* address */}
          <div className="mt-4">
            <textarea rows="5" className="w-full mt-2 bg-zinc-900 text-zinc-100 rounded-lg focus:ring-2 focus:ring-zinc-900 p-2 outline-none" placeholder="address" name="address" value={Values.address} onChange={change} required />
          </div>

          {/* signup button */}  
          <div className="mt-4">
            <button className="w-full mt-2 bg-zinc-900 text-zinc-100 rounded-lg focus:ring-2 focus:ring-zinc-900 p-2 outline-none" onClick={submit}>
              Sign up
            </button>
          </div>

          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>

          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp