
import React, { Suspense } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';

// Lazy load only secondary pages for code splitting
const CatalogRouter = React.lazy(() => import('./components/CatalogRouter'));

// Simple loading fallback (only used for lazy-loaded pages)
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm font-medium">Carregando...</p>
    </div>
  </div>
);

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header onNavigateHome={() => navigate('/')} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/cursos/*" element={
          <Suspense fallback={<PageLoader />}>
            <CatalogRouter />
          </Suspense>
        } />
        {/* Fallback para home se rota não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;