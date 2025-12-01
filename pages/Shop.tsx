import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const isPromo = searchParams.get('promo') === 'true';
  const [sortOption, setSortOption] = useState('newest');

  // Filtering Logic
  let filteredProducts = PRODUCTS;

  // Filter by Category
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
  }

  // Filter by Promo (Promolaços)
  if (isPromo) {
    filteredProducts = filteredProducts.filter(p => p.isOnSale === true);
  }

  // Sorting
  filteredProducts.sort((a, b) => {
    if (sortOption === 'price_asc') return a.price - b.price;
    if (sortOption === 'price_desc') return b.price - a.price;
    return 0; // default order (usually by ID or added date)
  });

  const getPageTitle = () => {
    if (isPromo) return 'Promolaços';
    if (categoryFilter) {
      const cat = CATEGORIES.find(c => c.slug === categoryFilter);
      return cat ? cat.name : categoryFilter;
    }
    return 'Nossa Loja';
  };

  return (
    <div className="pt-24 pb-12 container mx-auto px-4 md:px-8 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-rose-50/50 rounded-xl p-8 md:p-12 mb-12 text-center relative overflow-hidden border border-rose-100">
        <div className="relative z-10">
          <h1 className="font-serif text-4xl text-stone-800 mb-2">{getPageTitle()}</h1>
          <p className="text-stone-500">
            {isPromo 
              ? 'Aproveite nossas ofertas exclusivas com descontos imperdíveis.' 
              : 'Descubra acessórios feitos à mão com todo amor e carinho.'}
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-100/30 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-serif text-lg mb-4 flex items-center gap-2 text-stone-800">
              <Filter size={18} /> Categorias
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/loja" 
                  className={`text-sm block py-1 border-l-2 pl-3 transition-all ${
                    !categoryFilter && !isPromo ? 'border-rose-500 text-rose-500 font-bold' : 'border-transparent text-stone-600 hover:text-rose-500'
                  }`}
                >
                  Todos os produtos
                </Link>
              </li>
              <li>
                <Link 
                  to="/loja?promo=true" 
                  className={`text-sm block py-1 border-l-2 pl-3 transition-all ${
                    isPromo ? 'border-rose-500 text-rose-500 font-bold' : 'border-transparent text-stone-600 hover:text-rose-500'
                  }`}
                >
                  Promolaços (Ofertas)
                </Link>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link 
                    to={`/loja?category=${cat.slug}`} 
                    className={`text-sm block py-1 border-l-2 pl-3 transition-all ${
                      categoryFilter === cat.slug ? 'border-rose-500 text-rose-500 font-bold' : 'border-transparent text-stone-600 hover:text-rose-500'
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4 text-stone-800">Preço</h3>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="p1" className="accent-rose-500 h-4 w-4" />
              <label htmlFor="p1" className="text-sm text-stone-600">Até R$ 30,00</label>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="p2" className="accent-rose-500 h-4 w-4" />
              <label htmlFor="p2" className="text-sm text-stone-600">R$ 30 - R$ 60</label>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="p3" className="accent-rose-500 h-4 w-4" />
              <label htmlFor="p3" className="text-sm text-stone-600">Acima de R$ 60</label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-stone-100 gap-4">
            <span className="text-sm text-stone-500 font-medium">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </span>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-400">Ordenar por:</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-sm border-none focus:ring-0 cursor-pointer text-stone-800 font-bold"
              >
                <option value="newest">Novidades</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(categoryFilter || isPromo) && (
            <div className="flex gap-2 mb-6">
              {categoryFilter && (
                <Link to="/loja" className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full hover:bg-stone-200 transition-colors">
                  {CATEGORIES.find(c => c.slug === categoryFilter)?.name} <X size={12} />
                </Link>
              )}
              {isPromo && (
                <Link to="/loja" className="inline-flex items-center gap-1 text-xs bg-rose-100 text-rose-600 px-3 py-1 rounded-full hover:bg-rose-200 transition-colors">
                  Em Oferta <X size={12} />
                </Link>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed border-stone-200">
               <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                 <Filter className="text-stone-300" size={24} />
               </div>
               <p className="text-stone-600 font-serif text-lg mb-2">Nenhum produto encontrado</p>
               <p className="text-stone-400 text-sm mb-6">Tente limpar os filtros ou buscar por outra categoria.</p>
               <Link to="/loja" className="bg-stone-900 text-white px-6 py-2 rounded text-sm uppercase tracking-wide hover:bg-rose-500 transition-colors">
                 Ver todos os produtos
               </Link>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;