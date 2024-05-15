import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TicketsPage from './pages/TicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import TicketSubmissionPage from './pages/TicketSubmissionPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/tickets/:id" element={<TicketDetailsPage />} />
        <Route path="/submit-ticket" element={<TicketSubmissionPage />} />
      </Routes>
    </div>
  );
}

export default App;