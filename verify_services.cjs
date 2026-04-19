const http = require('http');

async function checkService(url, name) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      console.log(`[${name}] Status: ${res.statusCode}`);
      resolve(true);
    }).on('error', (err) => {
      console.log(`[${name}] Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  console.log('--- Service Verification ---');
  await checkService('http://localhost:5000/api/products', 'Backend API');
  await checkService('http://localhost:3000', 'Frontend App');
}

main();
