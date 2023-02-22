import React, { useState } from 'react';
import './App.css';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid } from '@mui/x-data-grid';

var x = 0

function App() {
  const [todo, setTodo] = useState({ description: '', date: '', id: '' });
  const [todos, setTodos] = useState([]);




  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value, id: x });
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
    x = x + 1
  }

  const deleteTodo = (row) => {
    setTodos(todos.filter((todo, index) => index !== row));
  }

  const rows = todos.map((todo) => ({
    id: todo.id,
    description: todo.description,
    date: todo.date
  }))



  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Todolist
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack
        direction="row"
        spacing={2}
        mt={2}
        justifyContent="center"
        alignItems="center">

        <TextField
          variant="standard"
          label="Description"
          name="description"
          value={todo.description}
          onChange={inputChanged}
        />
        <TextField
          variant="standard"
          label="Date"
          name="date"
          value={todo.date}
          onChange={inputChanged}
        />
        <Button color='success' size='small' onClick={addTodo} variant="outlined"><SaveIcon></SaveIcon>Add</Button>
      </Stack>


      <div style={{ height: '700px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
        />

      </div>

    </div >

  );
}

export default App;