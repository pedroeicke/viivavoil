import { Product, Testimonial, Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Laços', slug: 'lacos', image: 'https://picsum.photos/id/103/400/400' },
  { id: '2', name: 'Tiaras', slug: 'tiaras', image: 'https://picsum.photos/id/65/400/400' },
  { id: '3', name: 'Faixas Baby', slug: 'faixas', image: 'https://picsum.photos/id/106/400/400' },
  { id: '4', name: 'Kits', slug: 'kits', image: 'https://picsum.photos/id/112/400/400' },
  { id: '5', name: 'Acessórios', slug: 'acessorios', image: 'https://picsum.photos/id/400/400/400' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'laco-veludo-bordeaux',
    name: 'Laço Veludo Bordeaux',
    price: 45.90,
    category: 'Lacos',
    images: [
      'https://picsum.photos/id/250/800/800', // Correspondente à primeira cor
      'https://picsum.photos/id/237/800/800', // Correspondente à segunda cor
      'https://picsum.photos/id/252/800/800', // Correspondente à terceira cor
    ],
    colors: ['#800020', '#000000', '#f5f5dc'],
    description: 'Um laço clássico em veludo premium, perfeito para ocasiões especiais de inverno.',
    isFeatured: true,
    rating: 5,
  },
  {
    id: '2',
    slug: 'tiara-jardim-encantado',
    name: 'Tiara Jardim Encantado',
    price: 89.90,
    oldPrice: 110.00,
    category: 'Tiaras',
    images: [
      'https://picsum.photos/id/360/800/800',
      'https://picsum.photos/id/364/800/800',
    ],
    colors: ['#ffc0cb', '#ffffff'],
    description: 'Tiara bordada à mão com pérolas e flores de seda.',
    isFeatured: true,
    isOnSale: true,
    rating: 4.8,
  },
  {
    id: '3',
    slug: 'faixa-baby-silk',
    name: 'Faixinha Baby Silk',
    price: 29.90,
    category: 'Faixas',
    images: [
      'https://picsum.photos/id/102/800/800',
      'https://picsum.photos/id/104/800/800',
      'https://picsum.photos/id/108/800/800',
    ],
    colors: ['#f8bbd0', '#e1bee7', '#b2dfdb'],
    description: 'O conforto que sua bebê merece. Meia de seda que não aperta.',
    isNew: true,
    rating: 5,
  },
  {
    id: '4',
    slug: 'maxi-laco-linho',
    name: 'Maxi Laço em Linho',
    price: 49.00,
    oldPrice: 55.00,
    category: 'Lacos',
    images: [
      'https://picsum.photos/id/201/800/800',
      'https://picsum.photos/id/202/800/800',
    ],
    colors: ['#d7ccc8', '#a1887f'],
    description: 'Rústico e chique. O laço de linho traz sofisticação natural.',
    isFeatured: true,
    isOnSale: true,
    rating: 4.9,
  },
  {
    id: '5',
    slug: 'kit-semaninha-escolar',
    name: 'Kit Semaninha Escolar',
    price: 120.00,
    category: 'Kits',
    images: [
      'https://picsum.photos/id/349/800/800',
      'https://picsum.photos/id/348/800/800',
    ],
    colors: ['#1e88e5', '#e53935'],
    description: '7 laços pequenos nas cores do uniforme. Praticidade para o dia a dia.',
    rating: 4.7,
  },
  {
    id: '6',
    slug: 'grampos-pompom',
    name: 'Par de Grampos Pompom',
    price: 18.90,
    category: 'Acessorios',
    images: [
      'https://picsum.photos/id/400/800/800',
    ],
    colors: ['#f48fb1'],
    description: 'Divertidos e coloridos para prender a franjinha.',
    rating: 4.5,
  },
  {
    id: '7',
    slug: 'laco-organza-cristal',
    name: 'Laço Organza Cristal',
    price: 38.00,
    oldPrice: 45.00,
    category: 'Lacos',
    images: [
      'https://picsum.photos/id/305/800/800',
      'https://picsum.photos/id/306/800/800',
    ],
    colors: ['#ffffff', '#ffeb3b'],
    description: 'Leveza e transparência. Ideal para batizados e festas diurnas.',
    isOnSale: true,
    rating: 5.0
  },
  {
    id: '8',
    slug: 'tiara-turbante-veludo',
    name: 'Tiara Turbante Veludo',
    price: 59.90,
    category: 'Tiaras',
    images: [
      'https://picsum.photos/id/430/800/800',
      'https://picsum.photos/id/431/800/800',
    ],
    colors: ['#000000', '#881337'],
    description: 'Estilo e conforto para os dias mais frios.',
    rating: 4.6
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Mariana Souza',
    role: 'Mãe da Bella',
    image: 'https://picsum.photos/id/64/100/100',
    text: 'A delicadeza desses laços é impressionante. Chegou super rápido e a embalagem é um presente à parte!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Carla Dias',
    role: 'Mãe da Sofia',
    image: 'https://picsum.photos/id/65/100/100',
    text: 'Compro sempre! Durabilidade incrível e combinam com tudo.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Fernanda Lima',
    role: 'Mãe de Gêmeas',
    image: 'https://picsum.photos/id/91/100/100',
    text: 'Amei as faixinhas RN, não marcam a cabecinha. Recomendo de olhos fechados.',
    rating: 4,
  },
];