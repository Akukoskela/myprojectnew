import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { DataGrid } from '@mui/x-data-grid';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://todolist-react-af882-default-rtdb.europe-west1.firebasedatabase.app/items.json')
      .then(response => response.json())
      .then(data => setTodos(Object.values(data)))
      .catch(err => console.error(err))
  }

 

  return (
    <div className="App">


    </div>
  );
}

export default App;