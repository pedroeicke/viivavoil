import React from 'react';

const About = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-white py-20 mb-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6">Nossa História</h1>
          <p className="max-w-2xl mx-auto text-stone-500 text-lg font-serif italic">
            "Dos laços mais delicados aos acessórios mais charmosos. Colecione elogios com a nossa coleção."
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <img 
              src="https://picsum.photos/id/64/800/1000" 
              alt="Mães e filhas" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="space-y-6 text-justify">
            <h2 className="font-serif text-3xl text-stone-800">Sobre a Viiva Voil</h2>
            
            <p className="text-stone-600 leading-relaxed">
              Bem-vindo ao mundo encantador da <strong>Viiva Voil</strong>!
            </p>
            <p className="text-stone-600 leading-relaxed">
              Em 2015, nasceu a Viiva Voil da necessidade compartilhada de duas mães que enfrentavam dificuldades em encontrar acessórios de cabelo tanto para suas filhas quanto para si mesmas. Movidas pela paixão e determinação aos detalhes femininos, essas mães transformaram suas experiências pessoais em uma jornada emocionante e inspiradora.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Ao longo dos anos, a Viiva Voil se estabeleceu como uma referência no mercado brasileiro tanto com seus laços como com suas polainas tule (pioneira no mercado) e vários outros acessórios femininos, conquistando o coração de clientes de todas as idades. Nossa missão é oferecer não apenas acessórios femininos, mas verdadeiras obras de arte, que são confortáveis, exclusivas, divertidas e, acima de tudo, de alta qualidade.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Em 2024, decidimos realizar uma reestruturação em nossas operações para garantir que pudéssemos continuar a oferecer o melhor para nossos clientes. E em 2025, estamos de volta com força total, prontos para fortalecer ainda mais nossa marca no mercado, trazendo uma ampla gama de novidades para mulheres e meninas de todas as idades.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Na Viiva, acreditamos que cada acessório é uma oportunidade de expressar sua individualidade e seu estilo único. Explore nossas coleções e descubra o que torna a Viiva Voil tão especial. Junte-se a nós nesta jornada de beleza, criatividade e elegância, onde cada acessório é uma celebração da moda.
            </p>

            <div className="pt-6 border-l-4 border-rose-500 pl-6 mt-8">
              <p className="text-xl font-serif text-stone-700 italic">
                "Colecione muitos elogios!"
              </p>
              <p className="text-stone-500 mt-2 font-medium">
                Com carinho, Família Viiva Voil.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 border border-stone-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500 text-2xl">♥</div>
            <h3 className="font-serif text-xl mb-4">Pioneirismo</h3>
            <p className="text-stone-500">Pioneira no mercado com as famosas polainas de tule e acessórios diferenciados.</p>
          </div>
          <div className="p-8 border border-stone-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500 text-2xl">✦</div>
            <h3 className="font-serif text-xl mb-4">Qualidade</h3>
            <p className="text-stone-500">Verdadeiras obras de arte, confortáveis e exclusivas para mulheres e meninas.</p>
          </div>
          <div className="p-8 border border-stone-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500 text-2xl">✿</div>
            <h3 className="font-serif text-xl mb-4">Elegância</h3>
            <p className="text-stone-500">Cada acessório é uma oportunidade de expressar sua individualidade e estilo único.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;