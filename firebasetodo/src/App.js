import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddBook from './AddBook';
import ClearBooks from './ClearBooks';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css';
import { TableSortLabel } from '@mui/material';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://bookstore-react-79d15-default-rtdb.europe-west1.firebasedatabase.app/books.json')
      .then(response => response.json())
      .then(data => addKeys(data))
      .then(data => setBooks(Object.values(data)))
      .catch(err => console.error(err))
  }

  // Add keys to the todo objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, 'id', { value: keys[index] }));
    setBooks(valueKeys);
  }

  const addBook = (newBook) => {
    fetch('https://bookstore-react-79d15-default-rtdb.europe-west1.firebasedatabase.app/books.json',
      {
        method: 'POST',
        body: JSON.stringify(newBook)
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }

  function deleteBook(id) {
    fetch(`https://bookstore-react-79d15-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      {
        method: 'DELETE',
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }

  function deleteAllBooks() {
    fetch('https://bookstore-react-79d15-default-rtdb.europe-west1.firebasedatabase.app/books.json',
      {
        method: 'DELETE',
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }
  const rowData = books



  const columnDefs = [
    { headerName: 'Author', field: "author" },
    { headerName: 'ISBN', field: "isbn" },
    { headerName: 'Price', field: "price", sortable: true },
    { headerName: 'Title', field: "title" },
    { headerName: 'Year', field: "year", sortable: true },
    { headerName: '', field: 'id', cellRenderer: params => <IconButton onClick={() => deleteBook(params.value)} size="small" color="error"><DeleteIcon /></IconButton> }
  ]


  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Booklist
          </Typography>
        </Toolbar>
      </AppBar>

      <div className='napit'>
        <div className='nappi1'>
          <AddBook addBook={addBook} />
        </div>
        <div>
          <button onClick={deleteAllBooks}>Clear all</button>
        </div>
      </div>

      <div className="ag-theme-material" style={{ height: 600, width: 1200, margin: 'auto' }}>
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