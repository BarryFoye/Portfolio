//http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
const node_genes = require("./node_gene");
const connections = require("./connection_gene");
let nodes_list = [];
let connections_list = [];
let node_innovation;
let connection_innovation;
const MUTATE_WEIGHT_RATE = 0.01;
const MUTATE_CONNECTION_RATE = 0.01;
const MUTATE_NODES_RATE = 0.01;
const INPUT = 0;
const HIDDEN = 1;
const OUTPUT = 2;
const DEFAULT_NODE_MUTATION = 1;

function initialise(input, output) {
    node_innovation = 1;
    connection_innovation = 1;
    //input nodes
    for (let i = 0; i < input; i++) {
        nodes_list.push(new node_genes.NodeGene(INPUT, node_innovation));
        node_innovation++;
    }
    //output nodes
    for (let i = 0; i < output; i++) {
        nodes_list.push(new node_genes.NodeGene(OUTPUT, node_innovation));
        node_innovation++;
    }
    // hidden nodes - none for NEAT during initialisation 
    // - could make this NEAT agnostic for reuse
    // nodes_list.push(new node_genes.NodeGene(HIDDEN, node_innovation));
    // node_innovation++;

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
    // connections_list.push(
    //     new connections.ConnectionGene(
    //         nodes_list[4], nodes_list[3], Math.random(), true, connection_innovation
    //     ));
    // connection_innovation++;
}
initialise(3, 1);
for (let j = 0; j < 100; j++) {
    mutate();
}
console.log(nodes_list);
console.log(connections_list);
function mutate() {
    mutate_weights();
    if (Math.random() < MUTATE_CONNECTION_RATE) add_connection();
    if (Math.random() < MUTATE_NODES_RATE) add_node();

    function mutate_weights() {
        // need to add a way to mutate connection weights
        // as per standard NE approaches
        for (let i = 0; i < connections_list.length; i++) {
            if (Math.random() < MUTATE_WEIGHT_RATE) {
                console.log("Mutating weights");
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
        //pick two random nodes from the node list
        // if they are connected DON'T mutate this iteration
        // else 1. connect them
        // OR
        // else give some probability to connect them or not
        let subject_node_in;
        let subject_node_out;
        let count = 0;
        let exists = true;
        // ***
        // ASSUMPTION: the list is linear and any node that comes after another node 
        // and is not of the same type will be allowable to establish a connection
        let selected_node = getRandomInt(0, nodes_list.length - 1);
        let proceeding_node = getRandomInt(selected_node, nodes_list.length);
        // ***
        do {
            subject_node_in = nodes_list[selected_node];
            subject_node_out = nodes_list[proceeding_node];
            count++;
        } while (subject_node_in === subject_node_out && count < nodes_list.length);
        if (subject_node_in.node_type !== subject_node_out.node_type && subject_node_in.node_type < subject_node_out.node_type) {
            exists = connetionExists(subject_node_in, subject_node_out);
            console.log("compatible");
        }
        else if (subject_node_in.node_type === subject_node_out.node_type) {
            if (subject_node_in.node_type === HIDDEN) {
                exists = connetionExists(subject_node_in, subject_node_out);
                console.log("compatible");
            } else {
                console.log("incompatible");
            }
        } else {
            console.log("incompatible");
        }
        if (!exists) {
            connections_list.push(
                new connections.ConnectionGene(
                    subject_node_in, subject_node_out, Math.random(), true, connection_innovation
                ));
            connection_innovation++;
        }
    }

    function add_node() {
        console.log("Mutating nodes");
        //new node
        const new_node = new node_genes.NodeGene(HIDDEN, node_innovation);
        node_innovation++;
        //insert between start and end node
        // ASSUMPTION: a disabled connection is invalid
        let connection;
        do {
            connection = connections_list[getRandomInt(0, connections_list.length)];
        } while (!connection.isEnabled)

        //disable connection between start and end node
        connection.isEnabled = false;
        //start and new node connected with previous connection weight
        connections_list.push(
            new connections.ConnectionGene(
                connection.in_node_id, new_node, DEFAULT_NODE_MUTATION, true, connection_innovation
            ));
        connection_innovation++;
        //new node and end node connected with weight of 1
        connections_list.push(
            new connections.ConnectionGene(
                new_node, connection.out_node_id, connection.weight, true, connection_innovation
            ));
        connection_innovation++;
        nodes_list.push(new_node);
    }
}


//Helper functions

function connetionExists(conn_1, conn_2) {
    let element;
    let connected = false;
    for (let i = 0; i < connections_list.length; i++) {
        element = connections_list[i];
        if (element.in_node_id.id === conn_1.id && element.out_node_id.id === conn_2.id) {
            connected = true;
        }
    }
    return connected;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}