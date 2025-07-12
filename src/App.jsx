import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alta from './pages/Alta';
import Contacto from './pages/Contacto';
import Header from './components/Header';
import CartModal from './components/CartModal';
import { ProductProvider } from './context/ProductContext';
import Footer from './components/Footer';
import Toast from './components/Toast';

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <div className="app-container">
          <Header />
          <CartModal />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/alta" element={<Alta />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
            <Toast />
          </main>
          <Footer />
        </div>
      </Router>
    </ProductProvider>
  );
};

export default App;


