import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPromoActive = searchParams.get('promo') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Links simplificados conforme solicitação
  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Loja', path: '/loja' },
    { name: 'Promolaços', path: '/loja?promo=true' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => {
    if (path.includes('?promo=true')) return isPromoActive;
    // Se for link da loja geral, ativa se estiver na rota /loja e não for promo
    if (path === '/loja') return location.pathname === '/loja' && !isPromoActive;
    return location.pathname === path && !location.search;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-white py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-stone-600 hover:text-rose-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="text-2xl md:text-3xl font-serif text-stone-800 tracking-tight hover:opacity-80 transition-opacity">
              Viiva<span className="text-rose-500"> </span>Voil
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs lg:text-sm uppercase tracking-wide font-medium transition-colors hover:text-rose-500 ${
                    isActive(link.path) ? 'text-rose-500 font-bold border-b-2 border-rose-500 pb-1' : 'text-stone-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              <button className="hidden md:block text-stone-600 hover:text-rose-500 transition-colors">
                <Search size={20} />
              </button>
              
              <Link 
                to="/conta" 
                state={{ activeTab: 'wishlist' }}
                className="hidden md:block relative text-stone-600 hover:text-rose-500 transition-colors"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-bold h-3 w-3 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              
              <Link to="/conta" className="text-stone-600 hover:text-rose-500 transition-colors">
                <User size={20} />
              </Link>
              
              <button 
                className="relative text-stone-600 hover:text-rose-500 transition-colors"
                onClick={toggleCart}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-50 bg-white p-6 md:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-2xl font-serif">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} className="text-stone-500" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium border-b border-stone-100 pb-3 ${
                     isActive(link.path) ? 'text-rose-500' : 'text-stone-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-4"></div>
              <Link
                  to="/conta"
                  className="text-lg font-medium text-stone-700 border-b border-stone-100 pb-3"
                  onClick={() => setIsMobileMenuOpen(false)}
              >
                  Minha Conta
              </Link>
              <Link
                  to="/conta"
                  state={{ activeTab: 'wishlist' }}
                  className="text-lg font-medium text-stone-700 border-b border-stone-100 pb-3 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Meus Favoritos
                  {wishlist.length > 0 && <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full">{wishlist.length}</span>}
              </Link>
            </nav>
            <div className="mt-10 pt-6 border-t border-stone-100">
               <p className="text-stone-400 text-sm mb-4">Siga-nos</p>
               <div className="flex gap-4">
                 <span className="text-rose-400">Instagram</span>
                 <span className="text-rose-400">Facebook</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;