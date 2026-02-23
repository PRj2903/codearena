import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User, Github, Chrome, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { mockSignIn } = useAuth();

    // Form fields
    const [username, setUsername] = useState('');
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
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { username }
                }
            });

            if (signUpError) throw signUpError;

            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Failed to create account');
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
            setError(err.message || `Failed to sign up via ${provider}`);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg p-8 relative z-10 my-8"
            >
                {/* Card Container */}
                <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 shadow-2xl rounded-2xl p-8 sm:p-10 relative overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500" />

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                            Join CodeArena
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Create an account to track your progress and compete.
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
                            <label className="text-sm font-medium text-slate-300">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="Enter a unique username"
                                />
                            </div>
                        </div>

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
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="Create a strong password"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1 pl-1">Must be at least 8 characters long.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(20,184,166,0.3)] mt-6"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center space-x-4">
                        <div className="h-px bg-slate-800 flex-grow" />
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Or register with</span>
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
                        Already have an account?{' '}
                        <Link to="/login" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
                            Log in instead
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
