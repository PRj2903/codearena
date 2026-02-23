import { motion } from "framer-motion";

export const Background = () => {
    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-[#030014] overflow-hidden">
            {/* Deep Space Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d0b3b] via-[#0b0416] to-[#030014]"></div>

            {/* Grid Pattern with subtle glow */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* Glowing Nebulae */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen pointer-events-none"></div>

            {/* Animated Orbs */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`orb-${i}`}
                    animate={{
                        y: [0, Math.random() * 100 - 50, 0],
                        x: [0, Math.random() * 100 - 50, 0],
                        scale: [1, Math.random() * 0.5 + 1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5,
                    }}
                    className={`absolute rounded-full mix-blend-screen blur-3xl pointer-events-none`}
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 300 + 200}px`,
                        height: `${Math.random() * 300 + 200}px`,
                        backgroundColor: i % 2 === 0 ? 'rgba(56, 189, 248, 0.12)' : 'rgba(168, 85, 247, 0.12)',
                    }}
                />
            ))}

            {/* Twinkling Stars */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                        }}
                        animate={{
                            opacity: [0.1, 1, 0.1],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
