import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';

const Favourites = () => {

  const [FavouriteBooks, setFavouriteBooks] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [FavouriteBooks]);

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className="text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full h-[100%]">
          No favourite books found
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-zinc-900 rounded-lg">
        {FavouriteBooks && FavouriteBooks.map((items, i) => (
          <div key={i} className="bg-zinc-800 p-4 rounded-lg transition-transform">
            <BookCard data={items} favourite={true} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites