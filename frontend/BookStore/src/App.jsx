import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateBook from './components/CreateBook';
import ShowBook from './components/ShowBook';
import DeleteBook from './components/DeleteBook';
import EditBook from './components/EditBook';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/books/create' element={<CreateBook />}></Route>
        <Route path='/books/details/:id' element={<ShowBook />}></Route>
        <Route path='/books/delete/:id' element={<DeleteBook />}></Route>
        <Route path='/books/edit/:id' element={<EditBook />}></Route>
      </Routes>

    </>
  );
}

export default App;
