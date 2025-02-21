"use client";

import React, { useCallback, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import ReactFlow, { MiniMap, Controls, Background, addEdge, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import MessageNode from "./MessageNode";
import { FaPlus } from "react-icons/fa";
import useColors from "@/hooks/useColors";
import EditNodeDrawer from "../EditNodeDrawer";

const nodeTypes = { messageNode: MessageNode };

const initialNodes = [];

const ChatbotFlow = () => {
    const { mainColor } = useColors();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodeId, setNodeId] = useState(2);
    const [editData, setEditData] = useState(null);

    const handleSelect = (msg, data) => setEditData(data);
    const handleCloseSelect = () => setEditData(false);


    const addNode = () => {
        const newNode = {
            id: `${nodeId}`,
            type: "messageNode",
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            data: { message: "New Message", options: ["Option 1", "Option 2"] },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeId(nodeId + 1);
    };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <>
            <Box width="100%" height="100%" p={4} position="relative">
                <EditNodeDrawer
                    content={editData}
                    handleClose={handleCloseSelect}
                />
                <Button
                    p={0}
                    onClick={addNode}
                    borderRadius={"50%"}
                    color="#ffff"
                    bg={mainColor}
                    position="absolute"
                    zIndex="1"
                    right="10"
                    top="10"
                >
                    <FaPlus />
                </Button>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={handleSelect}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </Box>
        </>
    );
};

export default ChatbotFlow;
