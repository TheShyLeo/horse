import http2 from 'http2'
const https = require('https');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
async function requestHttp2(options, credentials) {
    let method = options.method || 'GET';
    let url = options.url;
    let port = credentials.port;
    let username = 'riot';
    let password = credentials.password;
    let authorization = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    let status;
    const client = http2.connect('https://127.0.0.1:' + port);
    client.on('error', (err) => console.error(err));

    const req = client.request({
        ':path': url,
        ':method': method,
        "authorization": authorization
    });
    req.setEncoding('utf8');
    let data = "";
    req.on('data', (chunk) => { data += chunk; });
    req.end();
    return new Promise((resolve, reject) => {
        req.on('end', () => {
            let response = {}
            response.data = data === "" ? data : JSON.parse(data)
            response.ok = status === '200'
            resolve(response)
            client.close();
        });
    })
}
async function req(options, credentials) {
    let baseUrl = `https://riot:${credentials.password}@127.0.0.1:${credentials.port}`
    let url = baseUrl + options.url;
    const hasBody = options.method !== 'GET' && options.body !== undefined;
    let res = await fetch(url, {
        method: options.method,
        body: hasBody ? JSON.stringify(options.body) : undefined,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + Buffer.from(`riot:${credentials.password}`).toString('base64')
        },
        agent: httpsAgent
    });
    return res;
}
export default {
    requestHttp2,
    req
}
