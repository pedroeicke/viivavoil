import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-stone-800">Seu Carrinho</h2>
              <button onClick={toggleCart} className="text-stone-400 hover:text-stone-800 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag size={48} className="text-stone-300" />
                  <p className="text-stone-500 text-lg">Seu carrinho está vazio.</p>
                  <button 
                    onClick={toggleCart}
                    className="text-rose-500 font-medium hover:underline"
                  >
                    Começar a comprar
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item) => (
                    <li key={`${item.id}-${item.selectedColor}`} className="flex gap-4">
                      <div className="w-20 h-20 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-stone-800">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-stone-500 mt-1">
                          {item.quantity}x R$ {item.price.toFixed(2).replace('.', ',')}
                        </p>
                        {item.selectedColor && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-stone-400">Cor:</span>
                            <div 
                              className="w-3 h-3 rounded-full border border-stone-200" 
                              style={{ backgroundColor: item.selectedColor }} 
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-stone-50 border-t border-stone-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-serif text-xl font-bold text-stone-800">
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-xs text-stone-400 text-center mb-4">Frete calculado no checkout</p>
                <button className="w-full bg-stone-900 text-white py-4 rounded-md uppercase tracking-wider font-medium hover:bg-rose-500 transition-colors">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;