//http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
const node_genes = require("./node_gene");
const connections = require("./connection_gene");
let nodes_list = [];
let connections_list = [];
let node_innovation;
let connection_innovation;
const MUTATE_WEIGHT_RATE = 0.01;
const NEW_CONNECTION_RATE = 0.01;
// const node = new node_genes.NodeGene("input");
// const node2 = new node_genes.NodeGene("output");
// const node3 = new node_genes.NodeGene("hidden");

// const connection1 = new connections.ConnectionGene(node1.id, node2.id, Math.random(), false, 1);
function initialise(input, output) {
    node_innovation = 1;
    connection_innovation = 1;
    //input nodes
    for (let i = 0; i < input; i++) {
        nodes_list.push(new node_genes.NodeGene("input", node_innovation));
        node_innovation++;
    }
    //output nodes
    for (let i = 0; i < output; i++) {
        nodes_list.push(new node_genes.NodeGene("output", node_innovation));
        node_innovation++;
    }
    // hidden nodes - none for NEAT during initialisation 
    // - could make this NEAT agnostic for reuse

    //connections - simple hard coded - TODO: Improve with loop?
    connections_list.push(
        new connections.ConnectionGene(
            nodes_list[0], nodes_list[3], Math.random(), true, connection_innovation
        ));
    connection_innovation++;
    connections_list.push(
        new connections.ConnectionGene(
            nodes_list[1], nodes_list[3], Math.random(), true, connection_innovation
        ));
    connection_innovation++;
    connections_list.push(
        new connections.ConnectionGene(
            nodes_list[2], nodes_list[3], Math.random(), true, connection_innovation
        ));
    connection_innovation++;
}
initialise(3, 1);
mutate();
for (let i = 0; i < nodes_list.length; i++) {
    console.log(nodes_list[i]);
}
for (let i = 0; i < connections_list.length; i++) {
    console.log(connections_list[i]);
}

function mutate() {
    mutate_weights();
    add_connection();
    add_node();

    function mutate_weights() {
        console.log("Mutating weights");
        // need to add a way to mutate connection weights
        // as per standard NE approaches
        for (let i = 0; i < connections_list.length; i++) {
            if (Math.random() < MUTATE_WEIGHT_RATE) {
                connections_list[i].weight = Math.random();
            }
        }
    }

    function add_connection() {
        console.log("Mutating connections");
        // a single new connection gene with a random weight is added connecting
        // two previously unconnected nodes
        //start node
        //end node
        //pick two random connections from the connections list
        // if they are connected DON'T mutate this iteration
        // else 1. connect them
        // OR
        // else give some probability to connect them or not
        let conn_1;
        let conn_2;
        do {
            conn_1 = connections_list[getRandomInt(0, connections_list.length)];
            conn_2 = connections_list[getRandomInt(0, connections_list.length)];
        } while (conn_1 === conn_2);

        let mutated = false;
        console.log(conn_1.in_node_id.id);
        console.log(conn_2.in_node_id.id);
        if (conn_1.in_node_id.id === conn_2.out_node_id.id) {
            console.log("NO add_connection() MUTATION");
        }
        else if (conn_2.in_node_id.id === conn_1.out_node_id.id) {
            console.log("NO add_connection() MUTATION");
        }
        else if (conn_1.in_node_id.id !== conn_2.out_node_id.id && !mutated) {//TODO: add clause so that input nodes cant connect to input nodes and same for output nodes
            console.log("MUTATION: Conn1 -> Conn2");
            connections_list.push(
                new connections.ConnectionGene(
                    conn_1.in_node_id, conn_2.in_node_id, Math.random(), true, connection_innovation
                ));
            connection_innovation++;
            mutated = true;
        }
        else if (conn_2.in_node_id.id !== conn_1.out_node_id.id && !mutated) {
            console.log("MUTATION: Conn2 -> Conn1");
            connections_list.push(
                new connections.ConnectionGene(
                    conn_.in_node_id, conn_1.in_node_id, Math.random(), true, connection_innovation
                ));
            connection_innovation++;
            mutated = true;
        }
    }

    function add_node() {
        //new node
        //insert between start and end node
        //disable connection between start and end node
        //start and new node connected with previous connection weight
        //new node and end node connected with weight of 1
    }
}


//Helper functions

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}