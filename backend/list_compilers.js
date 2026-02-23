const https = require('https');

https.get('https://wandbox.org/api/list.json', (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        try {
            const data = JSON.parse(body);
            const java = data.filter(c => c.language === 'Java');
            const cpp = data.filter(c => c.language === 'C++');
            const python = data.filter(c => c.language === 'Python');
            const js = data.filter(c => c.language === 'JavaScript' || c.language === 'Node.js');

            console.log("Java:", java.map(c => c.name));
            console.log("C++:", cpp.map(c => c.name));
            console.log("Python:", python.map(c => c.name));
            console.log("JS:", js.map(c => c.name));

        } catch (e) { console.error(e); }
    });
}).on('error', console.error);
