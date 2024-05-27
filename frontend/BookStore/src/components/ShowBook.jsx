import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

function ShowBook() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/books/${id}`);
        setBook(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-5">
      {loading ? (
        <div className="text-lg">Loading...</div>
      ) : (
        <div className='bg-gray-800 w-2/3 p-6 rounded-lg shadow-lg'>
          <div className='mb-4'>
            <div className='text-3xl font-bold mb-2'>{book.title}</div>
            <div className="text-lg text-gray-400 mb-1">{book.author}</div>
            <div className="text-md text-gray-400 mb-1">{book.genre}</div>
            <div className="text-md text-gray-400">{book.rating}</div>
          </div>
          <div className="text-lg leading-relaxed">{book.description}</div>
        </div>
      )}
    </div>
  );
}

export default ShowBook;
