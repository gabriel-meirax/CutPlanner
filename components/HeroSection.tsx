export default function HeroSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById('form-section');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
              <span>🔧</span> CutPlanner
            </h1>
            <p className="text-xl mb-6 leading-relaxed">
              Sistema inteligente de otimização de cortes para serralherias.
              Reduza desperdícios e maximize o aproveitamento do material.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToForm}
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🚀 Começar Agora
              </button>
              <a
                href="#features"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                ℹ️ Saiba Mais
              </a>
            </div>
          </div>
          <div className="lg:w-1/3 text-center">
            <div className="text-8xl opacity-75">⚙️</div>
          </div>
        </div>
      </div>
    </section>
  );
}

