import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <GoogleOAuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
