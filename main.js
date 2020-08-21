const fs = require('fs');
const createGraph = require('./createGraph');

const graph = createGraph('data.txt');

fs.writeFile('graph.json', JSON.stringify(graph), (err) => {
    if (err) throw err;
    console.log('Saved!');
})