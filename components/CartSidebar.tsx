import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowLeft, CreditCard, MapPin, Mail, QrCode, CheckCircle, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Etapas do Checkout Lateral
type CheckoutStep = 'cart' | 'identity' | 'shipping' | 'payment' | 'success';

const CartSidebar = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, clearCart, cartTotal } = useCart();
  
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [loading, setLoading] = useState(false);

  // Form States
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({ street: '', number: '', city: '', zip: '' });
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('pix');

  const handleClose = () => {
    toggleCart();
    // Reseta para o carrinho após fechar, se não estiver processando
    setTimeout(() => {
        if (step === 'success') setStep('cart');
    }, 500);
  };

  const handleBack = () => {
    if (step === 'identity') setStep('cart');
    if (step === 'shipping') setStep('identity');
    if (step === 'payment') setStep('shipping');
  };

  const handleFinalizePurchase = () => {
    setLoading(true);
    // Simula processamento
    setTimeout(() => {
      setLoading(false);
      clearCart();
      setStep('success');
    }, 2000);
  };

  // Renderização condicional do título
  const getTitle = () => {
    switch(step) {
      case 'cart': return 'Seu Carrinho';
      case 'identity': return 'Identificação';
      case 'shipping': return 'Entrega';
      case 'payment': return 'Pagamento';
      case 'success': return 'Pedido Confirmado';
      default: return '';
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-white relative z-10">
              <div className="flex items-center gap-3">
                {step !== 'cart' && step !== 'success' && (
                  <button onClick={handleBack} className="text-stone-400 hover:text-stone-800 transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h2 className="font-serif text-xl md:text-2xl text-stone-800">{getTitle()}</h2>
              </div>
              <button onClick={handleClose} className="text-stone-400 hover:text-stone-800 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-stone-50/50 relative">
              
              {/* --- STEP 1: CART LIST --- */}
              {step === 'cart' && (
                <div className="p-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-20">
                      <div className="bg-stone-100 p-6 rounded-full">
                        <ShoppingBag size={40} className="text-stone-300" />
                      </div>
                      <p className="text-stone-500 text-lg font-serif">Sua sacola está vazia.</p>
                      <button 
                        onClick={handleClose}
                        className="text-rose-500 font-bold uppercase text-xs tracking-widest hover:underline"
                      >
                        Começar a comprar
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {cart.map((item) => (
                        <motion.li 
                          layout
                          key={`${item.id}-${item.selectedColor}`} 
                          className="flex gap-4 bg-white p-3 rounded-lg border border-stone-100 shadow-sm"
                        >
                          <div className="w-16 h-16 bg-stone-100 rounded overflow-hidden flex-shrink-0">
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-sm font-bold text-stone-800 leading-tight pr-4">{item.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-stone-300 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="flex justify-between items-end mt-2">
                              <div className="flex flex-col">
                                {item.selectedColor && (
                                  <div className="flex items-center gap-1 mb-1">
                                    <div 
                                      className="w-2 h-2 rounded-full border border-stone-200" 
                                      style={{ backgroundColor: item.selectedColor }} 
                                    />
                                    <span className="text-[10px] text-stone-400 uppercase">Cor Selecionada</span>
                                  </div>
                                )}
                                <span className="text-xs text-stone-500">Qtd: {item.quantity}</span>
                              </div>
                              <span className="font-bold text-stone-800 text-sm">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* --- STEP 2: IDENTIFICATION --- */}
              {step === 'identity' && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 space-y-6"
                >
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                    <label className="flex items-center gap-2 text-sm font-bold text-stone-600 uppercase mb-4">
                      <Mail size={16} /> Dados de Contato
                    </label>
                    <input 
                      type="email" 
                      placeholder="Seu melhor e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3 focus:outline-none focus:border-rose-400 transition-colors mb-2"
                      autoFocus
                    />
                    <p className="text-xs text-stone-400">Enviaremos a confirmação do pedido para este e-mail.</p>
                  </div>
                </motion.div>
              )}

              {/* --- STEP 3: SHIPPING --- */}
              {step === 'shipping' && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 space-y-6"
                >
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 space-y-4">
                    <label className="flex items-center gap-2 text-sm font-bold text-stone-600 uppercase mb-2">
                      <MapPin size={16} /> Endereço de Entrega
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <input 
                        type="text" 
                        placeholder="CEP"
                        value={address.zip}
                        onChange={(e) => setAddress({...address, zip: e.target.value})}
                        className="col-span-1 bg-stone-50 border border-stone-200 rounded px-3 py-3 focus:outline-none focus:border-rose-400"
                      />
                      <input 
                        type="text" 
                        placeholder="Cidade"
                        value={address.city}
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                        className="col-span-2 bg-stone-50 border border-stone-200 rounded px-3 py-3 focus:outline-none focus:border-rose-400"
                      />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Rua / Avenida"
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-3 focus:outline-none focus:border-rose-400"
                    />
                    <div className="grid grid-cols-3 gap-3">
                       <input 
                        type="text" 
                        placeholder="Número"
                        value={address.number}
                        onChange={(e) => setAddress({...address, number: e.target.value})}
                        className="col-span-1 bg-stone-50 border border-stone-200 rounded px-3 py-3 focus:outline-none focus:border-rose-400"
                      />
                      <input 
                        type="text" 
                        placeholder="Complemento"
                        className="col-span-2 bg-stone-50 border border-stone-200 rounded px-3 py-3 focus:outline-none focus:border-rose-400"
                      />
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-stone-100">
                    <h4 className="text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
                      <Truck size={16} /> Opções de Frete
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-3 border border-rose-200 bg-rose-50 rounded cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="radio" name="frete" defaultChecked className="accent-rose-500" />
                          <span className="text-sm font-medium">Sedex Rápido</span>
                        </div>
                        <span className="text-sm font-bold text-rose-600">Grátis</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- STEP 4: PAYMENT --- */}
              {step === 'payment' && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 space-y-6"
                >
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                    <label className="flex items-center gap-2 text-sm font-bold text-stone-600 uppercase mb-4">
                      <ShieldCheck size={16} /> Método de Pagamento
                    </label>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={() => setPaymentMethod('pix')}
                        className={`w-full flex items-center justify-between p-4 rounded border transition-all ${
                          paymentMethod === 'pix' 
                          ? 'border-rose-500 bg-rose-50 text-rose-700' 
                          : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <QrCode size={20} />
                          <span className="font-bold">Pix (5% OFF)</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'pix' ? 'border-rose-500' : 'border-stone-300'
                        }`}>
                          {paymentMethod === 'pix' && <div className="w-2 h-2 rounded-full bg-rose-500" />}
                        </div>
                      </button>

                      <button 
                        onClick={() => setPaymentMethod('credit')}
                        className={`w-full flex items-center justify-between p-4 rounded border transition-all ${
                          paymentMethod === 'credit' 
                          ? 'border-rose-500 bg-rose-50 text-rose-700' 
                          : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard size={20} />
                          <span className="font-bold">Cartão de Crédito</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'credit' ? 'border-rose-500' : 'border-stone-300'
                        }`}>
                          {paymentMethod === 'credit' && <div className="w-2 h-2 rounded-full bg-rose-500" />}
                        </div>
                      </button>
                    </div>

                    {/* Credit Card Form Mock */}
                    {paymentMethod === 'credit' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-4 pt-4 border-t border-stone-100 space-y-3 overflow-hidden"
                      >
                        <input type="text" placeholder="Número do Cartão" className="w-full bg-stone-50 border border-stone-200 rounded p-3 text-sm" />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="Validade (MM/AA)" className="bg-stone-50 border border-stone-200 rounded p-3 text-sm" />
                          <input type="text" placeholder="CVV" className="bg-stone-50 border border-stone-200 rounded p-3 text-sm" />
                        </div>
                        <input type="text" placeholder="Nome no Cartão" className="w-full bg-stone-50 border border-stone-200 rounded p-3 text-sm" />
                      </motion.div>
                    )}
                  </div>

                  <div className="bg-rose-50 p-4 rounded border border-rose-100 text-center">
                    <p className="text-sm text-rose-800">
                      Total a pagar: <strong className="text-lg">R$ {cartTotal.toFixed(2).replace('.', ',')}</strong>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* --- STEP 5: SUCCESS --- */}
              {step === 'success' && (
                <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6"
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  <h3 className="font-serif text-3xl text-stone-800 mb-2">Pedido Realizado!</h3>
                  <p className="text-stone-500 mb-8 max-w-xs">
                    Obrigado por comprar na Viiva Voil. Enviamos os detalhes para o seu e-mail.
                  </p>
                  <div className="bg-stone-100 p-4 rounded-lg w-full mb-8">
                    <p className="text-xs text-stone-400 uppercase font-bold mb-1">Número do Pedido</p>
                    <p className="font-mono text-xl text-stone-800 tracking-wider">#7829-AB</p>
                  </div>
                  <button 
                    onClick={handleClose}
                    className="bg-stone-900 text-white px-8 py-4 rounded uppercase tracking-widest text-xs font-bold hover:bg-rose-500 transition-colors w-full"
                  >
                    Voltar para Loja
                  </button>
                </div>
              )}

            </div>

            {/* Footer / Actions */}
            {step !== 'success' && cart.length > 0 && (
              <div className="p-6 bg-white border-t border-stone-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-20">
                {step === 'cart' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-stone-500">Subtotal</span>
                      <span className="font-serif text-2xl font-bold text-stone-800">
                        R$ {cartTotal.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <button 
                      onClick={() => setStep('identity')}
                      className="w-full bg-stone-900 text-white py-4 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-rose-500 transition-colors shadow-lg"
                    >
                      Finalizar Compra
                    </button>
                  </>
                )}

                {step === 'identity' && (
                   <button 
                    onClick={() => { if(email) setStep('shipping'); }}
                    disabled={!email}
                    className="w-full bg-stone-900 text-white py-4 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuar para Entrega
                  </button>
                )}

                {step === 'shipping' && (
                   <button 
                    onClick={() => { if(address.city) setStep('payment'); }}
                    disabled={!address.city}
                    className="w-full bg-stone-900 text-white py-4 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Ir para Pagamento
                  </button>
                )}

                {step === 'payment' && (
                   <button 
                    onClick={handleFinalizePurchase}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-4 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-green-500 transition-colors flex items-center justify-center gap-2 shadow-green-200 shadow-lg"
                  >
                    {loading ? 'Processando...' : `Pagar R$ ${cartTotal.toFixed(2).replace('.', ',')}`}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;