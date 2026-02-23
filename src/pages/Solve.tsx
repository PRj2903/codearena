import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor, { type Monaco } from '@monaco-editor/react';
import { Play, Send, CheckCircle, Settings, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';

const BOILERPLATES: Record<string, string> = {
    cpp: `// C++ Solution
#include <vector>
#include <iostream>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`,
    java: `// Java Solution
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
    python: `# Python Solution
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        return []`,
    javascript: `// JavaScript Solution
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
    return [];
};`
};

const Solve = () => {
    const { id } = useParams();
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState(BOILERPLATES['cpp']);
    const [output, setOutput] = useState<string | null>(null);
    const [latency, setLatency] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState<'output' | 'testcase' | null>(null);
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

    useEffect(() => {
        setCode(BOILERPLATES[language] || '');
    }, [language]);

    const handleRun = async () => {
        setIsRunning(true);
        setStatus('running');
        setActiveTab('output');
        setOutput('Compiling & Running...');
        setLatency(null);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8081';
            const response = await fetch(`${apiUrl}/api/run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language,
                    code
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to execute code');
            }

            const data = await response.json();
            setOutput(data.output);
            setLatency(data.latency);
            setStatus(data.status === 'success' ? 'success' : 'error');
        } catch (error) {
            setOutput('Error: Failed to connect to backend server. Make sure it is running.');
            setStatus('error');
        } finally {
            setIsRunning(false);
        }
    };

    const handleEditorDidMount = (_editor: any, monaco: Monaco) => {
        monaco.editor.defineTheme('arena-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'c678dd' },
                { token: 'string', foreground: '98c379' },
                { token: 'number', foreground: 'd19a66' },
                { token: 'type', foreground: '56b6c2' },
                { token: 'class', foreground: 'e5c07b' },
                { token: 'function', foreground: '61afef' },
            ],
            colors: {
                'editor.background': '#0f172a',
                'editor.foreground': '#abb2bf',
                'editor.lineHighlightBackground': '#1e293b50',
                'editorCursor.foreground': '#528bff',
                'editorWhitespace.foreground': '#3b4048',
                'editorIndentGuide.background': '#1e293b',
                'editorIndentGuide.activeBackground': '#333842',
                'editorLineNumber.foreground': '#475569',
                'editorLineNumber.activeForeground': '#94a3b8',
            }
        });
        monaco.editor.setTheme('arena-dark');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
            {/* Top Bar */}
            <div className="bg-background border-b border-border/40 px-4 py-2 flex justify-between items-center h-14 shrink-0">
                <div className="flex items-center space-x-4">
                    <h2 className="font-semibold">Problem {id}: Two Sum</h2>
                    <Badge variant="success" className="bg-green-500/10 text-green-500">Easy</Badge>
                </div>
                <div className="flex items-center space-x-2">
                    <Button size="sm" variant="secondary" onClick={handleRun} isLoading={isRunning} disabled={isRunning}>
                        <Play className="mr-2 h-4 w-4" /> Run
                    </Button>
                    <Button size="sm" onClick={handleRun} disabled={isRunning}>
                        <Send className="mr-2 h-4 w-4" /> Submit
                    </Button>
                </div>
            </div>

            <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
                {/* Left Panel - Description */}
                <div className="w-full md:w-1/2 lg:w-2/5 p-4 overflow-y-auto border-b md:border-b-0 md:border-r border-border/40 bg-card/30 scrollbar-thin scrollbar-thumb-border">
                    <div className="prose prose-invert max-w-none">
                        <h3>Description</h3>
                        <p>
                            Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.
                        </p>
                        <p>
                            You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the <em>same</em> element twice.
                        </p>
                        <p>You can return the answer in any order.</p>

                        <h4>Example 1:</h4>
                        <pre className="bg-muted p-3 rounded-lg text-sm font-mono leading-relaxed">
                            Input: nums = [2,7,11,15], target = 9{"\n"}
                            Output: [0,1]{"\n"}
                            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                        </pre>

                        <h4>Example 2:</h4>
                        <pre className="bg-muted p-3 rounded-lg text-sm font-mono leading-relaxed">
                            Input: nums = [3,2,4], target = 6{"\n"}
                            Output: [1,2]
                        </pre>

                        <h4>Constraints:</h4>
                        <ul className="text-sm text-muted-foreground">
                            <li>2 &lt;= nums.length &lt;= 10^4</li>
                            <li>-10^9 &lt;= nums[i] &lt;= 10^9</li>
                            <li>-10^9 &lt;= target &lt;= 10^9</li>
                        </ul>
                    </div>
                </div>

                {/* Right Panel - Editor & Output */}
                <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col h-full bg-[#0f172a] relative">
                    {/* Editor Toolbar */}
                    <div className="flex items-center justify-between px-6 py-3 bg-[#0f172a] border-b border-white/5 backdrop-blur-xl z-20">
                        <div className="relative">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="appearance-none bg-[#1e293b] text-blue-400 font-semibold text-sm px-4 py-1.5 pr-8 rounded-md border border-white/10 focus:outline-none focus:border-blue-500/50 hover:bg-[#1e293b]/80 transition-colors shadow-lg shadow-black/20"
                            >
                                <option value="cpp">C++</option>
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                                <Settings className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-grow relative">
                        <Editor
                            height="100%"
                            defaultLanguage="cpp"
                            language={language}
                            theme="arena-dark"
                            value={code}
                            onChange={(val) => setCode(val || '')}
                            onMount={handleEditorDidMount}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 15,
                                lineHeight: 24,
                                letterSpacing: 0.5,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                                lineNumbersMinChars: 4,
                                lineDecorationsWidth: 20,
                                fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                                fontLigatures: true,
                                renderValidationDecorations: "off",
                                smoothScrolling: true,
                                cursorBlinking: "smooth",
                                cursorSmoothCaretAnimation: "on",
                                formatOnPaste: true,
                                roundedSelection: true,
                            }}
                            className="absolute inset-0 z-10"
                        />
                    </div>

                    {/* Output/Console Panel */}
                    <motion.div
                        initial={{ height: "48px" }}
                        animate={{ height: activeTab ? "350px" : "48px" }}
                        className="bg-[#0f172a] border-t border-white/10 flex flex-col z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]"
                    >
                        {/* Console Tabs */}
                        <div className="flex items-center px-4 bg-[#0f172a] border-b border-white/5 h-12 select-none">
                            <button
                                onClick={() => setActiveTab(activeTab === 'testcase' ? null : 'testcase')}
                                className={`px-5 h-full text-sm font-semibold border-b-2 transition-all duration-300 ${activeTab === 'testcase' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                            >
                                Test Cases
                            </button>
                            <button
                                onClick={() => setActiveTab(activeTab === 'output' ? null : 'output')}
                                className={`px-5 h-full text-sm font-semibold border-b-2 transition-all duration-300 ${activeTab === 'output' ? 'border-teal-400 text-teal-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                            >
                                Console
                            </button>
                            <div className="flex-grow" />
                            {status === 'success' && latency && (
                                <span className="text-slate-400 text-xs mr-4 hidden sm:inline-block bg-[#1e293b] px-3 py-1 rounded-full border border-white/5">
                                    Runtime: <span className="text-teal-300 font-bold">{latency} ms</span>
                                </span>
                            )}
                            {status === 'success' && <div className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20 flex items-center shadow-[0_0_10px_rgba(16,185,129,0.2)] font-semibold mr-3"><CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Accepted</div>}
                            {status === 'running' && <div className="bg-amber-500/10 text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-500/20 flex items-center font-semibold mr-3"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-2" /> Running</div>}
                            <button
                                onClick={() => setActiveTab(activeTab ? null : 'testcase')}
                                className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 transition-colors"
                            >
                                {activeTab ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                            </button>
                        </div>

                        {/* Console Content */}
                        <div className="flex-grow overflow-auto p-6 font-mono text-sm bg-gradient-to-b from-[#0f172a] to-[#0b1120]">
                            {activeTab === 'testcase' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Case 1</div>
                                        <div className="bg-[#1e293b] p-4 rounded-lg border border-white/5 space-y-3 shadow-inner">
                                            <div>
                                                <span className="text-slate-400 text-xs block mb-1">Input</span>
                                                <code className="text-blue-300 font-medium">nums = [2,7,11,15], target = 9</code>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 text-xs block mb-1">Expected Output</span>
                                                <code className="text-emerald-300 font-medium">[0,1]</code>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Case 2</div>
                                        <div className="bg-[#1e293b] p-4 rounded-lg border border-white/5 space-y-3 shadow-inner">
                                            <div>
                                                <span className="text-slate-400 text-xs block mb-1">Input</span>
                                                <code className="text-blue-300 font-medium">nums = [3,2,4], target = 6</code>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 text-xs block mb-1">Expected Output</span>
                                                <code className="text-emerald-300 font-medium">[1,2]</code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'output' && (
                                <div className="h-full">
                                    {!output ? (
                                        <div className="h-full flex items-center justify-center text-slate-600 italic">
                                            Run your code to see output...
                                        </div>
                                    ) : (
                                        <pre className={`whitespace-pre-wrap p-4 rounded-lg bg-[#1e293b]/50 border border-white/5 ${status === 'error' ? 'text-rose-400' : 'text-slate-300'}`}>
                                            {output}
                                        </pre>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Solve;
