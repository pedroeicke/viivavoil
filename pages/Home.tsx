import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, PRODUCTS, TESTIMONIALS } from '../data/mockData';

const Home = () => {
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

  return (
    <main>
      <Hero />

      {/* Slogan Banner */}
      <div className="bg-white py-10 border-b border-stone-100">
        <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl md:text-3xl text-stone-800 italic">
              "Dos laços mais delicados aos acessórios mais charmosos. <br className="hidden md:block"/> Colecione elogios com a nossa coleção."
            </h3>
        </div>
      </div>

      {/* Best Sellers */}
      <section className="py-20 container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-rose-500 uppercase tracking-widest text-xs font-bold">Destaques</span>
          <h2 className="font-serif text-4xl text-stone-800 mt-2 mb-4">Os mais amados</h2>
          <div className="w-20 h-0.5 bg-rose-500 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/loja" className="inline-flex items-center gap-2 text-stone-500 hover:text-rose-500 border-b border-stone-300 hover:border-rose-500 pb-1 transition-all">
            Ver toda a loja <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-800">Nossas Coleções</h2>
              <p className="text-stone-500 mt-2">Encontre o acessório perfeito para cada estilo.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {CATEGORIES.map((cat, index) => (
              <Link key={cat.id} to={`/loja?category=${cat.slug}`} className="group block relative overflow-hidden rounded-lg aspect-[3/4]">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-serif text-xl">{cat.name}</h3>
                  <span className="text-white/80 text-sm mt-1 group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1">
                    Explorar <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-24 bg-white my-12">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <span className="bg-stone-100 text-rose-500 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
              Volta às Aulas
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-800 leading-tight">
              Novidades <br/> <span className="text-rose-500 italic">2025</span>
            </h2>
            <p className="text-stone-600 text-lg max-w-md">
              Estamos de volta com força total! Confira os novos laços, tiaras e acessórios exclusivos.
            </p>
            <Link 
              to="/loja?promo=true" 
              className="inline-block bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-rose-500 transition-colors shadow-lg"
            >
              Ver Promolaços
            </Link>
          </div>
          <div className="flex-1 relative">
             <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
               <img src="https://picsum.photos/id/402/800/600" alt="Promoção" className="w-full h-full object-cover" />
             </div>
             {/* Decorative circle */}
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-200 rounded-full -z-10 opacity-50 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl text-center text-stone-800 mb-16">O que dizem as mamães</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <motion.div 
                key={t.id}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-stone-100"
              >
                <div className="flex gap-1 text-gold-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-stone-600 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-serif font-bold text-stone-800">{t.name}</h4>
                    <span className="text-xs text-stone-400 uppercase tracking-wide">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-stone-900 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Faça parte do nosso clube</h2>
          <p className="text-stone-300 mb-8 font-light">
            Receba novidades, coleções exclusivas e promoções encantadoras diretamente no seu e-mail.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-1 bg-white/10 border border-white/20 rounded px-6 py-4 text-white placeholder-stone-400 focus:outline-none focus:border-rose-400"
            />
            <button 
              type="submit"
              className="bg-rose-500 text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-rose-600 transition-colors rounded"
            >
              Inscrever
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;