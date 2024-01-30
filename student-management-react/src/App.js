import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  return <>
  <BrowserRouter>
    <Main />
  </BrowserRouter>
  </>
}

export default App;
