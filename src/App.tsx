import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import CirclesPage from './pages/CirclesPage';
import BorrowPage from './pages/BorrowPage';
import CalculatorPage from './pages/CalculatorPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/circles" element={<CirclesPage />} />
            <Route path="/borrow" element={<BorrowPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
