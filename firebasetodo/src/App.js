import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

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
  const rowData = todos

  const columnDefs = [
    { headerName: 'Description', field: "description" },
    { headerName: 'Date', field: "date" },
    { headerName: 'Priority', field: "priority" }
  ]


  return (
    <div className="App">

      <div className="ag-theme-material" style={{ height: 600, width: 600, margin: 'auto' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>

    </div>
  );
}

export default App;