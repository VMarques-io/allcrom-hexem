import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Loader2, Shield, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos.')
      return
    }

    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch {
      setError('Credenciais inválidas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    'Gestão comercial completa',
    'Controle de estoque',
    'Assistência técnica',
    'Financeiro integrado',
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="relative z-10 flex flex-col justify-center h-full px-16 py-12">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <img src="/logo-allcrom.png" alt="Allcrom" className="h-10 w-auto object-contain" />
            </div>
          </div>

          {/* Tagline */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Sistema Operacional<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                para Laboratório
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md">
              Plataforma completa para gestão de operações, comercial, estoque e assistência técnica.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-violet-400" />
                </div>
                <span className="text-slate-300 text-base">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-10 flex items-center gap-2 text-slate-500">
            <Shield className="h-4 w-4" />
            <span className="text-sm">ISO 9001:2015 Certificado</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <img src="/logo-allcrom.png" alt="Allcrom" className="h-10 w-auto object-contain" />
              <div className="text-left">
                <h1 className="text-2xl font-bold text-slate-900">Allcrom</h1>
                <span className="text-[10px] font-medium text-violet-500 uppercase tracking-widest">System</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Bem-vindo</h2>
              <p className="text-slate-500 mt-1">Entre com suas credenciais para acessar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center gap-2"
                >
                  <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@allcrom.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-violet-500 focus:ring-violet-500" />
                  <span className="text-sm text-slate-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <span>Entrar no Sistema</span>
                )}
              </button>
            </form>
          </div>

          {/* Mobile ISO badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 lg:hidden">
            <Shield className="h-4 w-4" />
            <span className="text-sm">ISO 9001:2015 Certificado</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}