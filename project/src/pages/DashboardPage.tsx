import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Menu, 
  X, 
  Target, 
  Calendar, 
  Eye, 
  Copy, 
  Plus, 
  Crown, 
  Zap, 
  Star,
  FileText,
  Video,
  Mail,
  Settings,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface PersonaGeneration {
  id: string;
  name: string;
  product: string;
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  preview: string;
}

function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'generations' | 'subscription' | 'bonuses'>('generations');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  // Mock data - à remplacer par de vraies données Supabase plus tard
  const [generations] = useState<PersonaGeneration[]>([
    {
      id: '1',
      name: 'Persona - Montre connectée fitness',
      product: 'Montre connectée pour sportifs',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'completed',
      preview: 'Femme, 25-35 ans, passionnée de fitness, utilise Instagram et TikTok...'
    },
    {
      id: '2',
      name: 'Persona - Cours de cuisine en ligne',
      product: 'Formation culinaire digitale',
      createdAt: '2024-01-14T15:45:00Z',
      status: 'completed',
      preview: 'Homme/Femme, 30-50 ans, amateur de cuisine, recherche praticité...'
    },
    {
      id: '3',
      name: 'Persona - Logiciel de comptabilité',
      product: 'SaaS comptabilité PME',
      createdAt: '2024-01-13T09:15:00Z',
      status: 'processing',
      preview: 'En cours de génération...'
    }
  ]);

  const [userPlan] = useState({
    name: 'Pro',
    generationsUsed: 12,
    generationsLimit: 50,
    renewalDate: '2024-02-15',
    status: 'active'
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

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
    navigate('/');
  };

  const handleCopyPersona = (id: string) => {
    // Simuler la copie du persona
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-gradient-radial from-blue-500/15 via-blue-500/8 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-gradient-radial from-purple-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-glow-breathe opacity-70" style={{ animationDelay: '1s' }}></div>
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
                <Link to="/tarification" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Tarification
                </Link>
                <Link to="/dashboard" className="text-white font-medium transition-colors duration-200 text-sm">
                  Dashboard
                </Link>
              </div>

              <div className="hidden lg:flex items-center space-x-4">
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
                  <Link to="/tarification" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Tarification
                  </Link>
                  <Link to="/dashboard" className="block text-white font-medium transition-colors duration-200 text-base py-2">
                    Dashboard
                  </Link>
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-800/50">
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
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative min-h-screen px-6 pt-32 pb-16" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 fade-in">
            <h1 className="text-4xl md:text-5xl font-extralight mb-4 leading-tight">
              Tableau de bord{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AvatarLab
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-light">
              Bienvenue {user.user_metadata?.name || 'dans votre espace personnel'}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-2xl font-bold text-white">{userPlan.generationsUsed}</span>
              </div>
              <h3 className="text-lg font-medium mb-1">Personas générés</h3>
              <p className="text-gray-400 text-sm">
                {userPlan.generationsUsed}/{userPlan.generationsLimit} ce mois
              </p>
            </div>

            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-2xl font-bold text-white">{userPlan.name}</span>
              </div>
              <h3 className="text-lg font-medium mb-1">Plan actuel</h3>
              <p className="text-gray-400 text-sm">
                Renouvellement le {new Date(userPlan.renewalDate).toLocaleDateString('fr-FR')}
              </p>
            </div>

            <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-2xl font-bold text-white">98%</span>
              </div>
              <h3 className="text-lg font-medium mb-1">Précision moyenne</h3>
              <p className="text-gray-400 text-sm">
                Basé sur vos retours
              </p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="fade-in mb-8">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-2 border border-gray-800/30 inline-flex">
              <button
                onClick={() => setActiveTab('generations')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'generations'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mes générations
              </button>
              <button
                onClick={() => setActiveTab('subscription')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'subscription'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Abonnement
              </button>
              <button
                onClick={() => setActiveTab('bonuses')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'bonuses'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Bonus
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'generations' && (
            <div className="fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-medium">Mes personas générés</h2>
                <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Nouveau persona</span>
                </button>
              </div>

              <div className="space-y-4">
                {generations.map((generation, index) => (
                  <div
                    key={generation.id}
                    className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-medium text-white">{generation.name}</h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            generation.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            generation.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {generation.status === 'completed' ? (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Terminé</span>
                              </div>
                            ) : generation.status === 'processing' ? (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>En cours</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>Échec</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">Produit : {generation.product}</p>
                        <p className="text-gray-300 mb-4">{generation.preview}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(generation.createdAt)}</span>
                        </div>
                      </div>
                      
                      {generation.status === 'completed' && (
                        <div className="flex items-center space-x-2 ml-6">
                          <button className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors duration-200">
                            <Eye className="w-5 h-5 text-gray-400" />
                          </button>
                          <button
                            onClick={() => handleCopyPersona(generation.id)}
                            className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors duration-200"
                          >
                            <Copy className={`w-5 h-5 ${copiedId === generation.id ? 'text-green-400' : 'text-gray-400'}`} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="fade-in">
              <h2 className="text-2xl font-medium mb-8">Gestion de l'abonnement</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Plan */}
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Plan {userPlan.name}</h3>
                      <p className="text-gray-400">Actif depuis janvier 2024</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Générations utilisées</span>
                      <span className="text-white">{userPlan.generationsUsed}/{userPlan.generationsLimit}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${(userPlan.generationsUsed / userPlan.generationsLimit) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prochain renouvellement</span>
                      <span className="text-white">{new Date(userPlan.renewalDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      to="/tarification"
                      className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 text-center block"
                    >
                      Changer de plan
                    </Link>
                    <button className="w-full bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 border border-gray-700">
                      Gérer la facturation
                    </button>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30">
                  <h3 className="text-xl font-medium mb-6">Statistiques d'utilisation</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Cette semaine</span>
                        <span className="text-white">5 générations</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Ce mois</span>
                        <span className="text-white">{userPlan.generationsUsed} générations</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${(userPlan.generationsUsed / userPlan.generationsLimit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Temps moyen de génération</span>
                        <span className="text-white">28 secondes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bonuses' && (
            <div className="fade-in">
              <h2 className="text-2xl font-medium mb-8">Bonus et outils exclusifs</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Templates d'emails</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Emails de vente personnalisés basés sur vos personas
                  </p>
                  <button className="w-full bg-blue-500/20 text-blue-400 py-2 rounded-xl font-medium hover:bg-blue-500/30 transition-all duration-200">
                    Accéder
                  </button>
                </div>

                <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Scripts vidéo</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Scripts pour TikTok, YouTube et publicités vidéo
                  </p>
                  <button className="w-full bg-purple-500/20 text-purple-400 py-2 rounded-xl font-medium hover:bg-purple-500/30 transition-all duration-200">
                    Accéder
                  </button>
                </div>

                <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Pages de vente</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Structures de landing pages optimisées
                  </p>
                  <button className="w-full bg-green-500/20 text-green-400 py-2 rounded-xl font-medium hover:bg-green-500/30 transition-all duration-200">
                    Accéder
                  </button>
                </div>

                <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Audiences Facebook</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Paramètres de ciblage prêts à importer
                  </p>
                  <button className="w-full bg-yellow-500/20 text-yellow-400 py-2 rounded-xl font-medium hover:bg-yellow-500/30 transition-all duration-200">
                    Accéder
                  </button>
                </div>

                <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Communauté privée</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Accès au Discord exclusif des utilisateurs Pro
                  </p>
                  <button className="w-full bg-red-500/20 text-red-400 py-2 rounded-xl font-medium hover:bg-red-500/30 transition-all duration-200">
                    Rejoindre
                  </button>
                </div>

                <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200">
                  <div className="w-12 h-12 bg-gray-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Bientôt disponible</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Nouveaux outils en développement
                  </p>
                  <button className="w-full bg-gray-500/20 text-gray-400 py-2 rounded-xl font-medium cursor-not-allowed">
                    Prochainement
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;