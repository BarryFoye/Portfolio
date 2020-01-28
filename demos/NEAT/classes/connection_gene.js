class ConnectionGene {
    in_node_id;
    out_node_id;
    weight;
    isEnabled;
    connection_innovation;
    constructor(in_node, out_node, weight, enabled, connection_innovation) {
        this.in_node_id = in_node;
        this.out_node_id = out_node;
        this.weight = weight;
        this.isEnabled = enabled;
        this.connection_innovation = connection_innovation;
    }
}

module.exports = { ConnectionGene };