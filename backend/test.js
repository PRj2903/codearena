async function test() {
    try {
        const res = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: 'python',
                version: '3.10.0',
                files: [{ content: 'print(1)' }]
            })
        });
        const text = await res.text();
        console.log("STATUS:", res.status);
        console.log("RESPONSE:", text);
    } catch (e) {
        console.error(e);
    }
}
test();
