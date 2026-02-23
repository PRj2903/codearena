import { Link, useNavigate } from 'react-router-dom';
import { Code2, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Problems', href: '/problems' },
        { name: 'Leaderboard', href: '/leaderboard' },
    ];

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <Code2 className="h-6 w-6 text-blue-500" />
                    <span className="font-bold text-xl tracking-tight">CodeArena</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/profile" className="flex items-center space-x-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                <span className="bg-slate-800 rounded-full p-1.5"><UserIcon className="h-4 w-4" /></span>
                                <span>{user.user_metadata?.username || user.user_metadata?.name || user.email?.split('@')[0]}</span>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="px-4 py-2 text-sm font-medium border border-slate-700 text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-all"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-border/40 bg-background"
                    >
                        <div className="container px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="block text-sm font-medium text-muted-foreground hover:text-foreground"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-border/40 flex flex-col space-y-3">
                                {user ? (
                                    <>
                                        <Link
                                            to="/profile"
                                            className="block text-sm font-medium text-slate-300 hover:text-white flex items-center space-x-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <UserIcon className="h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleSignOut();
                                                setIsOpen(false);
                                            }}
                                            className="flex items-center space-x-2 text-sm font-medium text-red-400 hover:text-red-300 w-full text-left"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Sign out</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block text-sm font-medium text-muted-foreground hover:text-foreground"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="block w-full px-4 py-2 text-center text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
