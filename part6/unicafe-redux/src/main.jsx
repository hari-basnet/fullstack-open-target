import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createStore } from "redux";
import counterReducer from '../reducers/counterReducer.js';

const store  = createStore(counterReducer);

// Create the root only once
const root = createRoot(document.getElementById("root"));

const renderapp = () => {
  root.render(
  <StrictMode>
    <App store={store}/>
  </StrictMode>,
)}

renderapp();
store.subscribe(renderapp);
