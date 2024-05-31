import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {

    const [Data, setData] = useState();

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:1000/api/v1/get-recent-books"
            );
            setData(response.data.data);
        };
        fetch();
    }, []);

    return (
        <div className="mt-10 px-5">
            <h4 className="flex items-center justify-center text-xl md:text-3xl text-white uppercase">Recently added books</h4>
            
            {!Data && (
                <div className="flex items-center justify-center my-8">
                    <Loader/>{" "}
                </div>
            )}

            <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {Data && Data.map((items, i) => (
                    <div key={i}>
                        <BookCard data={items} />{" "}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentlyAdded