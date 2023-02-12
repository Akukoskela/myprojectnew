import React, { useState } from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import ReactiveButton from 'reactive-button';


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
    { headerName: 'Description', field: 'description', suppressMovable: true, sortable: true },
    { headerName: 'Date', field: 'date', suppressMovable: true, sortable: true },
    { headerName: 'Status', field: 'status', suppressMovable: true, sortable: true },

  ];

  const rowData = todos;


  return (
    <div className="App">
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" name="date" value={todo.date} onChange={inputChanged} />
      <input placeholder="Status" name="status" value={todo.status} onChange={inputChanged} />

      <ReactiveButton

        idleText="Submit"
        loadingText="Loading"
        successText="Done"
        onClick={addTodo}
      />

      <div className="ag-theme-material" style={{ height: 600, width: 600, margin: 'auto' }}>
        <AgGridReact
          animateRows='true'
          rowData={rowData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>


    </div>
  );

}
export default App;