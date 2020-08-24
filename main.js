const fs = require('fs');
const createGraph = require('./createGraph');

const graph = createGraph('data.txt');
fs.appendFile('graph.txt', `{"undirected": ${graph.undirected}, "nodes": {\n`, (err) => {if(err) throw err});
Object.keys(graph.nodes).forEach((node, index) => {
    const size = Object.keys(graph.nodes).length;
    const nodeName = JSON.stringify(node);
    const nodeValue = JSON.stringify(graph.nodes[node]);
    console.log(index + '/' + size)
    if(index + 1 === size) {
        fs.appendFile('graph.txt', `${nodeName}: ${nodeValue}\n`, (err) => {if(err) throw err})
    } else {
        fs.appendFile('graph.txt', `${nodeName}: ${nodeValue},\n`, (err) => {if(err) throw err})
    }
})
fs.appendFile('graph.txt', '}}', (err) => {if(err) throw err})