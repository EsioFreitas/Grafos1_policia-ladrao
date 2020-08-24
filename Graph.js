const Node = require('./Node');

class Graph {
    constructor(undirected = true) {
        this.undirected = undirected;
        this.nodes = {};
    }

    addNode(value) {
        this.nodes[value] = {};
    }

    removeNode(value) {
        if (this.nodes[value]) {
            delete this.nodes[value];
        }
        Object.keys(this.nodes).forEach(node => {
            if(this.nodes[node][value]) delete this.nodes[node][value];
        });
    }

    getNode(value) {
        return this.nodes[value];
    }

    addEdge(value1, value2, title) {
        const node1 = this.getNode(value1);
        const node2 = this.getNode(value2);

        if (node1[value2]) {
            node1[value2].push(title);
        } else {
            node1[value2] = [title];
        }

        if (this.undirected) {
            if (node2[value1]) {
                node2[value1].push(title);
            } else {
                node2[value1] = [title];
            }
        }
    }
}

module.exports = Graph;