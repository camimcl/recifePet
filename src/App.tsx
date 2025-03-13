import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PetSelection from './components/PetSelection';
import PetGame from './components/PetGame';
import ClothesSelection from './components/ClothesSelection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PetSelection />} />
        <Route path="/pet/:type" element={<PetGame />} />
        <Route path="/pet/:type/clothes" element={<ClothesSelection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;