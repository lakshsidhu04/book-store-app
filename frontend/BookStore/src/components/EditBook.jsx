import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    rating: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/books/${id}`, book);
      navigate('/'); // Redirect to home page
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
          <h2 className="text-3xl font-bold mb-6">Edit Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="title">Title</label>
              <input
                className="w-full px-3 py-2 text-black rounded"
                type="text"
                id="title"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="author">Author</label>
              <input
                className="w-full px-3 py-2 text-black rounded"
                type="text"
                id="author"
                name="author"
                value={book.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="genre">Genre</label>
              <input
                className="w-full px-3 py-2 text-black rounded"
                type="text"
                id="genre"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="rating">Rating</label>
              <input
                className="w-full px-3 py-2 text-black rounded"
                type="number"
                id="rating"
                name="rating"
                value={book.rating}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="description">Description</label>
              <textarea
                className="w-full px-3 py-2 text-black rounded"
                id="description"
                name="description"
                value={book.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300"
                onClick={() => navigate('/')}
              >
                Exit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditBook;
