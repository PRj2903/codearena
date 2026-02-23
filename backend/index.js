const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8081;

// Wrapper functions
function wrapJava(userCode) {
    userCode = userCode.replace("public class Solution", "class Solution");
    return `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        int[] res1 = sol.twoSum(nums1, target1);
        System.out.println("Test Case 1:");
        System.out.println("Input: nums = [2, 7, 11, 15], target = 9");
        System.out.println("Output: " + Arrays.toString(res1));
        boolean pass1 = Arrays.equals(res1, new int[]{0, 1});
        System.out.println("Result: " + (pass1 ? "Passed ✅" : "Failed ❌"));
        
        int[] nums2 = {3, 2, 4};
        int target2 = 6;
        int[] res2 = sol.twoSum(nums2, target2);
        System.out.println("\\nTest Case 2:");
        System.out.println("Input: nums = [3, 2, 4], target = 6");
        System.out.println("Output: " + Arrays.toString(res2));
        boolean pass2 = Arrays.equals(res2, new int[]{1, 2});
        System.out.println("Result: " + (pass2 ? "Passed ✅" : "Failed ❌"));

        if (pass1 && pass2) System.out.println("\\nAll Test Cases Passed");
    }
}

${userCode}
`;
}

function wrapPython(userCode) {
    return `from typing import List
${userCode}

if __name__ == '__main__':
    sol = Solution()
    nums1 = [2, 7, 11, 15]
    target1 = 9
    res1 = sol.twoSum(nums1, target1)
    print('Test Case 1:')
    print(f'Input: nums = {nums1}, target = {target1}')
    print(f'Output: {res1}')
    pass1 = (res1 == [0, 1])
    print(f'Result: {"Passed ✅" if pass1 else "Failed ❌"}')
    
    nums2 = [3, 2, 4]
    target2 = 6
    res2 = sol.twoSum(nums2, target2)
    print('\\nTest Case 2:')
    print(f'Input: nums = {nums2}, target = {target2}')
    print(f'Output: {res2}')
    pass2 = (res2 == [1, 2])
    print(f'Result: {"Passed ✅" if pass2 else "Failed ❌"}')
    
    if pass1 and pass2: print('\\nAll Test Cases Passed')
`;
}

function wrapCpp(userCode) {
    return `#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>

void printVec(const std::vector<int>& v) { 
    std::cout << "["; 
    for(size_t i=0; i<v.size(); ++i) std::cout << v[i] << (i<v.size()-1 ? ", " : ""); 
    std::cout << "]"; 
}

${userCode}

int main() {
    Solution sol;
    std::vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    std::vector<int> res1 = sol.twoSum(nums1, target1);
    std::cout << "Test Case 1:\\n";
    std::cout << "Input: nums = [2, 7, 11, 15], target = 9\\n";
    std::cout << "Output: "; printVec(res1); std::cout << "\\n";
    bool pass1 = (res1 == std::vector<int>{0, 1});
    std::cout << "Result: " << (pass1 ? "Passed ✅" : "Failed ❌") << "\\n";
    
    std::vector<int> nums2 = {3, 2, 4};
    int target2 = 6;
    std::vector<int> res2 = sol.twoSum(nums2, target2);
    std::cout << "\\nTest Case 2:\\n";
    std::cout << "Input: nums = [3, 2, 4], target = 6\\n";
    std::cout << "Output: "; printVec(res2); std::cout << "\\n";
    bool pass2 = (res2 == std::vector<int>{1, 2});
    std::cout << "Result: " << (pass2 ? "Passed ✅" : "Failed ❌") << "\\n";
    
    if (pass1 && pass2) std::cout << "\\nAll Test Cases Passed" << std::endl;
    return 0;
}
`;
}

function wrapJavascript(userCode) {
    return `${userCode}

const sol = typeof twoSum !== 'undefined' ? twoSum : null;
if (sol) {
    try {
        const nums1 = [2, 7, 11, 15];
        const target1 = 9;
        const res1 = sol(nums1, target1);
        console.log('Test Case 1:');
        console.log('Input: nums = [2, 7, 11, 15], target = 9');
        console.log('Output:', JSON.stringify(res1));
        const pass1 = JSON.stringify(res1) === JSON.stringify([0, 1]);
        console.log('Result:', pass1 ? 'Passed ✅' : 'Failed ❌');
        
        const nums2 = [3, 2, 4];
        const target2 = 6;
        const res2 = sol(nums2, target2);
        console.log('\\nTest Case 2:');
        console.log('Input: nums = [3, 2, 4], target = 6');
        console.log('Output:', JSON.stringify(res2));
        const pass2 = JSON.stringify(res2) === JSON.stringify([1, 2]);
        console.log('Result:', pass2 ? 'Passed ✅' : 'Failed ❌');
        
        if (pass1 && pass2) console.log('\\nAll Test Cases Passed');
    } catch (e) {
        console.log(e);
    }
} else {
    console.log("Could not find twoSum function.");
}
`;
}

const WANDBOX_COMPILERS = {
    java: "openjdk-jdk-22+36",
    python: "cpython-head",
    cpp: "gcc-head",
    javascript: "nodejs-20.17.0"
};

app.post('/api/run', async (req, res) => {
    try {
        const { language, code } = req.body;

        if (!language || !code) {
            return res.status(400).json({ error: 'Language and code are required' });
        }

        let wrappedCode = code;
        let compiler = WANDBOX_COMPILERS[language.toLowerCase()];

        if (!compiler) {
            return res.json({ output: "Unsupported language: " + language, status: "error" });
        }

        switch (language.toLowerCase()) {
            case "java": wrappedCode = wrapJava(code); break;
            case "python": wrappedCode = wrapPython(code); break;
            case "cpp": wrappedCode = wrapCpp(code); break;
            case "javascript": wrappedCode = wrapJavascript(code); break;
        }

        // Execute via Wandbox API
        const startTime = process.hrtime();
        try {
            const response = await fetch('https://wandbox.org/api/compile.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
                body: JSON.stringify({
                    compiler: compiler,
                    code: wrappedCode,
                    save: false
                })
            });

            const diff = process.hrtime(startTime);
            const latencyMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(0);

            if (!response.ok) {
                return res.json({ output: "Execution Engine Error: " + response.statusText, status: "error" });
            }

            const data = await response.json();
            let output = "";
            let status = "error";

            if (data.compiler_error) {
                output = "Compilation Error:\n" + data.compiler_error;
            } else if (data.program_error) {
                output = "Runtime Error:\n" + data.program_error;
                if (data.program_message) output += "\nConsole Output:\n" + data.program_message;
            } else {
                output = data.program_message || "Code compiled successfully with no output.";
                if (output.includes("All Test Cases Passed")) {
                    status = "success";
                }
            }

            res.json({ output, status, latency: latencyMs });

        } catch (fetchErr) {
            console.error(fetchErr);
            res.json({ output: "Failed to connect to execution engine.", status: "error" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ output: "Server Error: " + err.message, status: "error" });
    }
});

app.listen(PORT, () => {
    console.log(`Node Backend with Wandbox API is running on http://localhost:${PORT}`);
});
