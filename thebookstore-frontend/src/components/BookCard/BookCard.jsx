import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({ data, favourite }) => {

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id,
    };

    const handleRemoveBook = async () => {
        const response = await axios.put(
            "http://localhost:1000/api/v1/remove-book-from-favourite",
            {},
            { headers }
        );
        alert(response.data.message);
    };

    return (
        <div className="bg-zinc-800 rounded-lg p-4 flex flex-col h-[60vh] md:h-[70vh]">
            <Link to={`/view-book-details/${data._id}`}>
                <div className="">
                    <div className="bg-zinc-800 rounded flex items-center justify-center">
                        <img src={data.url} alt="" className="h-[35vh] md:h-[45vh] rounded-lg" />
                    </div>

                    <h2 className="mt-4 text-xl text-white font-semibold">
                        {data.title}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400 font-semibold">
                        By {data.author}
                    </p>
                    <p className="mt-2 text-zinc-200 font-semibold">
                        $ {data.price}
                    </p>
                </div>
            </Link>

            {favourite && (
                <button className="bg-zinc-900 px-4 py-2 rounded-lg border-zinc-900 text-white mt-4"  onClick={handleRemoveBook}>
                    Remove from favourites
                </button>
            )}
        </div>
    );
};

export default BookCard