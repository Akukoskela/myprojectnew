import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTodo from './AddTodo';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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
      .then(data => addKeys(data))
      .then(data => setTodos(Object.values(data)))
      .catch(err => console.error(err))

  }

  // Add keys to the todo objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, 'id', { value: keys[index] }));
    setTodos(valueKeys);
  }

  const addTodo = (newTodo) => {
    fetch('https://todolist-react-af882-default-rtdb.europe-west1.firebasedatabase.app/items/.json',
      {
        method: 'POST',
        body: JSON.stringify(newTodo)
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }

  function deleteTodo(id) {
    fetch(`https://todolist-react-af882-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,
      {
        method: 'DELETE',
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }
  const rowData = todos



  const columnDefs = [
    { headerName: 'Description', field: "description" },
    { headerName: 'Date', field: "date" },
    { headerName: 'Priority', field: "priority" },
    { headerName: '', field: 'id', cellRenderer: params => <IconButton onClick={() => deleteTodo(params.value)} size="small" color="error"><DeleteIcon /></IconButton> }
  ]


  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            TodoList
          </Typography>
        </Toolbar>
      </AppBar>
      <AddTodo addTodo={addTodo} />
      <div className="ag-theme-material" style={{ height: 600, width: 1100, margin: 'auto' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
        >
        </AgGridReact>
      </div>

    </div>
  );
}

export default App;