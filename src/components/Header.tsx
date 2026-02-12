import React, { useState } from 'react';

interface HeaderProps {
  onNavigateHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Buscar:', searchQuery);
  };

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter-section');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="bg-[#004B9D] w-full">
      {/* Menu Superior - Desktop */}
      <div className="hidden md:block w-full px-4">
        <div className="flex items-center justify-center py-3 relative">
          {/* Links de navegação centralizados */}
          <nav className="flex items-center gap-6 lg:gap-8">
            <a 
              href="https://melhoresescolasmedicas.com/conteudos-para-baixar/" 
              className="text-white hover:text-[#C2FF3A] transition-colors text-xs lg:text-sm font-medium"
            >
              Materiais para baixar
            </a>
            <a 
              href="https://melhoresescolasmedicas.com/" 
              className="text-[#C2FF3A] hover:text-white transition-colors text-xs lg:text-sm font-medium"
            >
              Notícias
            </a>
            <a 
              href="https://melhoresescolasmedicas.com/painel-da-educacao-medica/" 
              className="text-white hover:text-[#C2FF3A] transition-colors text-xs lg:text-sm font-medium"
            >
              Painel da Educação Médica
            </a>
            <a 
              href="https://melhoresescolasmedicas.com/sobre/" 
              className="text-white hover:text-[#C2FF3A] transition-colors text-xs lg:text-sm font-medium"
            >
              Quem somos
            </a>
          </nav>

          {/* Busca e Newsletter à direita */}
          <div className="absolute right-4 flex items-center gap-4">
            {/* Campo de busca */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="bg-[#004B9D] border border-white/30 rounded-full px-4 py-1.5 pr-10 text-white placeholder-white/70 text-xs outline-none focus:border-white transition-colors w-48 lg:w-64"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="white" 
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Botão Newsletter */}
            <button 
              onClick={scrollToNewsletter}
              className="bg-[#C2FF3A] text-[#004B9D] font-bold rounded-full px-5 py-2 text-xs whitespace-nowrap hover:bg-[#B3F02A] transition-colors"
            >
              Participe da newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className="md:hidden w-full px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Botão Menu Hamburguer */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
            aria-label="Menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Botão Newsletter Mobile */}
          <button 
            onClick={scrollToNewsletter}
            className="bg-[#C2FF3A] text-[#004B9D] font-bold rounded-full px-4 py-1.5 text-xs whitespace-nowrap hover:bg-[#B3F02A] transition-colors"
          >
            Newsletter
          </button>
        </div>

        {/* Menu Dropdown Mobile */}
        {mobileMenuOpen && (
          <div className="mt-3 pb-3 border-t border-white/10 pt-3">
            <nav className="flex flex-col gap-3">
              <a 
                href="https://melhoresescolasmedicas.com/conteudos-para-baixar/" 
                className="text-white hover:text-[#C2FF3A] transition-colors text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Materiais para baixar
              </a>
              <a 
                href="https://melhoresescolasmedicas.com/" 
                className="text-[#C2FF3A] hover:text-white transition-colors text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Notícias
              </a>
              <a 
                href="https://melhoresescolasmedicas.com/painel-da-educacao-medica/" 
                className="text-white hover:text-[#C2FF3A] transition-colors text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Painel da Educação Médica
              </a>
              <a 
                href="https://melhoresescolasmedicas.com/sobre/" 
                className="text-white hover:text-[#C2FF3A] transition-colors text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quem somos
              </a>
            </nav>

            {/* Campo de busca mobile */}
            <form onSubmit={handleSearch} className="relative mt-3">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="bg-[#004B9D] border border-white/30 rounded-full px-4 py-2 pr-10 text-white placeholder-white/70 text-sm outline-none focus:border-white transition-colors w-full"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="white" 
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Logo Centralizada */}
      <div className="flex justify-center py-4 md:py-6 border-t border-white/10">
        <div 
          className="cursor-pointer" 
          onClick={onNavigateHome}
        >
          <img 
            src="https://melhoresescolasmedicas.com/wp-content/uploads/2023/12/Group-15.png" 
            alt="MEM - Melhores Escolas Médicas" 
            className="h-7 md:h-8 lg:h-10 w-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;