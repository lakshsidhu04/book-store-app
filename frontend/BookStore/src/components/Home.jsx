import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdAddBox, MdDelete } from 'react-icons/md';
import axios from 'axios';

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3001/books');
                setBooks(response.data.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleClick = () => {
        // Define what happens when a book is clicked
    };

    return (
        <div className='bg-black text-white w-full flex flex-col items-center p-5'>
            <Link to={`/books/create`} className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300 mb-5">Add new Book</Link>
            {(books.length == 0) ? '' : <h1 className='text-2xl'>Books</h1>}
            {loading ? (
                <div className="text-lg">Loading...</div>
            ) : (
                books.map((book) => (
                    <div key={book.id} className="bg-gray-700 w-2/3 m-4 p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <div className="info mb-4">
                            <div className='text-2xl font-bold mb-2'>{book.title}</div>
                            <div className='text-lg mb-1'>{book.author}</div>
                            <div className="text-md text-gray-400">{book.genre}</div>
                        </div>
                        
                        <div className="buttons flex justify-around">
                            <Link to={`/books/details/${book._id}`} className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300">Show</Link>
                            <Link to={`/books/edit/${book._id}`} className="bg-yellow-600 text-white py-2 px-4 rounded shadow-md hover:bg-yellow-700 hover:shadow-lg transition duration-300">Edit</Link>
                            <Link to={`/books/delete/${book._id}`} className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300">Delete</Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
