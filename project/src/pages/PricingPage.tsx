import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Menu, X, User, LogOut, Zap, Target, Crown, Rocket } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function PricingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
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

  const plans = [
    {
      name: "Starter",
      icon: <Zap className="w-8 h-8" />,
      price: billingCycle === 'monthly' ? 0 : 0,
      period: billingCycle === 'monthly' ? '/mois' : '/an',
      description: "Parfait pour tester et découvrir AvatarLab",
      features: [
        "3 avatars clients par mois",
        "Analyse de base des sources",
        "Export PDF",
        "Support par email"
      ],
      cta: "Commencer gratuitement",
      popular: false,
      color: "blue"
    },
    {
      name: "Pro",
      icon: <Target className="w-8 h-8" />,
      price: billingCycle === 'monthly' ? 29 : 290,
      period: billingCycle === 'monthly' ? '/mois' : '/an',
      description: "Pour les entrepreneurs et freelances sérieux",
      features: [
        "50 avatars clients par mois",
        "Analyse approfondie multi-sources",
        "Suggestions de wording incluses",
        "Export PDF + JSON",
        "Historique complet",
        "Support prioritaire",
        "Accès aux nouvelles fonctionnalités"
      ],
      cta: "Choisir Pro",
      popular: true,
      color: "purple",
      savings: billingCycle === 'yearly' ? "2 mois offerts" : null
    },
    {
      name: "Agency",
      icon: <Crown className="w-8 h-8" />,
      price: billingCycle === 'monthly' ? 99 : 990,
      period: billingCycle === 'monthly' ? '/mois' : '/an',
      description: "Pour les agences et équipes marketing",
      features: [
        "Avatars clients illimités",
        "Analyse ultra-poussée",
        "API access",
        "White-label disponible",
        "Gestion d'équipe",
        "Rapports personnalisés",
        "Support dédié",
        "Formation incluse"
      ],
      cta: "Choisir Agency",
      popular: false,
      color: "gold",
      savings: billingCycle === 'yearly' ? "2 mois offerts" : null
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-gradient-radial from-purple-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-gradient-radial from-blue-500/18 via-blue-500/9 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[5%] w-[350px] h-[350px] bg-gradient-radial from-pink-500/16 via-pink-500/8 to-transparent rounded-full blur-3xl animate-glow-shimmer" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-purple-500/12 via-blue-500/12 to-pink-500/12 rounded-full blur-3xl animate-glow-breathe opacity-70" style={{ animationDelay: '1s' }}></div>
      </div>

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
                <Link to="/#produit" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Produit
                </Link>
                <Link to="/#fonctionnement" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Comment ça marche
                </Link>
                <Link to="/tarification" className="text-white font-medium transition-colors duration-200 text-sm">
                  Tarification
                </Link>
                <Link to="/#faq" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  FAQ
                </Link>
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
                  <Link to="/#produit" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Produit
                  </Link>
                  <Link to="/#fonctionnement" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Comment ça marche
                  </Link>
                  <Link to="/tarification" className="block text-white font-medium transition-colors duration-200 text-base py-2">
                    Tarification
                  </Link>
                  <Link to="/#faq" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    FAQ
                  </Link>
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-800/50">
                  {user ? (
                    <>
                      <div className="text-gray-300 text-base font-medium py-2">
                        {user.user_metadata?.name || user.email}
                      </div>
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

      {/* Main Content */}
      <div className="relative min-h-screen px-6 pt-32 pb-16" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="text-5xl md:text-7xl font-extralight mb-6 leading-tight">
              Choisissez votre{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                formule
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-4xl mx-auto leading-relaxed">
              Des avatars clients ultra-précis pour tous les budgets. Commencez gratuitement, scalez quand vous êtes prêt.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-16 fade-in">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-800/50">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 relative ${
                    billingCycle === 'yearly'
                      ? 'bg-white text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Annuel
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    -20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`fade-in relative bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20'
                    : 'border-gray-800/30 hover:border-gray-700/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Plus populaire</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    plan.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                    plan.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
                  <p className="text-gray-400 font-light">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold">{plan.price}€</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <p className="text-green-400 text-sm mt-2 font-medium">{plan.savings}</p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={user ? "/dashboard" : "/signup"}
                  className={`w-full py-4 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Enterprise Section */}
          <div className="fade-in bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-3xl md:text-4xl font-medium mb-4">
                Besoin d'une solution{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  sur-mesure
                </span>{' '}
                ?
              </h3>
              <p className="text-xl text-gray-400 font-light mb-8 leading-relaxed">
                Pour les grandes entreprises avec des besoins spécifiques : intégrations personnalisées, 
                volumes importants, support dédié et formations sur-site.
              </p>
              <a
                href="mailto:contact@avatarlab.fr"
                className="bg-white text-black px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3"
              >
                <span>Contactez notre équipe</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-32">
            <h2 className="text-3xl md:text-4xl font-medium text-center mb-12 fade-in">
              Questions fréquentes sur la tarification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30">
                <h3 className="text-xl font-medium mb-4 text-purple-400">💳 Puis-je changer de formule à tout moment ?</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment. 
                  Les changements prennent effet immédiatement et nous ajustons la facturation au prorata.
                </p>
              </div>

              <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-medium mb-4 text-blue-400">🔄 Que se passe-t-il si je dépasse ma limite ?</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  Nous vous prévenons quand vous approchez de votre limite. Vous pouvez soit upgrader votre formule, 
                  soit attendre le mois suivant. Aucune coupure brutale de service.
                </p>
              </div>

              <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-medium mb-4 text-green-400">💰 Y a-t-il une garantie de remboursement ?</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  Oui, nous offrons une garantie satisfait ou remboursé de 14 jours sur tous nos plans payants. 
                  Si vous n'êtes pas satisfait, nous vous remboursons intégralement.
                </p>
              </div>

              <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-medium mb-4 text-yellow-400">🎯 La formule gratuite a-t-elle des limitations ?</h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  La formule Starter vous donne accès à toutes les fonctionnalités de base avec 3 avatars par mois. 
                  Parfait pour tester la qualité de nos analyses avant de passer à une formule payante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-gray-800/50" style={{ zIndex: 10 }}>
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

export default PricingPage;