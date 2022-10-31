import './index.css';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';

// import { fetchTodoAsync } from './features/todo/todoSlice';



const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
//<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</React.StrictMode>
);


reportWebVitals();
