import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Circle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

// Mock Data
const PROBLEMS = [
    { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: "48.2%", status: "Solved", tags: ["Array", "Hash Table"] },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", acceptance: "39.5%", status: "Todo", tags: ["Linked List", "Math"] },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "33.8%", status: "Todo", tags: ["String", "Sliding Window"] },
    { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: "35.2%", status: "Attempted", tags: ["Array", "Binary Search"] },
    { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", acceptance: "32.1%", status: "Todo", tags: ["String", "DP"] },
    { id: 6, title: "Zigzag Conversion", difficulty: "Medium", acceptance: "42.6%", status: "Solved", tags: ["String"] },
    { id: 7, title: "Reverse Integer", difficulty: "Medium", acceptance: "27.3%", status: "Todo", tags: ["Math"] },
    { id: 8, title: "String to Integer (atoi)", difficulty: "Medium", acceptance: "16.7%", status: "Attempted", tags: ["String"] },
    { id: 9, title: "Palindrome Number", difficulty: "Easy", acceptance: "52.9%", status: "Solved", tags: ["Math"] },
    { id: 10, title: "Regular Expression Matching", difficulty: "Hard", acceptance: "28.0%", status: "Todo", tags: ["String", "DP"] },
];

const ProblemList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

    const filteredProblems = PROBLEMS.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = filterDifficulty === 'All' || problem.difficulty === filterDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    // Custom styling for difficulty since Badge variants are limited in my props
    const getDifficultyStyle = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return "text-green-500 bg-green-500/10 hover:bg-green-500/20";
            case 'Medium': return "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20";
            case 'Hard': return "text-red-500 bg-red-500/10 hover:bg-red-500/20";
            default: return "";
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold mb-4">Problems</h1>

                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search questions..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                            <Button
                                key={diff}
                                variant={filterDifficulty === diff ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setFilterDifficulty(diff as any)}
                            >
                                {diff}
                            </Button>
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="grid gap-4">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-muted-foreground border-b border-border/50">
                    <div className="col-span-1">Status</div>
                    <div className="col-span-6 md:col-span-5">Title</div>
                    <div className="col-span-2 hidden md:block">Acceptance</div>
                    <div className="col-span-3 md:col-span-2">Difficulty</div>
                    <div className="col-span-2 hidden md:block text-right">Action</div>
                </div>

                {filteredProblems.map((problem, index) => (
                    <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-accent/5 transition-colors border-border/40">
                            <div className="col-span-1">
                                {problem.status === 'Solved' ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : problem.status === 'Attempted' ? (
                                    <Circle className="h-5 w-5 text-yellow-500" />
                                ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground/30" />
                                )}
                            </div>
                            <div className="col-span-6 md:col-span-5 font-medium hover:text-blue-500 transition-colors cursor-pointer">
                                <Link to={`/problems/${problem.id}`} className="block">
                                    {problem.id}. {problem.title}
                                </Link>
                                <div className="flex gap-2 mt-1 md:hidden">
                                    {problem.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-xs text-muted-foreground bg-accent px-1.5 py-0.5 rounded">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-2 hidden md:block text-muted-foreground text-sm">
                                {problem.acceptance}
                            </div>
                            <div className="col-span-3 md:col-span-2">
                                <Badge variant="outline" className={cn("border-0 font-medium", getDifficultyStyle(problem.difficulty))}>
                                    {problem.difficulty}
                                </Badge>
                            </div>
                            <div className="col-span-2 hidden md:block text-right">
                                <Link to={`/problems/${problem.id}`}>
                                    <Button variant="ghost" size="sm">Solve</Button>
                                </Link>
                            </div>
                        </Card>
                    </motion.div>
                ))}

                {filteredProblems.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No problems found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemList;
