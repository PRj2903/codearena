const https = require('https');

function wandbox(code, compiler) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ code, compiler, save: false });
        const req = https.request('https://wandbox.org/api/compile.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data),
                'User-Agent': 'Mozilla/5.0'
            }
        }, res => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    console.log("Response:", body);
                    resolve(JSON.parse(body));
                } catch (e) { reject(e); }
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

wandbox('print("Hello World")', 'cpython-head').catch(console.error);
