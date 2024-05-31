import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        { headers }
      );
      setCart(res.data.data);
    };
    fetch();
  }, [Cart]);

  const deletItems = async (bookid) => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 md:px-12 py-8 md:py-12 h-auto">
      {!Cart && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
          </div>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {Cart.map((items, i) => (
            <div className="w-full my-4 rounded-lg flex flex-col md:flex-row p-4 bg-zinc-800 shadow-lg justify-between items-center transition-all duration-300 hover:shadow-xl" key={i}>
              <img src={items.url} alt="" className="h-[20vh] md:h-[10vh] object-cover rounded-lg"/>
            
              <div className="w-full md:w-auto md:ml-4 flex flex-col items-start md:items-start">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
            
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {items.category}
                </p>
              </div>
            
              <div className="flex mt-4 md:mt-0 w-full md:w-auto items-center justify-between md:justify-start md:ml-auto">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  $ {items.price}
                </h2>
            
                <button className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ml-4 transition-all duration-300 hover:bg-red-700 hover:text-white hover:border-red-100" onClick={() => deletItems(items._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {Cart && Cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-6 bg-zinc-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
        
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{Cart.length} books</h2>
              <h2>$ {Total}</h2>
            </div>
        
            <div className="w-full mt-4">
              <button className="bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-800 rounded-lg px-4 py-3 flex justify-center w-full font-semibold transition-all duration-300 hover:from-zinc-200 hover:to-zinc-300" onClick={PlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart