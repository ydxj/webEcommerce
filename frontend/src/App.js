import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
