import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/books/${id}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-5">
      {loading ? (
        <div className="text-lg">Loading...</div>
      ) : (
        <div className="bg-gray-800 w-full max-w-md p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Delete Book</h2>
          <div className="mb-4">
            <p className="text-lg">
              Are you sure you want to delete the book "{book?.title}"?
            </p>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteBook;
