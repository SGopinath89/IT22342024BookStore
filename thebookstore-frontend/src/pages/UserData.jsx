import React from 'react'
import { MdClose } from 'react-icons/md';

const UserData = ({ userDiv, userDivData, setuserDiv }) => {
    return (
        <>
      <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}>
        
      </div>{" "}

      <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
        
        <div className="bg-zinc-800 text-white border rounded-lg p-4 w-[80%] md:w-[50%] lg:w-[40%]">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">User Details</h1>
                <button onClick={() => setuserDiv("hidden")}>
                    <MdClose className="text-zinc-400" />
                </button>
            </div>

            <div className="mt-2">
                <label htmlFor="">
                    Username:{" "}
                    <span className="font-semibold">{userDivData.username}</span>
                </label>
            </div>

            <div className="mt-4">
                <label htmlFor="">
                    Email:{" "}
                    <span className="font-semibold">{userDivData.email}</span>
                </label>
            </div>

            <div className="mt-4">
                <label htmlFor="">
                    Address:{" "}
                    <span className="font-semibold">{userDivData.address}</span>
                </label>
            </div>
        </div>
      </div>
    </>
    )
}

export default UserData
