import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {

  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-order-history",
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {!OrderHistory && (
        <div className="flex items-center justify-center w-full h-[100%]">
          <Loader />
        </div>
      )} 

      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Order History
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[10%]">
              <h1 className="text-center">No.</h1>
            </div>

            <div className="w-[40%]">
              <h1>Title</h1>
            </div>

            <div className="w-[20%]">
              <h1>Category</h1>
            </div>

            <div className="w-[15%]">
              <h1>Price</h1>
            </div>

            <div className="w-[15%]">
              <h1>Status</h1>
            </div>
          </div>

          {OrderHistory.map((items, i) => (
            <div className="bg-zinc w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-point">
              <div className="w-[10%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>

              <div className="w-[40%]">
                <Link className="hover:text-blue-300" to={`/view-book-details/${items.book._id}`}>
                  {items.book.title}
                </Link>
              </div>

              <div className="w-[20%]">
                <h1 className="">{items.book.category}</h1>
              </div>

              <div className="w-[15%]">
                <h1 className="">$ {items.book.price}</h1>
              </div>

              <div className="w-[15%]">
                <h1 className="font-semibold text-green-500">
                  {items.status === "Order placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Cancelled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default UserOrderHistory