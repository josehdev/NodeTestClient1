const http = require('http');

let port = '8080';
let url = `http://localhost:${port}`;

console.log(`Rev1.0 - Retrieving data from ${url}...`);

function requestHandler(res) {
    if (res.statusCode !== 200) {
        console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
        res.resume();
        return;
      }    

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
    
      res.on('close', () => {
        console.log(data);
    });      
};

function sendRequest() {
    let request = http.get(url, requestHandler);
    request.on('error', (err) => {
        console.error(`Encountered an error trying to make a request: ${err.message}`);
    });
};

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function requestLoop() {
    while(true) {
        sendRequest();
        await delay(5000);
    }
}

requestLoop();
