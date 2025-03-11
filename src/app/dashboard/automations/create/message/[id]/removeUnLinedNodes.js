const removeUnconnectedNodes = (edges,nodes) => {
    // Step 1: Get all node IDs that are connected in edges
    const connectedNodeIds = new Set();
    edges.forEach(edge => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);
    });

    // Step 2: Filter out nodes that are NOT in the connectedNodeIds set
    const newNodes = nodes.filter(node => connectedNodeIds.has(node.id));

    return newNodes;
};

export default removeUnconnectedNodes;