import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-stone-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-stone-300">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-white">Viiva Voil</h3>
            <p className="text-stone-400 leading-relaxed text-sm">
              Dos laços mais delicados aos acessórios mais charmosos. Colecione elogios com a nossa coleção.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Navegação</h4>
            <ul className="space-y-3 text-stone-400 text-sm">
              <li><Link to="/" className="hover:text-rose-500 transition-colors">Início</Link></li>
              <li><Link to="/loja" className="hover:text-rose-500 transition-colors">Nossa Loja</Link></li>
              <li><Link to="/sobre" className="hover:text-rose-500 transition-colors">Nossa História</Link></li>
              <li><Link to="/contato" className="hover:text-rose-500 transition-colors">Fale Conosco</Link></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Política de Troca</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Contato</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-rose-500" />
                <span>R. 4ª Avenida, nº 280 - sala 17<br/>Box 14, Edifício Golden Business BC<br/>Centro Balneário Camboriú - SC<br/>CEP 88330-104</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-rose-500" />
                <span>(47) 99203 - 3995</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-rose-500" />
                <span>contato@viiva.com.br</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
             <h4 className="font-serif text-lg mb-6 text-white">Siga-nos</h4>
             <div className="flex gap-4 mb-6">
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-rose-500 transition-all">
                 <Instagram size={20} />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-rose-500 transition-all">
                 <Facebook size={20} />
               </a>
             </div>
             <p className="text-xs text-stone-500">© {new Date().getFullYear()} Viiva Voil. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;