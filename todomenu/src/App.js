import './App.css';
import Home from './components/Home.js';
import Todolist from './components/Todolist';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Home</Link>{' '}
        <Link to="/todolist">Todolist</Link>{' '}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/todolist" element={<Todolist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
