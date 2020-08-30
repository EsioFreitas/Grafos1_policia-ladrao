import Graph from './Graph';

export default function createGraoh(tabuleiro, largura) {
  const graph = new Graph();

  tabuleiro.forEach((_, index) => {
    graph.addNode(index);
  });

  tabuleiro.forEach((position, index) => {
    const collumn = index % largura;
    const row = Math.floor(index / largura);

    if (position !== 1) {
      if (collumn !== 0) {
        // olha esquerda
        if (tabuleiro[index - 1] !== 1) {
          graph.addEdge(index, index - 1);
        }
      }
      if (collumn !== largura - 1) {
        //olha direita
        if (tabuleiro[index + 1] !== 1) {
          graph.addEdge(index, index + 1);
        }
      }
      if (row !== 0) {
        // olha acima
        if (tabuleiro[index - largura] !== 1) {
          graph.addEdge(index, index - largura);
        }
      }
      if (row !== tabuleiro.length / largura - 1) {
        // olha abaixo
        if (tabuleiro[index + largura] !== 1) {
          graph.addEdge(index, index + largura);
        }
      }
    }
  });
  return graph;
}
