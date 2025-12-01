import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-stone-100">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/id/400/1600/900" 
          alt="Menina sorrindo com laço" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay */}
      </div>

      {/* Content */}
      <div className="relative container mx-auto h-full px-4 md:px-8 flex items-center">
        <div className="max-w-xl text-white">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block text-rose-200 uppercase tracking-[0.2em] mb-4 text-sm font-bold"
          >
            Nova Coleção
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl leading-tight mb-6"
          >
            Encanto <br /> <span className="italic font-light">Floral</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-stone-100 mb-8 font-light"
          >
            Laços delicados que transformam momentos simples em memórias inesquecíveis.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4"
          >
            <Link 
              to="/loja" 
              className="bg-white text-stone-900 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-rose-100 transition-colors"
            >
              Comprar Agora
            </Link>
            <Link 
              to="/loja?category=lacos" 
              className="border border-white text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white/10 transition-colors"
            >
              Ver Coleção
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;