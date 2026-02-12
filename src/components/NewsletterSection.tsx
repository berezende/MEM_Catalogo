import React from 'react';
import { TrendingUp, Users, Shield } from 'lucide-react';

const NewsletterSection: React.FC = () => {
  const formCreatedRef = React.useRef(false);

  React.useEffect(() => {
    // Evitar criação duplicada do formulário
    if (formCreatedRef.current) {
      return;
    }

    const scriptSrc = 'https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js';
    const scriptId = 'rd-station-forms-script';
    const formContainerId = 'catalogo-mem-d8ccd54a052a30050f2d';

    const createForm = () => {
      // Verificar se o formulário já existe no DOM
      const formContainer = document.getElementById(formContainerId);
      if (!formContainer) return;

      // Verificar se já tem conteúdo (formulário já criado)
      if (formContainer.children.length > 0) {
        formCreatedRef.current = true;
        return;
      }

      // @ts-ignore
      if (window.RDStationForms) {
        // @ts-ignore
        new window.RDStationForms(formContainerId, 'UA-151180973-1').createForm();
        formCreatedRef.current = true;
      }
    };

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      createForm();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = scriptSrc;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = createForm;
    document.body.appendChild(script);

    return () => {
      // Cleanup: limpar o formulário quando o componente for desmontado
      const formContainer = document.getElementById(formContainerId);
      if (formContainer) {
        formContainer.innerHTML = '';
      }
      formCreatedRef.current = false;
    };
  }, []);

  return (
    <section id="newsletter-section" className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        {/* Overlay Gradient Suave */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Decorative Light Elements */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-indigo-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/50 transition-all duration-500 hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.4)] hover:scale-[1.01] sm:hover:scale-[1.02] hover:-translate-y-1 sm:hover:-translate-y-2">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Content */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50/50">
              {/* Logo */}
              <div className="mb-4 sm:mb-6">
                <img
                  src="https://melhoresescolasmedicas.com/wp-content/uploads/2024/07/me-azul-2.png"
                  alt="Melhores Escolas Médicas"
                  className="h-14 sm:h-16 md:h-20 w-auto object-contain"
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
                O mundo da medicina
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  no seu email
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Acompanhe todas as novidades, dicas, notícias e curiosidades do mundo da medicina no seu email.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-gray-700 font-medium">Notícias exclusivas diariamente</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-gray-700 font-medium">Dicas e novidades</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-gray-700 font-medium">Conteúdo verificado e confiável</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-bold text-gray-900">25k+</div>
                  <div className="text-sm text-gray-600">Inscritos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">10+</div>
                  <div className="text-sm text-gray-600">Notícias Diárias</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Gratuito</div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-[#2854A2] flex flex-col justify-center lg:min-h-[500px]">
              <div className="w-full lg:h-full">
                <div role="main" id="catalogo-mem-d8ccd54a052a30050f2d"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .hover\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </section>
  );
};

export default NewsletterSection;
