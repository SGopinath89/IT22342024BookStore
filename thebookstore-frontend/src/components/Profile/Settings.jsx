import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';

const Settings = () => {

  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/update-address",
      Value,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {!ProfileData && (
        <div className="flex items-center justify-center w-full h-[100%]">
          <Loader />
        </div>
      )}{" "}

      {ProfileData && (
        <div className="h-[100%] p-4 md:p-8 text-zinc-100 bg-zinc-900 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-300 mb-8">
            Settings
          </h1>
        
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <label htmlFor="" className="text-lg">Username</label>
              <p className="p-3 rounded-lg bg-zinc-800 mt-2 font-semibold text-lg">{ProfileData.username}</p>
            </div>
        
            <div className="flex-1">
              <label htmlFor="" className="text-lg">Email</label>
              <p className="p-3 rounded-lg bg-zinc-800 mt-2 font-semibold text-lg">{ProfileData.email}</p>
            </div>
          </div>
        
          <div className="mt-8 flex flex-col">
            <label htmlFor="" className="text-lg">Address</label>
            <textarea className="p-3 rounded-lg bg-zinc-800 mt-2 font-semibold text-lg resize-none" rows="5" name="address" placeholder="Address" value={Value.address} onChange={change}></textarea>
          </div>
        
          <div className="mt-8 flex justify-end">
            <button className="bg-yellow-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-all duration-300 shadow-md" onClick={submitAddress}>
              Update
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings