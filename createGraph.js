const fs = require('fs');
const Graph = require('./Graph');

function createGraph(file) {
    const graph = new Graph();

    const lines = fs.readFileSync(file, 'utf-8').split('\n')
    
    lines.forEach(line => {
        const movie = JSON.parse(line);
        let people = [];

        if(movie.cast) {
            const fixedPeople = fixPeople(movie.cast);
            people = people.concat(fixedPeople);
        }

        if(movie.producers) {
            const fixedPeople = fixPeople(movie.producers);
            people = people.concat(fixedPeople);
        }

        if(movie.directors) {
            const fixedPeople = fixPeople(movie.directors);
            people = people.concat(fixedPeople);
        }

        people.forEach(person => {
            if(graph.getNode(person) === undefined) {
                graph.addNode(person);
            }
        })
        people.forEach(person => {
            people.forEach(personToAdd => {
                if (personToAdd !== person) {
                    graph.addEdge(person, personToAdd, { movie: movie.title });
                }
            })
        })
    })
    return graph;
}

function fixPeople(people) {
    const fixed = [];
    people.forEach((person) => {
        person = person.replace('[[', '');
        person = person.replace(']]', '');
        fixed.push(person);
    })
    return fixed;
}

module.exports = createGraph;