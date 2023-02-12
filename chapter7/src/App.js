import React, { useState } from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [todo, setTodo] = useState({ description: '', date: '', status: '' });
  const [todos, setTodos] = useState([]);


  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const addTodo = () => {

    setTodos([...todos, todo]);

  }
  const columnDefs = [
    { headerName: 'Description', field: 'description', },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Status', field: 'status' },

  ];

  const rowData = todos;


  return (
    <div className="App">
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" name="date" value={todo.date} onChange={inputChanged} />
      <input placeholder="Status" name="status" value={todo.status} onChange={inputChanged} />
      <button onClick={addTodo}>Add</button>
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