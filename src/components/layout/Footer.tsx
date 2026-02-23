import { Code2, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <Code2 className="h-6 w-6 text-blue-500" />
                            <span className="font-bold text-xl">CodeArena</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Empowering developers to master algorithms and build the future.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/problems" className="hover:text-foreground transition-colors">Problems</Link></li>
                            <li><Link to="/contest" className="hover:text-foreground transition-colors">Contests</Link></li>
                            <li><Link to="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} CodeArena. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
