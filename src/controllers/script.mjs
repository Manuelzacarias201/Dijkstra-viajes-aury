import Graph from "../models/Graph.mjs";

const graph = new Graph();

let btnAgregarDestino = document.getElementById("AgregarDestino");
let btnAgregarConexion = document.getElementById("AgregarRutaB");
let btnRecorridoProfundidad = document.getElementById("buttonProfundidad");
let btnRecorridoAnchura = document.getElementById("buttonAnchura")
let imprimir = document.getElementById("MostrarRecorridos")
let imprimir2 = document.getElementById("MostrarRecorridosAn")

let btnDijstra = document.getElementById("rutaMasCorta")
let imprimir3 = document.getElementById("mostrarRutaCorta")

btnAgregarDestino.addEventListener("click", () => {
    let terminal = document.getElementById("destinos").value;
    
    if (graph.addVertex(terminal)) {
        Swal.fire("Se registro", terminal, "success");
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se registro",
        });
    }
});

btnAgregarConexion.addEventListener("click", () => {
    let terminal = document.getElementById("terminalInicio").value;
    let destino = document.getElementById("destino").value;
    let peso = parseInt(document.getElementById("peso").value);
    
    if (graph.addC(terminal, destino, peso)) {
        Swal.fire("Ruta agregada");
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo agregar la ruta",
        });
    }
});

btnRecorridoProfundidad.addEventListener("click", () => {
    imprimir.innerHTML='';
    const vertices=[...graph.getVertices()][0]
    graph.dfs(vertices,(vertex) => {
        imprimir.innerHTML += `${vertex} `
        console.log(vertex)

    });
    Swal.fire("Ahora puede ver las terminales");




});
document.addEventListener('DOMContentLoaded',()=> {
    btnRecorridoAnchura.addEventListener("click", () => {


        imprimir2.innerHTML='';
        
        const vertices=[...graph.getVertices()][0]
        graph.bfs(vertices,(vertex) => {
            imprimir2.innerHTML += `${vertex} `
            console.log(vertex)
    
        });
        Swal.fire("Ahora puede ver las terminales");
    
    
    });


});


let imprimirMensaje = (d) =>{
  
    d.forEach(valor => {
      let elementP = document.createElement('p')
      elementP.textContent = valor;
      console.log(elementP)
      imprimir3.appendChild(elementP);
  }); 
  }
  
  btnDijstra.addEventListener('click',()=>{
    let verticePartida = document.getElementById('verticeInicio').value;
    graph.dijkstra(verticePartida,imprimirMensaje);
    Swal.fire({
        icon: "info",
        text: "Ya puede ver la ruta mas corta"
        
    })
  })
