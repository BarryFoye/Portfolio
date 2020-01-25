const id = require("./id.js");

class NodeGene{
    id;
    node_type;
    innovation;
    constructor(node_type, innovation){
        this.id = id.ID();
        this.node_type = node_type;
        this.innovation = innovation;
    }
}

module.exports = {NodeGene};