import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from 'components/auth/Login';
import 'configs/i18next';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
);
