import axios from 'axios';
import React, { useState } from 'react'

const AddBook = () => {

  const [Data, setData] = useState({
      url: "",
      title: "",
      author: "",
      desc: "",
      price: "",
      category: "",
  });

  const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
      const { name, value } = e.target;
      setData({ ...Data, [name]: value });
  };

  const submit = async () => {
      try {
          if ( Data.url === "" || Data.title === "" || Data.author === "" || Data.desc === "" || Data.price === "" || Data.category === "" ) {
              alert("All fields are required");
          }
          else {
              const response = await axios.post(
                  "http://localhost:1000/api/v1/add-book",
                  Data,
                  { headers }
              );
              setData({
                  url: "",
                  title: "",
                  author: "",
                  desc: "",
                  price: "",
                  category: "",
              });
              alert(response.data.message);
          }
      }
      catch (error) {
          console.log(error);
      }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
          Add book
      </h1>

      <div className="p-4 bg-zinc-800 rounded">
        <div>
            <label htmlFor="">
                Image
            </label>
            <input type="text" name="url" placeholder="URL of the image" value={Data.url} onChange={change} className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded" required />
        </div>

        <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
                Title
            </label>
            <input type="text" name="title" placeholder="Title of the book" value={Data.title} onChange={change} className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded" required />
        </div>

        <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
                Author
            </label>
            <input type="text" name="author" placeholder="Author of the book" value={Data.author} onChange={change} className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded" required />
        </div>

        <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
                Description
            </label>
            <textarea name="desc" placeholder="Description of the book" rows="5" value={Data.desc} onChange={change} className="w-full mt-2 bg bg-zinc-900 text-zinc-100 p-2 outline-none rounded" required />
        </div>

        <div className="mt-4 flex gap-4">
            <div className="w-3/6">
                <label htmlFor="" className="text-zinc-400">
                    Category
                </label>
                <input type="text" name="category" placeholder="Category of the book" value={Data.category} onChange={change} className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded" required />
            </div>

            <div className="w-3/6">
                <label htmlFor="" className="text-zinc-400">
                    Price
                </label>
                <input type="number" name="price" placeholder="Price of the book" value={Data.price} onChange={change} className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded" required />
            </div>
        </div>

        <button className="mt-4 px-3 bg-zinc-900 text-white font-semibold py-2 rounded hover:bg-white hover:text-zinc-900 transition-all" onClick={submit}>
            Add Book
        </button>
      </div>
    </div>
  )
}

export default AddBook
