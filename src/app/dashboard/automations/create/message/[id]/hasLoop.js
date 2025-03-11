const hasCycle = (nodes, edges) => {
    // Create an adjacency list
    const graph = new Map();
    
    edges.forEach(({ source, target }) => {
        if (!graph.has(source)) graph.set(source, []);
        graph.get(source).push(target);
    });

    console.log(graph,nodes)

    // Helper function to detect cycles using DFS
    const visited = new Set();
    const stack = new Set();

    const dfs = (node) => {
        if (stack.has(node)) {
            console.log(`🔴 Cycle detected at node: ${node}`);
            return true; // Cycle detected
        }
        if (visited.has(node)) return false; // Already checked

        visited.add(node);
        stack.add(node);

        const neighbors = graph.get(node) || [];
        for (let neighbor of neighbors) {
            if (dfs(neighbor)) return true; // Cycle found
        }

        stack.delete(node); // Backtrack
        return false;
    };

    // Check all nodes for cycles
    for (let node of nodes.map(n => n.id)) {
        if (!visited.has(node)) {
            if (dfs(node)) return true;
        }
    }

    console.log("✅ No loops found.");
    return false;
};

export default hasCycle;
