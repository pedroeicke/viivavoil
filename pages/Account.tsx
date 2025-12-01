import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, MapPin, LogOut, ChevronRight, Mail, Lock, ArrowLeft, Calendar, CreditCard, Truck, X, Plus, Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

// Enhanced Mock Data for the Dashboard
const MOCK_ORDERS = [
  { 
    id: '#9281', 
    date: '12/05/2023', 
    status: 'Entregue', 
    total: 145.90, 
    shipping: 15.00,
    subtotal: 130.90,
    paymentMethod: 'Pix',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    trackingCode: 'BR123456789SP',
    summary: 'Laço Veludo + 2 itens',
    items: [
      { name: 'Laço Veludo Bordeaux', price: 45.90, quantity: 1, image: 'https://picsum.photos/id/250/200/200' },
      { name: 'Faixinha Baby Silk', price: 29.90, quantity: 2, image: 'https://picsum.photos/id/102/200/200' },
      { name: 'Par de Grampos Pompom', price: 18.90, quantity: 1, image: 'https://picsum.photos/id/400/200/200' }
    ]
  },
  { 
    id: '#9340', 
    date: '28/05/2023', 
    status: 'Em trânsito', 
    total: 89.90, 
    shipping: 0.00,
    subtotal: 89.90,
    paymentMethod: 'Cartão de Crédito (**** 4242)',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    trackingCode: 'BR987654321SP',
    summary: 'Tiara Jardim Encantado',
    items: [
      { name: 'Tiara Jardim Encantado', price: 89.90, quantity: 1, image: 'https://picsum.photos/id/360/200/200' }
    ]
  },
];

interface Address {
  id: number;
  title: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  isDefault: boolean;
}

const Account = () => {
  const location = useLocation();
  const { wishlist } = useWishlist();

  // State to simulate Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<'orders' | 'address' | 'details' | 'wishlist'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);

  // Address State
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      title: 'Casa',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apt 40',
      neighborhood: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      cep: '01400-000',
      isDefault: true
    }
  ]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    title: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  // Check for navigation state to switch tabs automatically
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setIsLoggedIn(true); // Assuming they are logged in for this flow or would trigger login
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsLoggedIn(true), 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsLoggedIn(true), 800);
  };

  // Reset selected order when changing tabs
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSelectedOrder(null);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.number || !newAddress.city) return;

    const addressToAdd: Address = {
      id: Date.now(),
      title: newAddress.title || 'Meu Endereço',
      street: newAddress.street!,
      number: newAddress.number!,
      complement: newAddress.complement,
      neighborhood: newAddress.neighborhood || '',
      city: newAddress.city!,
      state: newAddress.state || '',
      cep: newAddress.cep || '',
      isDefault: addresses.length === 0 // First address is default
    };

    setAddresses([...addresses, addressToAdd]);
    setShowAddressModal(false);
    setNewAddress({ title: '', cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '' });
  };

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  if (isLoggedIn) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Menu */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 text-center mb-6">
              <div className="w-20 h-20 bg-rose-100 rounded-full mx-auto flex items-center justify-center text-rose-500 mb-4">
                <User size={32} />
              </div>
              <h2 className="font-serif text-xl text-stone-800">Maria Silva</h2>
              <p className="text-sm text-stone-500">maria.silva@email.com</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => handleTabChange('orders')}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                  activeTab === 'orders' ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package size={18} /> Meus Pedidos
                </div>
                <ChevronRight size={16} />
              </button>
              
              <button
                onClick={() => handleTabChange('wishlist')}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                  activeTab === 'wishlist' ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart size={18} /> Lista de Desejos
                </div>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => handleTabChange('address')}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                  activeTab === 'address' ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin size={18} /> Endereços
                </div>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => handleTabChange('details')}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                  activeTab === 'details' ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User size={18} /> Dados Pessoais
                </div>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setSelectedOrder(null);
                  setActiveTab('orders');
                }}
                className="w-full flex items-center justify-between p-4 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors mt-8"
              >
                <div className="flex items-center gap-3">
                  <LogOut size={18} /> Sair
                </div>
              </button>
            </nav>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
             <h2 className="font-serif text-3xl text-stone-800 mb-8 flex items-center gap-3">
               {selectedOrder ? (
                 <>
                  <button onClick={() => setSelectedOrder(null)} className="hover:text-rose-500 transition-colors">
                    <ArrowLeft size={28} />
                  </button>
                  Detalhes do Pedido
                 </>
               ) : (
                 <>
                  {activeTab === 'orders' && 'Histórico de Pedidos'}
                  {activeTab === 'wishlist' && 'Lista de Desejos'}
                  {activeTab === 'address' && 'Meus Endereços'}
                  {activeTab === 'details' && 'Dados da Conta'}
                 </>
               )}
             </h2>

             {activeTab === 'orders' && (
               <div className="space-y-4">
                 {!selectedOrder ? (
                   /* Orders List View */
                   MOCK_ORDERS.map(order => (
                     <div key={order.id} className="bg-white p-6 rounded-lg border border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4 transition-all hover:shadow-md">
                       <div className="flex-1">
                         <div className="flex items-center gap-3 mb-2">
                           <span className="font-bold text-lg text-stone-800">{order.id}</span>
                           <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                             order.status === 'Entregue' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                           }`}>
                             {order.status}
                           </span>
                         </div>
                         <p className="text-stone-500 text-sm">{order.date} • {order.summary}</p>
                       </div>
                       <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                         <span className="font-medium text-stone-800">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                         <button 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-white border border-rose-200 text-rose-500 px-4 py-2 rounded font-bold text-sm hover:bg-rose-500 hover:text-white transition-all"
                         >
                           Detalhes
                         </button>
                       </div>
                     </div>
                   ))
                 ) : (
                   /* Single Order Detail View */
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                   >
                     {/* Header Info */}
                     <div className="bg-white p-6 rounded-lg border border-stone-100 flex flex-wrap gap-6 justify-between items-center">
                       <div className="flex items-center gap-4">
                         <div className="p-3 bg-stone-50 rounded-full text-stone-500">
                           <Package size={24} />
                         </div>
                         <div>
                           <p className="text-xs text-stone-400 uppercase font-bold">Pedido</p>
                           <p className="font-serif text-xl text-stone-800">{selectedOrder.id}</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-4">
                         <div className="p-3 bg-stone-50 rounded-full text-stone-500">
                           <Calendar size={24} />
                         </div>
                         <div>
                           <p className="text-xs text-stone-400 uppercase font-bold">Data</p>
                           <p className="text-stone-800">{selectedOrder.date}</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-full ${selectedOrder.status === 'Entregue' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                           <Truck size={24} />
                         </div>
                         <div>
                           <p className="text-xs text-stone-400 uppercase font-bold">Status</p>
                           <p className={`font-bold ${selectedOrder.status === 'Entregue' ? 'text-green-600' : 'text-blue-600'}`}>{selectedOrder.status}</p>
                         </div>
                       </div>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                       {/* Items List */}
                       <div className="lg:col-span-2 bg-white rounded-lg border border-stone-100 overflow-hidden">
                         <div className="p-4 bg-stone-50 border-b border-stone-100">
                           <h3 className="font-serif font-bold text-stone-700">Itens do Pedido</h3>
                         </div>
                         <div className="p-6 space-y-6">
                           {selectedOrder.items.map((item, idx) => (
                             <div key={idx} className="flex gap-4 items-center">
                               <div className="w-16 h-16 bg-stone-100 rounded overflow-hidden flex-shrink-0">
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                               </div>
                               <div className="flex-1">
                                 <p className="font-bold text-stone-800">{item.name}</p>
                                 <p className="text-sm text-stone-500">Qtd: {item.quantity}</p>
                               </div>
                               <div className="text-right">
                                 <p className="font-medium text-stone-800">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                                 <p className="text-xs text-stone-400">R$ {item.price.toFixed(2).replace('.', ',')} un.</p>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>

                       {/* Summary & Payment */}
                       <div className="space-y-6">
                         <div className="bg-white rounded-lg border border-stone-100 p-6">
                           <h3 className="font-serif font-bold text-stone-700 mb-4">Resumo</h3>
                           <div className="space-y-3 text-sm text-stone-600 border-b border-stone-100 pb-4 mb-4">
                             <div className="flex justify-between">
                               <span>Subtotal</span>
                               <span>R$ {selectedOrder.subtotal.toFixed(2).replace('.', ',')}</span>
                             </div>
                             <div className="flex justify-between">
                               <span>Frete</span>
                               <span>R$ {selectedOrder.shipping.toFixed(2).replace('.', ',')}</span>
                             </div>
                           </div>
                           <div className="flex justify-between font-bold text-lg text-stone-900">
                             <span>Total</span>
                             <span>R$ {selectedOrder.total.toFixed(2).replace('.', ',')}</span>
                           </div>
                         </div>

                         <div className="bg-white rounded-lg border border-stone-100 p-6">
                           <h3 className="font-serif font-bold text-stone-700 mb-4">Entrega</h3>
                           <div className="flex items-start gap-3 text-sm text-stone-600 mb-4">
                              <MapPin size={18} className="text-stone-400 mt-0.5 flex-shrink-0" />
                              <p>{selectedOrder.address}</p>
                           </div>
                           <p className="text-xs text-stone-400 uppercase font-bold mb-1">Rastreio</p>
                           <p className="font-mono text-stone-600 bg-stone-50 p-2 rounded">{selectedOrder.trackingCode}</p>
                         </div>
                         
                         <div className="bg-white rounded-lg border border-stone-100 p-6">
                           <h3 className="font-serif font-bold text-stone-700 mb-4">Pagamento</h3>
                           <div className="flex items-center gap-3 text-sm text-stone-600">
                              <CreditCard size={18} className="text-stone-400" />
                              <p>{selectedOrder.paymentMethod}</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 )}
               </div>
             )}

             {activeTab === 'wishlist' && (
               <div className="bg-white rounded-lg min-h-[400px]">
                 {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="bg-stone-50 p-6 rounded-full text-rose-300 mb-4">
                        <Heart size={48} />
                      </div>
                      <h3 className="font-serif text-2xl text-stone-800 mb-2">Sua lista está vazia</h3>
                      <p className="text-stone-500 mb-8 max-w-sm">
                        Salve seus itens favoritos para não perdê-los de vista e comprar quando quiser.
                      </p>
                      <button 
                        onClick={() => window.location.href = '#/loja'} // Using hash router compatible link for quick action
                        className="bg-stone-900 text-white px-8 py-3 rounded uppercase tracking-widest text-xs font-bold hover:bg-rose-500 transition-colors"
                      >
                        Explorar Loja
                      </button>
                    </div>
                 ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                 )}
               </div>
             )}

             {activeTab === 'address' && (
               <>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <AnimatePresence>
                    {addresses.map((addr) => (
                      <motion.div 
                        key={addr.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`bg-white p-6 rounded-lg border relative ${addr.isDefault ? 'border-rose-200 shadow-sm' : 'border-stone-200'}`}
                      >
                          {addr.isDefault && (
                            <span className="absolute top-4 right-4 text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">Principal</span>
                          )}
                          <h3 className="font-bold text-stone-800 mb-2">{addr.title}</h3>
                          <p className="text-stone-600 text-sm leading-relaxed">
                            {addr.street}, {addr.number} {addr.complement && `- ${addr.complement}`}<br/>
                            {addr.neighborhood}<br/>
                            {addr.city} - {addr.state}<br/>
                            CEP: {addr.cep}
                          </p>
                          <div className="mt-4 flex gap-4">
                            <button className="text-stone-400 text-sm hover:text-stone-800 transition-colors">Editar</button>
                            <button 
                              onClick={() => removeAddress(addr.id)} 
                              className="text-stone-400 text-sm hover:text-red-500 transition-colors"
                            >
                              Remover
                            </button>
                          </div>
                      </motion.div>
                    ))}
                   </AnimatePresence>
                   
                   <button 
                    onClick={() => setShowAddressModal(true)}
                    className="border-2 border-dashed border-stone-200 rounded-lg flex flex-col items-center justify-center p-6 text-stone-400 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50/10 transition-all h-full min-h-[180px]"
                   >
                     <Plus size={24} className="mb-2" />
                     <span className="font-bold">Adicionar novo endereço</span>
                   </button>
                 </div>

                 {/* Address Modal */}
                 <AnimatePresence>
                   {showAddressModal && (
                     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                       <motion.div 
                         initial={{ opacity: 0 }} 
                         animate={{ opacity: 1 }} 
                         exit={{ opacity: 0 }}
                         className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
                         onClick={() => setShowAddressModal(false)}
                       />
                       
                       <motion.div 
                         initial={{ opacity: 0, y: 50, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 50, scale: 0.95 }}
                         className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
                       >
                         <div className="flex justify-between items-center p-6 border-b border-stone-100">
                           <h3 className="font-serif text-xl text-stone-800">Novo Endereço</h3>
                           <button onClick={() => setShowAddressModal(false)} className="text-stone-400 hover:text-stone-800">
                             <X size={24} />
                           </button>
                         </div>
                         
                         <form onSubmit={handleSaveAddress} className="p-6 space-y-4">
                            <div>
                               <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Nome do Local (Ex: Casa, Trabalho)</label>
                               <input 
                                 type="text" 
                                 value={newAddress.title}
                                 onChange={e => setNewAddress({...newAddress, title: e.target.value})}
                                 className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-2 focus:outline-none focus:border-rose-400 transition-colors"
                                 placeholder="Casa"
                               />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-stone-500 uppercase block mb-1">CEP</label>
                                <input 
                                  type="text" 
                                  value={newAddress.cep}
                                  onChange={e => setNewAddress({...newAddress, cep: e.target.value})}
                                  className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-2 focus:outline-none focus:border-rose-400 transition-colors"
                                  placeholder="00000-000"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Estado</label>
                                <select 
                                  value={newAddress.state}
                                  onChange={e => setNewAddress({...newAddress, state: e.target.value})}
                                  className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-2 focus:outline-none focus:border-rose-400 transition-colors"
                                >
                                  <option value="">Selecione</option>
                                  <option value="SP">São Paulo</option>
                                  <option value="RJ">Rio de Janeiro</option>
                                  <option value="MG">Minas Gerais</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div className="col-span-2">
                                <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Rua / Av.</label>
                                <input 
                                  type="text" 
                                  value={newAddress.street}
                                  onChange={e => setNewAddress({...newAddress, street: e.target.value})}
                                  className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-2 focus:outline-none focus:border-rose-400 transition-colors"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Número</label>
                                <input 
                                  type="text" 
                                  value={newAddress.number}
                                  onChange={e => setNewAddress({...newAddress, number: e.target.value})}
                                  className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-2 focus:outline-none focus:border-rose-400 transition-colors"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <div>
                                 <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Bairro</label>
                                 <input 
                                   type="text" 
                                   value={newAddress.neighborhood}
                                   onChange={e => setNewAddress({...newAddress, neighborhood: e.target.value})}
                                   className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-2 focus:outline-none focus:border-rose-400 transition-colors"
                                 />
                               </div>
                               <div>
                                 <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Complemento</label>
                                 <input 
                                   type="text" 
                                   value={newAddress.complement}
                                   onChange={e => setNewAddress({...newAddress, complement: e.target.value})}
                                   className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-2 focus:outline-none focus:border-rose-400 transition-colors"
                                 />
                               </div>
                            </div>

                            <div>
                               <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Cidade</label>
                               <input 
                                 type="text" 
                                 value={newAddress.city}
                                 onChange={e => setNewAddress({...newAddress, city: e.target.value})}
                                 className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-2 focus:outline-none focus:border-rose-400 transition-colors"
                               />
                            </div>

                            <div className="pt-4 flex gap-3">
                              <button 
                                type="button" 
                                onClick={() => setShowAddressModal(false)}
                                className="flex-1 py-3 text-stone-500 font-bold uppercase text-xs hover:bg-stone-50 rounded transition-colors"
                              >
                                Cancelar
                              </button>
                              <button 
                                type="submit"
                                className="flex-1 bg-stone-900 text-white py-3 rounded font-bold uppercase text-xs tracking-wider hover:bg-rose-500 transition-colors"
                              >
                                Salvar Endereço
                              </button>
                            </div>
                         </form>
                       </motion.div>
                     </div>
                   )}
                 </AnimatePresence>
               </>
             )}

             {activeTab === 'details' && (
               <div className="bg-white p-8 rounded-lg border border-stone-100 max-w-xl">
                 <form className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-sm font-bold text-stone-700 mb-1 block">Nome</label>
                       <input type="text" defaultValue="Maria" className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3" />
                     </div>
                     <div>
                       <label className="text-sm font-bold text-stone-700 mb-1 block">Sobrenome</label>
                       <input type="text" defaultValue="Silva" className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3" />
                     </div>
                   </div>
                   <div>
                     <label className="text-sm font-bold text-stone-700 mb-1 block">E-mail</label>
                     <input type="email" defaultValue="maria.silva@email.com" className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3" />
                   </div>
                   <div>
                     <label className="text-sm font-bold text-stone-700 mb-1 block">CPF</label>
                     <input type="text" defaultValue="***.***.***-00" className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3 text-stone-400" disabled />
                   </div>
                   <button className="bg-stone-900 text-white px-8 py-3 rounded uppercase tracking-widest text-xs font-bold hover:bg-rose-500 transition-colors">
                     Salvar Alterações
                   </button>
                 </form>
               </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  // Not Logged In View
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-[80vh] flex flex-col items-center justify-center">
      
      {/* Toggle */}
      <div className="bg-stone-100 p-1 rounded-full flex mb-12 relative w-full max-w-xs">
        <div 
          className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${
            authMode === 'login' ? 'left-1' : 'left-[calc(50%-4px)] translate-x-[4px]'
          }`} 
        />
        <button 
          onClick={() => setAuthMode('login')}
          className={`relative z-10 flex-1 py-2 text-sm font-bold uppercase tracking-wide text-center transition-colors ${
            authMode === 'login' ? 'text-stone-800' : 'text-stone-400'
          }`}
        >
          Entrar
        </button>
        <button 
          onClick={() => setAuthMode('register')}
          className={`relative z-10 flex-1 py-2 text-sm font-bold uppercase tracking-wide text-center transition-colors ${
            authMode === 'register' ? 'text-stone-800' : 'text-stone-400'
          }`}
        >
          Cadastrar
        </button>
      </div>

      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-xl shadow-xl border border-stone-50">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-stone-800 mb-2">
            {authMode === 'login' ? 'Bem-vinda de volta' : 'Crie sua conta'}
          </h1>
          <p className="text-stone-500">
            {authMode === 'login' 
              ? 'Acesse seus pedidos e lista de desejos.' 
              : 'Junte-se ao nosso clube e ganhe 10% na primeira compra.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {authMode === 'login' ? (
            <motion.form 
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-stone-50 border border-stone-200 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-rose-400 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-stone-500 uppercase">Senha</label>
                  <a href="#" className="text-xs text-rose-500 hover:underline">Esqueceu?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="password" 
                    required 
                    className="w-full bg-stone-50 border border-stone-200 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-rose-400 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-rose-500 text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
              >
                Entrar
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleRegister}
              className="space-y-5"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-stone-50 border border-stone-200 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-rose-400 transition-colors"
                    placeholder="Maria Silva"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-stone-50 border border-stone-200 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-rose-400 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="password" 
                    required 
                    className="w-full bg-stone-50 border border-stone-200 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-rose-400 transition-colors"
                    placeholder="Crie uma senha forte"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-stone-900 text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-lg"
              >
                Criar Conta
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Account;