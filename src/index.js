import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/Navbar.css';
import './styles/Homepage.css';
import './styles/Mandatory.css';
import './styles/ResultsSearch.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);