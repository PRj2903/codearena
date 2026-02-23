import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Trophy, Flame, Target, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useAuth();

    // Mock Data for demonstration since we only have Auth and no actual DB rows yet
    const userStats = {
        username: user?.user_metadata?.username || user?.user_metadata?.name || user?.email?.split('@')[0] || "Guest",
        rank: 14205,
        solved: {
            easy: 45,
            medium: 28,
            hard: 7,
            total: 80
        },
        streak: 12
    };

    const recentActivity = [
        { id: 1, problem: "Two Sum", status: "Solved", date: "2 mins ago" },
        { id: 2, problem: "Median of Two Sorted Arrays", status: "Attempted", date: "1 hour ago" },
        { id: 3, problem: "Zigzag Conversion", status: "Solved", date: "5 hours ago" },
        { id: 4, problem: "Add Two Numbers", status: "Solved", date: "1 day ago" },
    ];

    // Generate heatmap data (mock)
    const heatmapData = Array.from({ length: 12 * 7 }).map((_, i) => ({
        date: i,
        count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0
    }));

    const getHeatmapColor = (count: number) => {
        if (count === 0) return "bg-accent/40";
        if (count === 1) return "bg-green-900";
        if (count === 2) return "bg-green-700";
        if (count === 3) return "bg-green-500";
        return "bg-green-400";
    };

    if (user === undefined) {
        return (
            <div className="h-[calc(100vh-64px)] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header - Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8"
            >
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/20 uppercase">
                    {userStats.username.substring(0, 2)}
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold">{userStats.username}</h1>
                    <p className="text-sm text-slate-400 h-6">
                        {user?.email}
                    </p>
                    <p className="text-muted-foreground mt-3">Global Rank: #{userStats.rank.toLocaleString()}</p>
                    <div className="flex gap-2 mt-3 justify-center md:justify-start">
                        <Badge variant="secondary" className="gap-1"><Flame className="h-3 w-3 text-orange-500" /> {userStats.streak} Day Streak</Badge>
                        <Badge variant="outline" className="gap-1"><Trophy className="h-3 w-3 text-yellow-500" /> Contest Rating: 1540</Badge>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column = Stats */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-1 space-y-6"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Solved Problems</CardTitle>
                            <CardDescription>Total: {userStats.solved.total}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-500 font-medium">Easy</span>
                                    <span className="text-muted-foreground">{userStats.solved.easy} / 200</span>
                                </div>
                                <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: `${(userStats.solved.easy / 200) * 100}%` }} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-yellow-500 font-medium">Medium</span>
                                    <span className="text-muted-foreground">{userStats.solved.medium} / 400</span>
                                </div>
                                <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: `${(userStats.solved.medium / 400) * 100}%` }} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-red-500 font-medium">Hard</span>
                                    <span className="text-muted-foreground">{userStats.solved.hard} / 100</span>
                                </div>
                                <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500" style={{ width: `${(userStats.solved.hard / 100) * 100}%` }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {['Arrays', 'DP', 'Graphs', 'Trees', 'Math', 'Strings'].map(skill => (
                                <Badge key={skill} variant="secondary" className="cursor-default hover:bg-secondary/80">{skill}</Badge>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Right Column = Activity & Heatmap */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-1 md:col-span-2 space-y-6"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Submission Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Heatmap Grid */}
                            <div className="flex gap-1 overflow-x-auto pb-2">
                                {Array.from({ length: 12 }).map((_, weekIndex) => (
                                    <div key={weekIndex} className="grid grid-rows-7 gap-1">
                                        {heatmapData.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day) => (
                                            <div
                                                key={day.date}
                                                className={cn("h-3 w-3 rounded-sm", getHeatmapColor(day.count))}
                                                title={`${day.count} submissions`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Last 3 months</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><Target className="h-5 w-5" /> Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-border/40 pb-3 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium text-sm">{activity.problem}</p>
                                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                                        </div>
                                        <Badge variant={activity.status === 'Solved' ? 'default' : 'secondary'} className={activity.status === 'Solved' ? 'bg-green-500/15 text-green-500 hover:bg-green-500/20' : ''}>
                                            {activity.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
