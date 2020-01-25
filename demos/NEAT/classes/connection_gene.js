class ConnectionGene{
    in_node_id;
    out_node_id;
    weight;
    isEnabled;
    innovation;
    constructor(in_node, out_node, weight, enabled, innovation){
        this.in_node_id = in_node;
        this.out_node_id = out_node;
        this.weight = weight;
        this.isEnabled = enabled;
        this.innovation = innovation;
    }
}

module.exports = {ConnectionGene};