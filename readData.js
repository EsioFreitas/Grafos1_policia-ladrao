const fs = require('fs');

function readData() {
    let finalString = '';
    const lines = fs.readFileSync('graph1.txt', 'utf-8').split('\n');
    lines.forEach(line => finalString += line);
    return JSON.parse(finalString);
}

console.log(readData())