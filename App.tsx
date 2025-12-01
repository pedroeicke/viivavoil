import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Account from './pages/Account';
import { MessageCircle } from 'lucide-react';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col font-sans text-stone-800 bg-stone-50/50">
            <Header />
            <CartSidebar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loja" element={<Shop />} />
                <Route path="/produto/:slug" element={<ProductDetail />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/conta" element={<Account />} />
              </Routes>
            </main>

            <Footer />

            {/* Floating WhatsApp Button */}
            <a
              href="#"
              className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
              aria-label="Fale conosco no WhatsApp"
            >
              <MessageCircle size={28} />
            </a>
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;