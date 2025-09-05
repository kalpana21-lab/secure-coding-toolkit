// src/index.js
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/global.css';
import './style/global.css';
import { QuizProvider } from './context/QuizContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QuizProvider>
    <App />
  </QuizProvider>
);