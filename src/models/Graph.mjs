import LinkedList from "./LinkedList.mjs";

export default class Graph {
  #listaAdyacencia = [];
  #matrizAdyacencia = [];
  #map = new Map();
  

  constructor() {}

  addVertices(...vertices) {
      for (let value of vertices) {
          this.#listaAdyacencia.push(new LinkedList())
          this.#map.set(value,this.#listaAdyacencia.length-1)
      }
  }

  addVertex(value) {
      this.#listaAdyacencia.push(new LinkedList())
      this.#map.set(value,this.#listaAdyacencia.length-1)
      this.#matrizAdyacencia.push([])
      return value
  }

  addC(start, end, weight=1){
      if (this.#map.has(start) && this.#map.has(end)) {
          this.#listaAdyacencia[this.#map.get(start)].push(end,weight)
          this.#listaAdyacencia[this.#map.get(end)].push(start,weight)
          this.#matrizAdyacencia[this.#map.get(start)][this.#map.get(end)] = weight
          this.#matrizAdyacencia[this.#map.get(end)][this.#map.get(start)] = weight
          return true
      }
      return false;
  }


  bfs(startVertex, callback) {
    if (!this.#map.has(startVertex)) {
        return;
    }

    const visited = {};
    const queue = [startVertex];

    while (queue.length > 0) {
        const currentVertex = queue.shift();
        if (!visited[currentVertex]) {
            callback(currentVertex);
            visited[currentVertex] = true;

            const neighborsLinkedList = this.#listaAdyacencia[this.#map.get(currentVertex)];
            let current = neighborsLinkedList.getHead();

            while (current !== null) {
                const neighborVertex = current.value.node; // Aquí se accede a node
                if (!visited[neighborVertex]) {
                    queue.push(neighborVertex);
                }
                current = current.next;
            }
        }
    }
}



dfs(startVertex, callback) {
    if (!this.#map.has(startVertex)) {
        return;
    }

    const visited = {};
    const stack = [startVertex];

    while (stack.length > 0) {
        const currentVertex = stack.pop();
        if (!visited[currentVertex]) {
            callback(currentVertex);
            visited[currentVertex] = true;

            
            const neighborsLinkedList = this.#listaAdyacencia[this.#map.get(currentVertex)];
            let current = neighborsLinkedList.getHead();

            while (current !== null) {
                const neighborVertex = current.value.node; 
                if (!visited[neighborVertex]) {
                    stack.push(neighborVertex);
                }
                current = current.next;
            }
        }
    }
}

  dijkstra(verticeInit,imprimirMensaje) {
    // Valores iniciales
    let l = [];
    let v = [];
    let d = [];
    let dp = [];
    let v1;

    for (let i = 0; i < this.#matrizAdyacencia.length; i++) {
        for (let j = 0; j < this.#matrizAdyacencia.length; j++) {
            if (this.#matrizAdyacencia[i][j] === undefined) {
                this.#matrizAdyacencia[i][j] = 10000;
            }
        }            
    }
    
    for (let i = 0; i < this.#matrizAdyacencia.length; i++) {
        v[i] = i;
        d[i] = 10000;
    }

    v1 = this.#map.get(verticeInit);
    d[v1] = 0;
    dp = [...d];

    while (l.length !== this.#matrizAdyacencia.length) {
        let minimo = Math.min(...dp.filter(value => value !== null));
        let indice = dp.indexOf(minimo);
        l.push(minimo);

        for (let i = 0; i < d.length; i++) {
            if (this.#matrizAdyacencia[indice][i] !== 10000) { 
                let suma = d[indice] + this.#matrizAdyacencia[indice][i];
                if (d[i] > suma) {
                    d[i] = suma;
                }
            }
        }

        dp[indice] = null;
    }

    console.log(d)
    imprimirMensaje(d)
}

getVertices() {
    return this.#map.keys();
}

getNeighbors(vertex) {
    const index = this.#map.get(vertex);
    if (index !== undefined) {
        return this.#matrizAdyacencia[index];
    }
    return null;
}

numVertices() {
    return this.#map.size;
}

} 