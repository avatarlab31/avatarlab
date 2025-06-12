import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Zap, Users, TrendingUp, Star, Menu, X, User, LogOut, Clock, DollarSign, Brain, Rocket, Building, UserCheck, MessageSquare, BarChart3, Globe, Shield, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    // Fade in animation on mount
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in');
      }, index * 100);
    });
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[80%] max-w-6xl mobile-menu-container">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 shadow-2xl rounded-2xl transition-all duration-300">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/OpenAI Playground 2025-06-12 at 10.11.35 (1) copy copy.png" 
                  alt="AvatarLab Logo" 
                  className="h-8"
                />
                <span className="text-xl font-mono font-medium tracking-wider text-white mt-0.5">
                  AvatarLab
                </span>
              </Link>
              
              <div className="hidden lg:flex items-center space-x-8">
                <a href="#produit" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Produit
                </a>
                <a href="#fonctionnement" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Comment ça marche
                </a>
                <Link to="/tarification" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Tarification
                </Link>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  FAQ
                </a>
              </div>

              <div className="hidden lg:flex items-center space-x-4">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                      <User className="w-4 h-4" />
                      <span>{user.user_metadata?.name || user.email}</span>
                    </button>
                    
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl py-2">
                        <Link
                          to="/dashboard"
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Target className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Se déconnecter</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link 
                      to="/login"
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                      Se connecter
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 text-sm"
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-8 py-6 pb-8">
                <div className="space-y-4 mb-6">
                  <a href="#produit" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Produit
                  </a>
                  <a href="#fonctionnement" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Comment ça marche
                  </a>
                  <Link to="/tarification" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Tarification
                  </Link>
                  <a href="#faq" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    FAQ
                  </a>
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-800/50">
                  {user ? (
                    <>
                      <div className="text-gray-300 text-base font-medium py-2">
                        {user.user_metadata?.name || user.email}
                      </div>
                      <Link
                        to="/dashboard"
                        className="w-full text-left text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2 flex items-center space-x-2"
                      >
                        <Target className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Se déconnecter</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login"
                        className="w-full text-left text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2 block"
                      >
                        Se connecter
                      </Link>
                      <Link
                        to="/signup"
                        className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 text-base mb-2 block text-center"
                      >
                        S'inscrire
                      </Link>
                    </>
                  )}
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 🎯 ATTENTION - Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-16" style={{ zIndex: 10 }}>
        {/* Hero Section Glows - Bleu/Violet/Rose */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-gradient-radial from-blue-500/25 via-blue-500/12 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-gradient-radial from-purple-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[30%] left-[20%] w-[350px] h-[350px] bg-gradient-radial from-pink-500/18 via-pink-500/9 to-transparent rounded-full blur-3xl animate-glow-shimmer" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-blue-500/12 via-purple-500/12 to-pink-500/12 rounded-full blur-3xl animate-glow-breathe opacity-70" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <h1 className="fade-in text-5xl md:text-7xl lg:text-8xl font-extralight mb-8 leading-tight">
            En un clic, génère l'avatar client{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              ultra-précis
            </span>{' '}
            de ton produit.
          </h1>
          
          <h2 className="fade-in text-2xl md:text-3xl font-extralight mb-4 text-red-400">
            Et arrête de cramer ton budget pub.
          </h2>
          
          <p className="fade-in text-xl md:text-2xl text-gray-400 mb-12 max-w-5xl mx-auto font-light leading-relaxed">
            Décris simplement ton produit. Notre IA fait le reste. Elle analyse en temps réel les forums, 
            réseaux sociaux, avis clients et données marché pour te livrer un persona ultra-ciblé, prêt à convertir.
          </p>
          
          <div className="fade-in mb-16">
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3 shadow-2xl"
            >
              <Target className="w-6 h-6" />
              <span>Générer mon avatar client gratuitement</span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="fade-in text-center">
            <p className="text-gray-500 text-sm mb-4">Déjà utilisé par plus de 10,000 entrepreneurs</p>
            <div className="flex justify-center items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-400 ml-2">4.9/5 (2,847 avis)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 👀 INTEREST - Le problème */}
      <section className="relative py-32 px-6" style={{ zIndex: 10 }}>
        {/* Problem Section Glows - Rouge/Orange */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[5%] w-[450px] h-[450px] bg-gradient-radial from-red-500/20 via-red-500/10 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-gradient-radial from-orange-500/18 via-orange-500/9 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-red-500/8 via-orange-500/8 to-red-500/8 rounded-full blur-3xl animate-glow-breathe opacity-60" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 fade-in">
            <h2 className="text-4xl md:text-6xl font-extralight mb-8">
              Le vrai problème n'est pas ton produit.{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                C'est à qui tu le vends.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="fade-in bg-red-500/10 backdrop-blur-sm rounded-3xl p-8 border border-red-500/20">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-red-400">💸 Temps perdu</h3>
              <p className="text-gray-300 font-light leading-relaxed text-lg">
                Combien de fois t'as-tu perdu du temps à créer des personas à la main ?
              </p>
            </div>

            <div className="fade-in bg-orange-500/10 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/20" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-orange-400">⏱️ Recherches infinies</h3>
              <p className="text-gray-300 font-light leading-relaxed text-lg">
                Combien d'heures passées à lire des commentaires ou fouiller Reddit, Amazon et TikTok ?
              </p>
            </div>

            <div className="fade-in bg-red-500/10 backdrop-blur-sm rounded-3xl p-8 border border-red-500/20" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-red-400 transform rotate-180" />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-red-400">📉 Budget cramé</h3>
              <p className="text-gray-300 font-light leading-relaxed text-lg">
                Et au final, combien d'euros cramés sur des audiences mal ciblées ?
              </p>
            </div>
          </div>

          <div className="fade-in text-center bg-gray-900/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-800/30">
            <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed mb-6">
              Créer un bon avatar client est essentiel pour vendre, mais c'est <span className="text-red-400 font-medium">long</span>, 
              <span className="text-red-400 font-medium"> imprécis</span>, et souvent basé sur des <span className="text-red-400 font-medium">suppositions</span>.
            </p>
            <p className="text-3xl md:text-4xl font-medium text-white">
              Tu n'as plus besoin de deviner.
            </p>
          </div>
        </div>
      </section>

      {/* 🔍 DESIRE - Ta solution */}
      <section id="produit" className="relative py-32 px-6" style={{ zIndex: 10 }}>
        {/* Solution Section Glows - Vert/Bleu/Cyan */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[8%] w-[500px] h-[500px] bg-gradient-radial from-green-500/22 via-green-500/11 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-[20%] left-[12%] w-[450px] h-[450px] bg-gradient-radial from-blue-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-[40%] left-[5%] w-[350px] h-[350px] bg-gradient-radial from-cyan-500/18 via-cyan-500/9 to-transparent rounded-full blur-3xl animate-glow-shimmer" style={{ animationDelay: '4.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-gradient-to-r from-green-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-glow-breathe opacity-65" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 fade-in">
            <h2 className="text-4xl md:text-6xl font-extralight mb-6 leading-tight">
              Une IA formée par des e-commerçants à{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                plusieurs millions d'euros
              </span>.
            </h2>
            <h3 className="text-3xl md:text-4xl font-light mb-8">
              Pour générer ton avatar client parfait. En 1 clic. Avec des données marché en temps réel.
            </h3>
            <p className="text-xl text-gray-400 font-light max-w-4xl mx-auto">
              Décris ton produit → L'IA fouille toutes les plateformes et te livre le portrait robot exact de ton client idéal.
            </p>
          </div>

          {/* Fonctionnement en 3 étapes */}
          <div id="fonctionnement" className="mb-20">
            <h3 className="text-3xl font-medium text-center mb-12 fade-in">Comment ça marche</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="fade-in text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-blue-400">1</span>
                </div>
                <h4 className="text-xl font-medium mb-4">📝 Tu décris ton produit</h4>
                <p className="text-gray-400 font-light">(ou copie la fiche produit)</p>
              </div>

              <div className="fade-in text-center" style={{ animationDelay: '0.1s' }}>
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-purple-400">2</span>
                </div>
                <h4 className="text-xl font-medium mb-4">🤖 L'IA lance une analyse massive</h4>
                <p className="text-gray-400 font-light">des comportements, intentions et discours clients</p>
              </div>

              <div className="fade-in text-center" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-green-400">3</span>
                </div>
                <h4 className="text-xl font-medium mb-4">🎯 Tu obtiens un persona complet</h4>
                <p className="text-gray-400 font-light">détaillé et exploitable immédiatement</p>
              </div>
            </div>
          </div>

          {/* Sources analysées */}
          <div className="mb-20">
            <h3 className="text-3xl font-medium text-center mb-12 fade-in">Sources analysées en temps réel</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 text-center">
                <MessageSquare className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <p className="text-sm font-medium">💬 TikTok, Instagram, YouTube</p>
              </div>
              <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 text-center" style={{ animationDelay: '0.1s' }}>
                <Users className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <p className="text-sm font-medium">📚 Reddit, Quora, Forums</p>
              </div>
              <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 text-center" style={{ animationDelay: '0.2s' }}>
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-sm font-medium">⭐ Amazon, Trustpilot</p>
              </div>
              <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 text-center" style={{ animationDelay: '0.3s' }}>
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-sm font-medium">👀 Groupes Facebook</p>
              </div>
              <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 text-center" style={{ animationDelay: '0.4s' }}>
                <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="text-sm font-medium">📈 Données marché</p>
              </div>
            </div>
          </div>

          {/* Fonctionnalités clés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/30">
              <Brain className="w-12 h-12 text-blue-400 mb-6" />
              <h4 className="text-xl font-medium mb-4">🧠 IA spécialisée en e-commerce</h4>
              <p className="text-gray-400 font-light">Formée spécifiquement pour le marketing et les ventes en ligne</p>
            </div>

            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/30" style={{ animationDelay: '0.1s' }}>
              <Zap className="w-12 h-12 text-yellow-400 mb-6" />
              <h4 className="text-xl font-medium mb-4">⚡ Génération instantanée</h4>
              <p className="text-gray-400 font-light">Résultats précis en moins de 30 secondes</p>
            </div>

            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/30" style={{ animationDelay: '0.2s' }}>
              <Target className="w-12 h-12 text-red-400 mb-6" />
              <h4 className="text-xl font-medium mb-4">🔥 Persona structuré complet</h4>
              <p className="text-gray-400 font-light">Peurs, désirs, objections, niveau de conscience, arguments clés</p>
            </div>

            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/30" style={{ animationDelay: '0.3s' }}>
              <MessageSquare className="w-12 h-12 text-purple-400 mb-6" />
              <h4 className="text-xl font-medium mb-4">🧩 Suggestions de wording</h4>
              <p className="text-gray-400 font-light">Angles publicitaires et messages intégrés</p>
            </div>
          </div>
        </div>
      </section>

      {/* ⏳ Section temps et budget */}
      <section className="relative py-32 px-6" style={{ zIndex: 10 }}>
        {/* Time/Budget Section Glows - Rouge/Orange intense */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[8%] w-[400px] h-[400px] bg-gradient-radial from-red-600/25 via-red-600/12 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] bg-gradient-radial from-orange-600/22 via-orange-600/11 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '3.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[650px] h-[200px] bg-gradient-to-r from-red-600/12 via-orange-600/12 to-red-600/12 rounded-full blur-3xl animate-glow-breathe opacity-70" style={{ animationDelay: '2.5s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="fade-in bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm rounded-3xl p-12 border border-red-500/20">
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-center">
              Tu ne peux pas te permettre de perdre du{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                temps ou de l'argent
              </span>{' '}
              sur les mauvaises personnes.
            </h2>
            
            <div className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8">
              <p className="mb-6">
                Chaque produit à tester, c'est des heures de recherches manuelles, et <span className="text-red-400 font-medium">100 à 500€ de budget pub à risque</span>.
              </p>
              
              <p className="mb-6">Quand tu lances sans un bon persona, tu ne valides rien :</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="text-center p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <TrendingUp className="w-8 h-8 text-red-400 mx-auto mb-3 transform rotate-180" />
                  <p className="text-red-400 font-medium">→ Tu perds en ROAS</p>
                </div>
                <div className="text-center p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <Target className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-red-400 font-medium">→ Tu perds en conversion</p>
                </div>
                <div className="text-center p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <Star className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-red-400 font-medium">→ Tu passes à côté d'un winner</p>
                </div>
              </div>
              
              <p className="text-center text-2xl md:text-3xl font-medium text-white">
                Notre IA réduit ce risque à quasiment zéro, en te livrant la cible la plus chaude et la plus alignée avec ton offre.
              </p>
              <p className="text-center text-3xl md:text-4xl font-bold text-green-400 mt-4">
                En 30 secondes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 📈 Pour qui est-ce fait */}
      <section className="relative py-32 px-6" style={{ zIndex: 10 }}>
        {/* Target Audience Section Glows - Bleu/Violet/Indigo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[5%] w-[450px] h-[450px] bg-gradient-radial from-blue-600/20 via-blue-600/10 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-[25%] left-[8%] w-[400px] h-[400px] bg-gradient-radial from-violet-600/18 via-violet-600/9 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-[10%] left-[15%] w-[350px] h-[350px] bg-gradient-radial from-indigo-600/16 via-indigo-600/8 to-transparent rounded-full blur-3xl animate-glow-shimmer" style={{ animationDelay: '5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-blue-600/8 via-violet-600/8 to-indigo-600/8 rounded-full blur-3xl animate-glow-breathe opacity-60" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 fade-in">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Créé pour les e-commerçants et marketers qui{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                n'ont plus de temps à perdre
              </span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/30 hover-lift">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <UserCheck className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-medium mb-4">🧑‍💻 Dropshippers & E-commerçants</h3>
              <p className="text-gray-400 font-light leading-relaxed text-lg">
                → Pour tester rapidement un produit sans gaspiller ton budget pub
              </p>
            </div>

            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/30 hover-lift" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Building className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-medium mb-4">🏢 Agences & Freelances</h3>
              <p className="text-gray-400 font-light leading-relaxed text-lg">
                → Pour livrer à tes clients des personas basés sur de la vraie data, pas des suppositions
              </p>
            </div>

            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/30 hover-lift" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-medium mb-4">🚀 Créateurs de marques</h3>
              <p className="text-gray-400 font-light leading-relaxed text-lg">
                → Pour construire un message cohérent et scaler plus vite avec un ciblage chirurgical
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 ACTION - CTA final */}
      <section className="relative py-32 px-6" style={{ zIndex: 10 }}>
        {/* CTA Section Glows - Multicolore intense */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-gradient-radial from-blue-500/25 via-blue-500/12 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute top-[20%] right-[12%] w-[350px] h-[350px] bg-gradient-radial from-purple-500/22 via-purple-500/11 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[25%] left-[15%] w-[300px] h-[300px] bg-gradient-radial from-pink-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-glow-shimmer" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-glow-breathe opacity-80" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
            <h2 className="text-4xl md:text-6xl font-extralight mb-6">
              Tu veux scaler ?{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Commence par parler à la bonne personne.
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
              Décris ton produit. On te donne le profil exact de ton client idéal. 
              Avec des données marché réelles, fraîches, et prêtes à convertir.
            </p>
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3 mb-6"
            >
              <Target className="w-6 h-6" />
              <span>Génère gratuitement ton avatar client maintenant</span>
            </Link>
            <p className="text-sm text-gray-500 font-light">
              Test gratuit — Sans engagement — Aucun script à écrire
            </p>
          </div>
        </div>
      </section>

      {/* 🔒 FAQ */}
      <section id="faq" className="relative py-32 px-6" style={{ zIndex: 10 }}>
        {/* FAQ Section Glows - Jaune/Ambre/Or */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[8%] w-[400px] h-[400px] bg-gradient-radial from-yellow-500/18 via-yellow-500/9 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-[20%] left-[10%] w-[450px] h-[450px] bg-gradient-radial from-amber-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-[50%] left-[5%] w-[300px] h-[300px] bg-gradient-radial from-orange-400/16 via-orange-400/8 to-transparent rounded-full blur-3xl animate-glow-shimmer" style={{ animationDelay: '5.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-yellow-500/8 via-amber-500/8 to-orange-400/8 rounded-full blur-3xl animate-glow-breathe opacity-50" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 fade-in">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "🤖 « Encore un outil d'IA ? Ça va me sortir un persona générique, non ? »",
                answer: "Non, justement. AvatarLab ne se contente pas de \"deviner\" un persona comme d'autres IA. Il analyse des données réelles issues de Reddit, TikTok, Instagram, Amazon, forums spécialisés, avis clients et plus. C'est comme si tu avais un assistant marketeur qui scanne le web à ta place, et te sort un persona exploitable directement pour ta pub."
              },
              {
                question: "📈 « Est-ce que c'est à jour ? J'ai besoin des tendances actuelles, pas d'un truc daté. »",
                answer: "Oui, AvatarLab est connecté à la réalité du marché en temps réel. On ne travaille pas avec des templates figés : chaque avatar généré se base sur ce que disent, vivent et recherchent les vrais utilisateurs maintenant. Tu veux savoir ce que pensent les gens de ton produit aujourd'hui ? AvatarLab te le montre."
              },
              {
                question: "📊 « C'est basé sur des vraies données ? Ou c'est juste une IA qui brode des trucs ? »",
                answer: "On bosse à partir de sources réelles : commentaires TikTok, discussions Reddit, avis Amazon, forums, Twitter, etc. Tu ne reçois pas une fiche théorique, mais un persona ultra-concret, nourri par ce que ton audience pense, dit et ressent en ligne."
              },
              {
                question: "🤔 « Je peux pas juste faire ça avec ChatGPT ? »",
                answer: "Tu peux… mais tu vas devoir : Trouver les bonnes questions à poser, Aller toi-même chercher les commentaires Reddit, TikTok, etc., Synthétiser tout ça à la main, Et prier pour que ce soit cohérent. Avec AvatarLab, tu colles ton produit → tu cliques → tu as tout : persona détaillé, pain points, langage utilisé, âge, habitudes, canaux d'acquisition, et même des idées de contenus. En 30 secondes."
              },
              {
                question: "💥 « Est-ce que je peux utiliser le persona directement dans mes campagnes ? »",
                answer: "Oui, et c'est le but ! Chaque avatar généré te donne : Le profil complet de ta cible, Des insights exploitables pour tes scripts, pages produits, publicités, Les mots-clés émotionnels qui résonnent avec ta cible, Et des recommandations sur où et comment la toucher. C'est fait pour être actionnable immédiatement, pas juste théorique."
              },
              {
                question: "⏱️ « En gros, ça me fait gagner combien de temps ? »",
                answer: "Des heures. Plus besoin de : Lire 40 avis clients, Scroller Reddit en anglais, Écouter des TikTok sans fin, Deviner qui est ta cible. Tu récupères l'équivalent de 3 à 5h de recherche en 1 minute chrono."
              },
              {
                question: "💸 « Et si je cible mal, je risque quoi ? »",
                answer: "Tu le sais : mauvais persona = pub cramée. C'est l'erreur la plus coûteuse en pub. AvatarLab te permet de réduire ce risque au maximum en te donnant un ciblage ultra-précis dès le départ."
              },
              {
                question: "🌍 « Est-ce que ça marche pour toutes les niches ? »",
                answer: "Oui. Que tu vendes : Du coaching, Des cosmétiques, Des vêtements, Un SaaS, Ou une formation… AvatarLab s'adapte. Tu peux même spécifier une zone géographique pour cibler selon les cultures et comportements locaux."
              },
              {
                question: "« Qui a créé AvatarLab ? »",
                answer: "À la base, AvatarLab était un outil interne, développé par un groupe d'e-commerçants, copywriters et media buyers qui gèrent des campagnes à plusieurs millions d'euros. Ils en avaient marre de perdre du temps (et de l'argent) à deviner leurs personas à chaque nouveau produit. Face au gain de temps et à la précision obtenus, ils ont décidé de le rendre public."
              }
            ].map((faq, index) => (
              <div key={index} className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/30" style={{ animationDelay: `${index * 0.1}s` }}>
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-800/20 transition-colors duration-200 rounded-2xl"
                >
                  <h3 className="text-lg font-medium text-white pr-4">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 font-light leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-gray-800/50" style={{ zIndex: 10 }}>
        {/* Footer Section Glows - Subtil multicolore */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-gradient-radial from-gray-500/10 via-gray-500/5 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-[10%] right-[25%] w-[250px] h-[250px] bg-gradient-radial from-blue-500/8 via-blue-500/4 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '6s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img 
                src="/OpenAI Playground 2025-06-12 at 10.11.35 (1) copy copy.png" 
                alt="AvatarLab Logo" 
                className="h-8"
              />
              <span className="text-xl font-mono font-medium tracking-wider text-white mt-0.5">
                AvatarLab
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
            <p className="text-gray-500 text-sm font-light">
              © 2024 AvatarLab. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;