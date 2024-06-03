import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {

    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        desc: "",
        price: "",
        category: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();
  
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
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
                const response = await axios.put(
                    "http://localhost:1000/api/v1/update-book",
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
                //console.log(response);
                navigate(`/view-book-details/${id}`);
            }
        }
        catch (error) {
            console.log(error);
            navigate(`/view-book-details/${id}`);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `http://localhost:1000/api/v1/get-book-by-id/${id}`
            );
            setData(response.data.data);
        };
        fetch();
    }, []);
  
    return (
        <div className="bg-zinc-900 h-[100%] p-4 md:p-4">
            <h1 className="text-center justify-center text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                Update book
            </h1>

            <div className="mb-20 p-4 bg-zinc-800 rounded-lg">
                
                {/* image */}
                <div>
                    <label htmlFor="" className="text-zinc-400">
                        Image
                    </label>
                    <input type="text" name="url" placeholder="URL of the image" value={Data.url} onChange={change} className="rounded-lg w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" required />
                </div>

                {/* title */}
                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Title
                    </label>
                    <input type="text" name="title" placeholder="Title of the book" value={Data.title} onChange={change} className="rounded-lg w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" required />
                </div>

                {/* author */}
                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Author
                    </label>
                    <input type="text" name="author" placeholder="Author of the book" value={Data.author} onChange={change} className="rounded-lg w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" required />
                </div>

                {/* description */}
                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Description
                    </label>
                    <textarea name="desc" placeholder="Description of the book" rows="5" value={Data.desc} onChange={change} className="rounded-lg w-full mt-2 bg bg-zinc-900 text-zinc-100 p-2 outline-none" required />
                </div>

                <div className="mt-4 flex gap-4">
                    
                    {/* category */}
                    <div className="w-3/6">
                        <label htmlFor="" className="text-zinc-400">
                            Category
                        </label>
                        <input type="text" name="category" placeholder="Category of the book" value={Data.category} onChange={change} className="rounded-lg w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" required />
                    </div>

                    {/* price */}
                    <div className="w-3/6">
                        <label htmlFor="" className="text-zinc-400">
                            Price
                        </label>
                        <input type="number" name="price" placeholder="Price of the book" value={Data.price} onChange={change} className="rounded-lg w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" required />
                    </div>
                </div>

                {/* button */}
                <button className="mt-4 px-3 bg-zinc-900 text-white font-semibold py-2 rounded-lg hover:bg-white hover:text-zinc-900 transition-all" onClick={submit}>
                    Update Book
                </button>
            </div>
        </div>
    )
}

export default UpdateBook
