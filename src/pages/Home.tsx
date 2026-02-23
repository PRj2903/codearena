import { motion } from 'framer-motion';
import { ArrowRight, Code, Trophy, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Background } from '../components/layout/Background';

const Home = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            <Background />

            {/* Hero Section */}
            <section className="relative py-20 md:py-32 z-10">
                <div className="container relative mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block"
                        >
                            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20 mb-8 backdrop-blur-sm">
                                🚀 The Next Gen Coding Platform
                            </span>
                        </motion.div>

                        <h1 className="text-[4rem] md:text-[7.5rem] leading-[1.1] font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] via-[#8a2be2] to-[#c786ed] drop-shadow-[0_0_35px_rgba(59,130,246,0.6)]">
                            CODE ARENA
                        </h1>
                        <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-tight mb-6 text-white/95">
                            Master the Art of <span className="text-[#20b2aa]">Algorithms</span>
                        </h2>

                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                            Join millions of developers solving complex problems, competing in <br className="hidden md:block" />
                            <span className="text-blue-400 font-semibold">real-time battles</span>, and landing dream jobs at top tech companies.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/problems">
                                <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105 active:scale-95 text-white border-0 rounded-md font-semibold">
                                    Start Coding <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/contest">
                                <Button variant="outline" size="lg" className="h-[54px] px-8 text-lg backdrop-blur-sm bg-transparent border border-[#20b2aa] text-white hover:bg-[#20b2aa]/10 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(32,178,170,0.3)] rounded-md font-semibold">
                                    View Contests
                                </Button>
                            </Link>
                        </div>

                        {/* Mock IDE Illustration */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mt-16 mx-auto max-w-3xl relative"
                        >
                            {/* Glow behind IDE */}
                            <div className="absolute inset-x-10 inset-y-10 bg-gradient-to-b from-[#20b2aa]/20 to-blue-600/20 blur-[80px] -z-10 rounded-full" />

                            <div className="bg-[#0f172a]/90 rounded-xl border border-gray-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden text-left relative z-10 backdrop-blur-xl">
                                <div className="flex items-center px-4 py-3 bg-[#1e293b]/80 border-b border-gray-700/50">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                </div>
                                <div className="p-6 font-mono text-[13px] sm:text-sm overflow-x-auto text-gray-300">
                                    <div className="flex">
                                        <div className="text-gray-600 pr-6 select-none flex flex-col hidden sm:flex">
                                            {Array.from({ length: 11 }).map((_, i) => <span key={i}>{i + 1}</span>)}
                                        </div>
                                        <div className="flex-1">
                                            <pre className="m-0 leading-relaxed font-bold">
                                                <span className="text-[#fca5a5]">#include</span> <span className="text-[#a7f3d0]">&lt;bits/stdc++.h&gt;</span>
                                                <span className="text-[#fca5a5]">using</span> <span className="text-[#93c5fd]">namespace</span> <span className="text-[#fde047]">std</span><span className="text-[#64748b]">;</span>

                                                <span className="text-[#93c5fd]">int</span> <span className="text-[#fef08a]">main</span><span className="text-[#94a3b8]">() {"{"}</span>
                                                <span className="text-[#93c5fd]">int</span> <span className="text-[#67e8f9]">system_val</span> <span className="text-[#fca5a5]">=</span> <span className="text-[#fef08a]">setIntIn</span><span className="text-[#94a3b8]">(optIn);</span>
                                                <span className="text-[#fca5a5]">for</span> <span className="text-[#94a3b8]">(</span><span className="text-[#93c5fd]">int</span> <span className="text-[#67e8f9]">i</span> <span className="text-[#fca5a5]">=</span> <span className="text-[#c084fc]">0</span><span className="text-[#94a3b8]">; i &lt; sum_obj; i++) {"{"}</span>
                                                <span className="text-[#67e8f9]">system_val</span> <span className="text-[#fca5a5]">=</span> <span className="text-[#fef08a]">setIntIn</span><span className="text-[#94a3b8]">(i + valL +</span> <span className="text-[#c084fc]">1</span> <span className="text-[#94a3b8]"> + i);</span>
                                                <span className="text-[#94a3b8]">{"}"}</span>
                                                <span className="text-[#fca5a5]">return</span> <span className="text-[#c084fc]">0</span><span className="text-[#94a3b8]">;</span>
                                                <span className="text-[#94a3b8]">{"}"}</span>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <motion.div variants={item}>
                            <Card className="h-full bg-background/40 backdrop-blur-md border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                                        <Code className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <CardTitle className="text-xl">500+ Problems</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-muted-foreground/80">
                                        From easy to hard, master data structures and algorithms with our curated library.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={item}>
                            <Card className="h-full bg-background/40 backdrop-blur-md border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                                        <Zap className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <CardTitle className="text-xl">Fast Compiler</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-muted-foreground/80">
                                        Run your code instantly in 20+ languages with our high-performance execution engine.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={item}>
                            <Card className="h-full bg-background/40 backdrop-blur-md border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                                        <Trophy className="h-6 w-6 text-pink-400" />
                                    </div>
                                    <CardTitle className="text-xl">Weekly Contests</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-muted-foreground/80">
                                        Compete with developers worldwide and climb the global leaderboard.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={item}>
                            <Card className="h-full bg-background/40 backdrop-blur-md border-white/10 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                                        <Users className="h-6 w-6 text-green-400" />
                                    </div>
                                    <CardTitle className="text-xl">Community</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-muted-foreground/80">
                                        Discuss solutions, share insights, and learn from the best minds in the industry.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};


export default Home;
