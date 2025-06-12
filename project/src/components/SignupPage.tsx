import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Menu, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Fade in animation on mount
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => {
      el.classList.add('animate-fade-in');
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) return;
    if (formData.password !== formData.confirmPassword) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.name);
      
      if (error) {
        if (error.message.includes('User already registered')) {
          setError('Un compte existe déjà avec cette adresse email');
        } else if (error.message.includes('Password should be at least')) {
          setError('Le mot de passe doit contenir au moins 6 caractères');
        } else if (error.message.includes('Invalid email')) {
          setError('Adresse email invalide');
        } else {
          setError('Une erreur est survenue lors de la création du compte');
        }
      } else {
        setSuccess('Compte créé avec succès ! Redirection vers la tarification...');
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        // Redirect to pricing page after a short delay
        setTimeout(() => {
          navigate('/tarification');
        }, 1500);
      }
    } catch (err) {
      setError('Une erreur inattendue est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.password.trim() && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-gradient-radial from-purple-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-gradient-radial from-blue-500/15 via-blue-500/8 to-transparent rounded-full blur-3xl animate-glow-drift" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-glow-breathe opacity-70" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation - Identical to homepage */}
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
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Produit
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Ressources
                </a>
                <Link to="/tarification" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Tarification
                </Link>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Contact
                </a>
              </div>

              <div className="hidden lg:flex items-center space-x-4">
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
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Produit
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Ressources
                  </a>
                  <Link to="/tarification" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Tarification
                  </Link>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2">
                    Contact
                  </a>
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-800/50">
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
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6 pt-32 pb-16 relative" style={{ zIndex: 10 }}>
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl md:text-5xl font-extralight mb-4 leading-tight">
              Rejoignez{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AvatarLab
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-light">
              Créez votre compte et générez vos premiers personas
            </p>
          </div>

          {/* Signup Form */}
          <div className="fade-in bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/30">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm font-light">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm font-light">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-light text-gray-300 mb-3">
                  Nom complet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all font-light"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-light text-gray-300 mb-3">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all font-light"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-light text-gray-300 mb-3">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all font-light"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-light text-gray-300 mb-3">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all font-light"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-400 text-sm mt-2 font-light">
                    Les mots de passe ne correspondent pas
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full bg-white text-black py-4 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center justify-center space-x-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Création du compte...</span>
                  </>
                ) : (
                  <>
                    <span>Créer mon compte</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-700/50"></div>
              <span className="px-4 text-sm text-gray-500 font-light">ou</span>
              <div className="flex-1 border-t border-gray-700/50"></div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-400 font-light mb-4">
                Vous avez déjà un compte ?
              </p>
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors font-light"
              >
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8 fade-in">
            <p className="text-sm text-gray-500 font-light">
              En créant un compte, vous acceptez nos{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                conditions d'utilisation
              </a>{' '}
              et notre{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                politique de confidentialité
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;