import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { mockSignIn } = useAuth();

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // If no supabase keys configured, just fallback to mocked Auth
        if (!import.meta.env.VITE_SUPABASE_URL) {
            setTimeout(() => {
                mockSignIn(email);
                setIsLoading(false);
                navigate('/');
            }, 1000);
            return;
        }

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (signInError) throw signInError;

            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Failed to login');
            setIsLoading(false);
        }
    };

    const handleOAuth = async (provider: 'github' | 'google') => {
        setIsLoading(true);
        if (!import.meta.env.VITE_SUPABASE_URL) {
            setTimeout(() => {
                mockSignIn(`${provider}_user@example.com`);
                setIsLoading(false);
                navigate('/');
            }, 1000);
            return;
        }

        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || `Failed to login via ${provider}`);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 relative z-10"
            >
                {/* Card Container */}
                <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 shadow-2xl rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400" />

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                            Welcome Back
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Ready to conquer new algorithms?
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-300">Password</label>
                                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center space-x-4">
                        <div className="h-px bg-slate-800 flex-grow" />
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Or continue with</span>
                        <div className="h-px bg-slate-800 flex-grow" />
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleOAuth('github')}
                            type="button"
                            disabled={isLoading}
                            className="flex items-center justify-center space-x-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg py-2.5 transition-colors group disabled:opacity-50"
                        >
                            <Github className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">GitHub</span>
                        </button>
                        <button
                            onClick={() => handleOAuth('google')}
                            type="button"
                            disabled={isLoading}
                            className="flex items-center justify-center space-x-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg py-2.5 transition-colors group disabled:opacity-50"
                        >
                            <Chrome className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Google</span>
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
