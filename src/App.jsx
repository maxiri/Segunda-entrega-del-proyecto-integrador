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
        <Header />
        <CartModal />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alta" element={<Alta />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer /> {/* Aquí */}
        <Toast />
      </Router>
    </ProductProvider>
  );
};


export default App;

