
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, Phone, User, Sparkles, Scissors, BookOpen, Heart, Rocket, Menu, X, ZoomIn } from 'lucide-react';
import FloatingParticles from './components/FloatingParticles';
import { SPHERES, STEPS } from './constants';

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Refs for navigation
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const spheresRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImage]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setIsMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems = [
    { label: 'Начало', ref: heroRef },
    { label: 'За Картата', ref: aboutRef },
    { label: 'Играта', ref: processRef },
    { label: 'Сфери', ref: spheresRef },
    { label: 'Детайли', ref: detailsRef },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      <FloatingParticles />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 transition-all duration-300 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          
          <div className="relative max-w-5xl w-full flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
            <div className="relative group">
              <img 
                src={selectedImage} 
                alt="Enlarged future vision" 
                className="max-h-[70vh] w-auto rounded-2xl shadow-2xl border-4 border-white/10 bg-slate-800"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full text-center">
                <p className="font-handwritten text-4xl md:text-5xl text-rose-300 drop-shadow-lg animate-bounce">
                  Ето твоята картина за бъдещето
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm tracking-widest uppercase">Кликни навън, за да затвориш</p>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-md' : 'py-6 bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div 
            onClick={() => scrollToSection(heroRef)}
            className="text-2xl font-bold text-slate-800 cursor-pointer flex items-center gap-2 group"
          >
            <Sparkles className="text-rose-500 group-hover:rotate-12 transition-transform" />
            <span className="font-handwritten text-3xl text-rose-600">Карта 2026</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                className="text-sm font-semibold text-slate-600 hover:text-rose-500 transition-colors uppercase tracking-widest cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection(registerRef)}
              className="px-6 py-2 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 cursor-pointer"
            >
              Запиши се
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-800 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-rose-100 transition-all duration-300 md:hidden overflow-hidden ${isMobileMenuOpen ? 'max-h-screen py-8 shadow-2xl' : 'max-h-0'}`}>
          <div className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                className="text-xl font-medium text-slate-700 hover:text-rose-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection(registerRef)}
              className="px-10 py-4 bg-rose-500 text-white rounded-full font-bold text-lg"
            >
              Запиши се сега
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header ref={heroRef} className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2000" 
            alt="Paints and brush" 
            className="w-full h-full object-cover brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
        </div>

        <div className={`relative z-10 max-w-4xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-4 py-1 mb-6 rounded-full glass border border-white/50 text-rose-600 font-semibold text-sm tracking-widest uppercase">
            Творческо Ателие
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            Карта на <br />
            <span className="text-rose-300 font-handwritten italic">Случванията</span>
          </h1>
          <p className="text-xl md:text-2xl text-white font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Ела да си подшушнем, изпеем, нарисуваме, извикаме посоката на 2026г. С въображение и творчество 🥳
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => scrollToSection(registerRef)}
              className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" /> Запиши се сега
            </button>
            <button 
              onClick={() => scrollToSection(aboutRef)}
              className="px-8 py-4 glass hover:bg-white/40 text-white rounded-full font-bold transition-all border border-white/30 backdrop-blur-sm cursor-pointer"
            >
              Научи повече
            </button>
          </div>
        </div>
      </header>

      {/* Intro Section */}
      <section ref={aboutRef} id="about" className="py-32 px-4 max-w-6xl mx-auto relative z-10 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
              Сбъдни своите мечти 🎯
            </h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                Картата на Случванията е вълшебен колаж с мечти, желания и намерения, който всеки сам създава за себе си. 
                Това е процес на материализиране на вътрешния ни свят върху хартия, за да му дадем криле в реалността.
              </p>
              <p className="font-handwritten text-3xl text-rose-500">
                "Направи си го красиво! 😋"
              </p>
              <p>
                Събитието е отворено за всеки, который желае да използва мощната енергия на 
                <strong> първото Новолуние на 2026г!</strong> 🥳
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div 
                className="relative group cursor-zoom-in overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 hover:scale-[1.03] bg-slate-100"
                onClick={() => setSelectedImage(galleryImages[0])}
              >
                <img src={galleryImages[0]} className="w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110" alt="Creativity 1" />
                <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white w-10 h-10 drop-shadow-lg" />
                </div>
              </div>
              <div 
                className="relative group cursor-zoom-in overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 hover:scale-[1.03] bg-slate-100"
                onClick={() => setSelectedImage(galleryImages[1])}
              >
                <img src={galleryImages[1]} className="w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110" alt="Creativity 2" />
                <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white w-10 h-10 drop-shadow-lg" />
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div 
                className="relative group cursor-zoom-in overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 hover:scale-[1.03] bg-slate-100"
                onClick={() => setSelectedImage(galleryImages[2])}
              >
                <img src={galleryImages[2]} className="w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110" alt="Creativity 3" />
                <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white w-10 h-10 drop-shadow-lg" />
                </div>
              </div>
              <div 
                className="relative group cursor-zoom-in overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 hover:scale-[1.03] bg-slate-100"
                onClick={() => setSelectedImage(galleryImages[3])}
              >
                <img src={galleryImages[3]} className="w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110" alt="Creativity 4" />
                <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white w-10 h-10 drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section ref={processRef} className="py-32 bg-white/50 relative z-10 overflow-hidden scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Как ли? Като на игра 🎮</h2>
            <p className="text-rose-500 font-medium">Цветно, Щастливо и Като на шега 🃏</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {STEPS.map((step) => (
              <div key={step.id} className="group flex flex-col items-center text-center max-w-[120px]">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-sm border border-rose-100">
                  {step.emoji}
                </div>
                <span className="text-sm font-semibold text-slate-700">{step.action}</span>
              </div>
            ))}
            <div className="group flex flex-col items-center text-center max-w-[120px]">
              <div className="w-16 h-16 rounded-2xl bg-rose-500 flex items-center justify-center text-3xl mb-4 animate-bounce shadow-lg text-white">
                🪅
              </div>
              <span className="text-sm font-bold text-rose-600 italic">Сбъдват се!</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 9 Spheres */}
      <section ref={spheresRef} className="py-32 px-4 relative z-10 bg-gradient-to-b from-white/0 to-rose-50/50 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">9-те Сфери на Твоето Битие 💫</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Разделяме картата на 9 специфични зони, за да внесем фокус и енергия във всяко кътче на живота ти.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPHERES.map((sphere) => (
              <div 
                key={sphere.id} 
                className={`p-8 rounded-[2.5rem] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white ${sphere.color}`}
              >
                <div className="text-5xl mb-4">{sphere.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">{sphere.name}</h3>
                <p className="text-slate-600 text-sm">{sphere.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Details */}
      <section ref={detailsRef} className="py-32 px-4 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Rocket size={160} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3">
              <Calendar className="text-rose-400" /> Кога и Къде?
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 border border-rose-500/30">
                  <Clock className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <p className="text-rose-400 text-sm font-bold uppercase tracking-wider">Начало</p>
                  <p className="text-2xl font-semibold leading-tight">10:30ч., 18 януари 2026г.</p>
                  <p className="text-slate-400 mt-1">Продължителност: 3-4 часа</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 border border-rose-500/30">
                  <MapPin className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <p className="text-rose-400 text-sm font-bold uppercase tracking-wider">Адрес</p>
                  <p className="text-2xl font-semibold leading-tight">Светлик</p>
                  <p className="text-slate-400 mt-1">ул. Хаджи Димитър 13Б</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 border border-rose-500/30">
                  <User className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <p className="text-rose-400 text-sm font-bold uppercase tracking-wider">Водещ</p>
                  <p className="text-2xl font-semibold">Ралица Янкова</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-10 px-4">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <BookOpen className="text-rose-500" /> Какво да донесеш?
              </h3>
              <ul className="space-y-3 text-lg text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 mt-1 text-xl">✨</span>
                  <span><strong>Списания!</strong> Колкото повече, толкова повече! 😊</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 mt-1 text-xl">✨</span>
                  <span>Кадастрон и гланцово блокче (или ми пиши да приготвя за теб).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 mt-1 text-xl">✨</span>
                  <span>Твоето намерение за най-прекрасната 2026 година.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-[2rem] bg-rose-100/50 border border-rose-200">
              <h4 className="text-xl font-bold text-rose-900 mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" /> Енергиен Обмен
              </h4>
              <p className="text-rose-800">
                Поканен си да оставиш Енергиен паричен обмен за зала и водещ според твоето усещане и възможности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="register" ref={registerRef} className="py-32 px-4 relative z-10 scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-4 rounded-full bg-rose-500 text-white mb-8 shadow-2xl animate-pulse">
            <Scissors size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-800">Ела да сътворим 2026 заедно!</h2>
          <p className="text-xl text-slate-600 mb-12">
            Местата са ограничени от пространството, затова те молим да запазиш своето навреме.
          </p>
          
          <div className="glass p-8 md:p-12 rounded-[3rem] border border-white shadow-2xl inline-block w-full transition-transform hover:scale-[1.02]">
            <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-4">Запиши се тук:</p>
            <a 
              id="phone-link"
              href="tel:0878137559" 
              className="group flex items-center justify-center gap-4 text-3xl md:text-5xl font-bold text-slate-800 hover:text-rose-600 transition-colors"
            >
              <Phone className="w-8 h-8 md:w-12 md:h-12 group-hover:rotate-12 transition-transform text-rose-500" />
              0878 137 559
            </a>
            <p className="mt-8 text-slate-400">Очакваме те с отворено сърце и много цветове!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center text-slate-400 border-t border-rose-100">
        <p className="font-handwritten text-2xl mb-2 text-rose-300">Светлик & Ралица Янкова</p>
        <p>© 2026 Карта на Случванията. Всички мечти са възможни.</p>
      </footer>

      {/* Sticky Call to Action for Mobile */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm transition-all duration-300 ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <button 
          onClick={() => scrollToSection(registerRef)}
          className="w-full flex items-center justify-center gap-3 bg-rose-600 text-white py-4 px-6 rounded-full shadow-2xl font-bold animate-bounce-slow cursor-pointer"
        >
          <Phone className="w-5 h-5" /> Запиши се сега
        </button>
      </div>
    </div>
  );
};

export default App;
