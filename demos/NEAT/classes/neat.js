//http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
const node_genes = require("./node_gene");
const connections = require("./connection_gene");
let nodes_list = [];
let connections_list =[];
let innovation = 1;
// const node = new node_genes.NodeGene("input");
// const node2 = new node_genes.NodeGene("output");
// const node3 = new node_genes.NodeGene("hidden");

// const connection1 = new connections.ConnectionGene(node1.id, node2.id, Math.random(), false, 1);
function initialise(input, hidden, output){
    let num_conns = input*hidden + hidden * output;
    //input nodes
    for(let i = 0 ; i < input; i++){
        nodes_list.push(new node_genes.NodeGene("input", innovation));
    }
    //output nodes
    for(let i = 0 ; i < output; i++){
        nodes_list.push(new node_genes.NodeGene("output", innovation));
    }
    //hidden nodes
    for(let i = 0 ; i < hidden; i++){
        nodes_list.push(new node_genes.NodeGene("hidden", innovation));
    }
    //connections
    for(let i = 0 ; i < num_conns; i++){
        connections_list.push(new connections.ConnectionGene("NotYetAssigned", "NotYetAssigned", Math.random(), false, innovation));
    }
}
initialise(2,3,1);

function mutate(){
    function add_connection(){
        //start node
        //end node
    }

    function add_node(){
        //new node
        //insert between start and end node
        //disable connection between start and end node
        //start and new node connected with previous connection weight
        //new node and end node connected with weight of 1
    }
}
