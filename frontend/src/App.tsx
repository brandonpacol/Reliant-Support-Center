import { Routes, Route } from 'react-router-dom';
import TicketsPage from './pages/TicketsPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
      </Routes>
    </div>
  );
}

export default App;