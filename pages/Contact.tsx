import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Info Side */}
        <div>
          <h1 className="font-serif text-4xl text-stone-800 mb-6">Fale Conosco</h1>
          <p className="text-stone-600 mb-10 text-lg">
            Tem alguma dúvida sobre um pedido, produto ou quer apenas dar um oi? 
            Estamos aqui para ajudar!
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-800 mb-1">Nosso Telefone</h3>
                <p className="text-stone-600">(47) 99203 - 3995</p>
                <p className="text-sm text-stone-400">Atendimento via WhatsApp</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-800 mb-1">Nosso E-mail</h3>
                <p className="text-stone-600">contato@viiva.com.br</p>
                <p className="text-sm text-stone-400">Respondemos em até 24h úteis</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-800 mb-1">Endereço</h3>
                <p className="text-stone-600">
                  R. 4ª Avenida, nº 280 - sala 17<br/>
                  Box 14, Edifício Golden Business BC<br/>
                  Centro Balneário Camboriú - SC<br/>
                  CEP 88330-104
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-green-50 border border-green-100 p-6 rounded-lg flex items-center justify-between">
            <div>
              <h4 className="font-bold text-green-800">Precisa de resposta rápida?</h4>
              <p className="text-green-600 text-sm">Chame no WhatsApp agora mesmo.</p>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-green-600 transition-colors">
              <MessageCircle size={18} /> Conversar
            </button>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-stone-100">
          <h2 className="font-serif text-2xl text-stone-800 mb-6">Envie uma mensagem</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Nome</label>
                <input 
                  type="text" 
                  className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3 focus:outline-none focus:border-rose-400"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-bold text-stone-700">Sobrenome</label>
                 <input 
                   type="text" 
                   className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3 focus:outline-none focus:border-rose-400"
                   placeholder="Seu sobrenome"
                 />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">E-mail</label>
              <input 
                type="email" 
                className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3 focus:outline-none focus:border-rose-400"
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Assunto</label>
              <select className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3 focus:outline-none focus:border-rose-400">
                <option>Dúvida sobre produto</option>
                <option>Acompanhar pedido</option>
                <option>Trocas e Devoluções</option>
                <option>Outros</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Mensagem</label>
              <textarea 
                rows={5}
                className="w-full bg-stone-50 border border-stone-200 rounded px-4 py-3 focus:outline-none focus:border-rose-400"
                placeholder="Como podemos ajudar?"
              />
            </div>

            <button className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-rose-500 transition-colors rounded">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;