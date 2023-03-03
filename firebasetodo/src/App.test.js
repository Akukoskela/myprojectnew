import React from 'react'
import TodoTable from './TodoTable'
import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders todotable', () => {
  const row = [
    {description: 'Go to coffee', date: '24.11.2022'}
  ]

  render(<TodoTable todos={row}/>);
  const tableRow = screen.getByText('Go to coffee'); 
  expect(tableRow).toBeInTheDocument();
})

test('add todo',() => {
  render(<App/>);

  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } })
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '29.11.2022' } })

  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByText('Go to coffee')).toBeInTheDocument();
})