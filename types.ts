export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: 'Lacos' | 'Tiaras' | 'Faixas' | 'Kits' | 'Acessorios';
  images: string[];
  colors: string[]; // hex codes or names
  isFeatured?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  rating: number;
  role?: string; // e.g., "Mãe da Alice"
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}