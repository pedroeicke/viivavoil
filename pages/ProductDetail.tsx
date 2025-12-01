import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Minus, Plus, Truck, Star } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = PRODUCTS.find(p => p.slug === slug);
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);

  if (!product) return <div className="pt-32 text-center">Produto não encontrado</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                  selectedImage === idx ? 'border-rose-500' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center">
          <span className="text-rose-500 text-sm font-bold uppercase tracking-wider mb-2">{product.category}</span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-gold-400">
               <Star size={16} fill="currentColor" />
               <Star size={16} fill="currentColor" />
               <Star size={16} fill="currentColor" />
               <Star size={16} fill="currentColor" />
               <Star size={16} fill="currentColor" />
            </div>
            <span className="text-stone-400 text-sm">(24 avaliações)</span>
          </div>

          <div className="text-2xl font-medium text-stone-900 mb-8">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </div>

          <p className="text-stone-600 leading-relaxed mb-8">
            {product.description} Feito à mão com materiais nobres para garantir conforto e estilo. O toque final perfeito para o look da sua pequena.
          </p>

          {/* Color Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wide mb-3">Escolha a cor</h4>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border border-stone-200 shadow-sm transition-transform ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-stone-800 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="flex items-center gap-4 mb-8 border-b border-stone-100 pb-8">
            <div className="flex items-center border border-stone-200 rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-stone-50 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-stone-50 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-stone-900 text-white py-3.5 px-6 rounded uppercase tracking-widest font-bold text-sm hover:bg-rose-500 transition-colors shadow-lg"
            >
              Adicionar à Sacola
            </button>
          </div>

          <div className="flex items-center gap-3 text-sm text-stone-500">
            <Truck size={18} />
            <span>Frete grátis para compras acima de R$ 200,00</span>
          </div>
        </div>
      </div>

      {/* Tabs / Additional Info */}
      <div className="border-t border-stone-200 pt-16">
        <h3 className="font-serif text-2xl text-stone-800 mb-6">Detalhes do Produto</h3>
        <div className="prose prose-stone max-w-3xl">
          <p>
            Nossos laços são confeccionados artesanalmente. Podem ocorrer pequenas variações nas medidas e tonalidades, o que torna cada peça única.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Material:</strong> Fita de gorgurão premium / Veludo / Linho</li>
            <li><strong>Acabamento:</strong> Bico de pato semi-encapado com borrachinha antideslizante (não puxa o cabelo)</li>
            <li><strong>Tamanho aproximado:</strong> 10cm x 8cm</li>
          </ul>
          <h4 className="font-serif text-lg mt-8 mb-4">Cuidados</h4>
          <p>
            Para manter seu laço sempre lindo, guarde-o em local seco e arejado, de preferência em um porta-laços. Não lavar na máquina. Se necessário, limpe delicadamente com pano úmido.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;