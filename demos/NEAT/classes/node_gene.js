const id = require("./id.js");

class NodeGene {
    id;
    node_type;
    node_innovation;
    constructor(node_type, node_innovation) {
        this.id = id.ID();
        this.node_type = node_type;
        this.node_innovation = node_innovation;
    }
}

module.exports = { NodeGene };