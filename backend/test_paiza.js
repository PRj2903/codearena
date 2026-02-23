const https = require('https');

function createPaizaRunner(code, language) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ source_code: code, language: language, api_key: "guest" });
        const req = https.request('http://api.paiza.io:80/runners/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        }, res => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

function getPaizaDetails(id) {
    return new Promise((resolve, reject) => {
        const req = https.request(`http://api.paiza.io:80/runners/get_details?id=${id}&api_key=guest`, res => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });
        req.on('error', reject);
        req.end();
    });
}

async function run() {
    const create = await createPaizaRunner("print('hello from paiza')", "python3");
    console.log("Create:", create);

    // Poll
    let details;
    while (true) {
        await new Promise(r => setTimeout(r, 1000));
        details = await getPaizaDetails(create.id);
        if (details.status === "completed") break;
    }
    console.log("Details:", details);
}
run().catch(console.error);
