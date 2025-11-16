export default function FeaturesSection() {
  const features = [
    {
      icon: '📏',
      title: 'Otimização 1D',
      description: 'Para barras, perfis e materiais lineares com algoritmos avançados.',
    },
    {
      icon: '📐',
      title: 'Otimização 2D',
      description: 'Para chapas e placas com algoritmos de empacotamento inteligente.',
    },
    {
      icon: '📊',
      title: 'Relatórios Detalhados',
      description: 'Análises completas com visualizações e métricas de eficiência.',
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Funcionalidades Principais</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border-none rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h5 className="text-xl font-semibold mb-3">{feature.title}</h5>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

