import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import ToggleColorModeProvider from './utils/ToggleColorMode';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToggleColorModeProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ToggleColorModeProvider>
    </BrowserRouter>
  </Provider>
);
