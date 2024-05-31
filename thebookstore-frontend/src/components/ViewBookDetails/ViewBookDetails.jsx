import React, { useEffect, useState } from "react";
import axios from "axios";
//import Loader from '../Loader/Loader';
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {

    const { id } = useParams();

    const [Data, setData] = useState();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `http://localhost:1000/api/v1/get-book-by-id/${id}`
            );
            setData(response.data.data);
        };
        fetch();
    }, []);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleFavourite = async () => {
        const response = await axios.put(
            "http://localhost:1000/api/v1/add-book-to-favourite", 
            {}, 
            { headers }
        );
        alert(response.data.message);
    };

    const handleCart = async () => {
        const response = await axios.put(
            "http://localhost:1000/api/v1/add-to-cart",
            {}, 
            { headers }
        );
        alert(response.data.message);
    };

    return (
        <>
            {Data && (
                <div className="flex flex-col lg:flex-row px-4 md:px-12 py-8 bg-zinc-900 gap-8">
                    <div className="w-full lg:w-2/5">
                        <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 rounded-lg p-12 shadow-lg">
                            <img src={Data.url} alt="" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg shadow-md" />
                            
                            {/* User */}
                            {isLoggedIn === true && role === "user" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 gap-8">
                                    
                                    {/* Favourite */}
                                    <button className="bg-white rounded-full text-2xl lg:text-3xl p-3 text-red-500 flex items-center justify-center hover:bg-red-100 transition" onClick={handleFavourite}>
                                        <FaHeart />
                                        <span className="ms-4 block lg:hidden">Favourites</span>
                                    </button>
                
                                    {/* Cart */}
                                    <button className="text-white rounded-full text-2xl lg:text-3xl p-3 bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition" onClick={handleCart}>
                                        <FaShoppingCart />
                                        <span className="ms-4 block lg:hidden">Add to cart</span>
                                    </button>
                                </div>
                            )}
                
                            {/* Admin */}
                            {isLoggedIn === true && role === "admin" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 gap-8">
                                    
                                    {/* Edit */}
                                    <button className="bg-white rounded-full text-2xl lg:text-3xl p-3 flex items-center justify-center hover:bg-gray-200 transition">
                                        <FaEdit />
                                        <span className="ms-4 block lg:hidden">Edit</span>
                                    </button>
                
                                    {/* Delete */}
                                    <button className="text-red-500 rounded-full text-2xl lg:text-3xl p-3 bg-white flex items-center justify-center hover:bg-red-100 transition">
                                        <MdDeleteForever />
                                        <span className="ms-4 block lg:hidden">Delete</span>
                                    </button>

                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/5">
                        <h1 className="text-4xl text-zinc-300 font-semibold mb-4">{Data.title}</h1>
                        <p className="text-zinc-400 mb-4">By {Data.author}</p>
                        <p className="text-zinc-500 text-xl mb-4">{Data.desc}</p>
                        <p className="flex items-center text-zinc-400 mb-4">
                            <BiCategory className="me-2" /> {Data.category}
                        </p>
                        <p className="text-zinc-100 text-2xl font-semibold">
                            Price: $ {Data.price}
                        </p>
                    </div>
                </div>            
            )}
            {!Data && (
                <div className="h-screen bg-zinc-900 flex items-center justify-center">
                    <Loader/>
                </div>
            )}
        </>
    )
}

export default ViewBookDetails