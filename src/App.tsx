

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CatalogRouter from './components/CatalogRouter';
import Footer from './components/Footer';

import ScrollToTop from './components/ScrollToTop';

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header onNavigateHome={() => navigate('/')} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/cursos/*" element={<CatalogRouter />} />
        {/* Fallback para home se rota não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;