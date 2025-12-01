import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  // State to handle local selection on the card
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const isWishlisted = isInWishlist(product.id);

  // Map category code to slug and display name
  const getCategoryInfo = (catCode: string) => {
    const map: Record<string, { slug: string, name: string }> = {
      'Lacos': { slug: 'lacos', name: 'Laços' },
      'Tiaras': { slug: 'tiaras', name: 'Tiaras' },
      'Faixas': { slug: 'faixas', name: 'Faixinhas' },
      'Kits': { slug: 'kits', name: 'Kits' },
      'Acessorios': { slug: 'acessorios', name: 'Acessórios' },
    };
    return map[catCode] || { slug: 'lacos', name: catCode };
  };

  const catInfo = getCategoryInfo(product.category);

  const handleColorSelect = (e: React.MouseEvent, color: string, index: number) => {
    e.preventDefault(); // Prevent navigating to product page
    e.stopPropagation();
    setSelectedColor(color);
    
    // Attempt to switch image if a corresponding one exists based on index logic
    // Assuming mock data structure where images might correspond to colors sequentially
    if (product.images[index]) {
      setCurrentImageIndex(index);
    } else if (product.images.length > 1) {
       // Fallback logic if indices don't match exactly 1:1, cycle through available images
       setCurrentImageIndex(index % product.images.length);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl pb-4"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white/90 backdrop-blur text-stone-800 text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm">
              Novo
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur rounded-full transition-all transform translate-y-[-10px] group-hover:translate-y-0 shadow-sm ${
            isWishlisted 
              ? 'text-rose-500 opacity-100 translate-y-0' 
              : 'text-stone-400 opacity-0 group-hover:opacity-100 hover:text-rose-500'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Image */}
        <Link to={`/produto/${product.slug}`}>
          <img
            src={product.images[currentImageIndex] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={handleQuickAdd}
            className="w-full bg-white/95 backdrop-blur text-stone-800 py-3 text-sm font-medium uppercase tracking-wide hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg rounded-sm"
          >
            <ShoppingBag size={16} /> Adicionar
          </button>
        </div>
      </div>

      <div className="p-4 text-center">
        <Link 
          to={`/loja?category=${catInfo.slug}`}
          className="text-xs text-stone-400 uppercase tracking-widest mb-1 hover:text-rose-500 transition-colors inline-block"
        >
          {catInfo.name}
        </Link>
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-serif text-lg text-stone-800 mb-2 hover:text-rose-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-3 mb-3">
          {product.oldPrice && (
            <span className="text-sm text-stone-400 line-through">
              R$ {product.oldPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
          <span className="text-base font-medium text-stone-900">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex justify-center gap-2 h-6 items-center">
            {product.colors.map((color, index) => (
              <button
                key={`${product.id}-${color}`}
                onClick={(e) => handleColorSelect(e, color, index)}
                className={`w-4 h-4 rounded-full border border-stone-200 transition-all duration-200 shadow-sm ${
                  selectedColor === color ? 'ring-1 ring-offset-1 ring-stone-400 scale-125' : 'hover:scale-125'
                }`}
                style={{ backgroundColor: color }}
                title={`Selecionar cor`}
                aria-label={`Selecionar cor`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;