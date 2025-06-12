"use client";

import React, { useCallback, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import ReactFlow, { MiniMap, Controls, Background, addEdge, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import MessageNode from "./MessageNode";
import EdgeDeleteButton from "./EdgeDeleteButton";
import { FaPlus } from "react-icons/fa";
import useColors from "@/hooks/useColors";
import EditNodeDrawer from "../EditNodeDrawer";
import hasCycle from "./hasLoop";
import removeUnconnectedNodes from "./removeUnLinedNodes";
// import EdgeDeleteButton from "../EdgeDeleteButton";
import { sendPost } from "@/utils/sendRequest";

const nodeTypes = {
    messageNode: MessageNode
};

const edgeTypes = {
    buttonEdge: <button>Hello</button>,
};

const initialNodes = [];

const ChatbotFlow = ({id}) => {
    const { mainColor } = useColors();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodeId, setNodeId] = useState(2);
    const [editData, setEditData] = useState(null);
    const [deleteButtonData, setDeleteButtonData] = useState(null);
    

    const handleSelect = (msg, data) => setEditData(data);
    const handleCloseSelect = () => setEditData(false);


    const addNode = () => {
        const newNode = {
            id: `${nodeId}`,
            type: "messageNode",
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            data: { message: "New Message" },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeId(nodeId + 1);
    };

    const handleSubmit = async () => {
        const newNodes = removeUnconnectedNodes( [...edges],[...nodes]);
        if(hasCycle([...newNodes], [...edges])) return;


        const sendAutomationRes = await sendPost({
            url:`/api/automations`,
            payload:{
                nodes:[...newNodes],
                edges:[...edges],
                type:'message-automation',
                accountId:id
            }
        });
        
        setNodes([...newNodes]);
    };

    const handleEditNode = (node)=>{
        const {id} = node;
        setNodes([...nodes.map((item)=>item.id===id?node:item)])
        setEditData(null);
    }

    const handleDeleteNode = (id)=>{
        setNodes([...nodes.filter((item)=>item.id!==id)])
        setEdges([...edges.filter((item)=>item.source!==id && item.target!==id)]);
        setEditData(null);
    }

    const handleEdgeClick = (e,data)=>{
        setDeleteButtonData({
            top:e.clientY,
            left:e.clientX,
            data
        });
    }

    const onConnect = useCallback(
        (params) => {
          setEdges((eds) => {
            
            if (params.source === params.target) return eds; // Prevent self-loop
            
            const isButtonAlreadyConnected = eds.some(edge => edge.sourceHandle === params.sourceHandle);
            if (isButtonAlreadyConnected) return eds;
      
            const isTargetAlreadyConnected = eds.some(edge => edge.targetHandle === params.targetHandle);
            if (isTargetAlreadyConnected) return eds;
      
            const newEdges = [...eds, params];
      
            if (hasCycle(nodes, newEdges)) {
              console.log("Cycle detected, not adding edge.");
              return eds;
            }

            console.log(edges)
      
            return addEdge(params, eds);
          });
        },
        [setEdges, nodes] // Ensure it captures latest nodes
    );
      


    const handleEdgeMouseEnter = (event, edge) => {
        const { clientX, clientY } = event; // Get cursor position

        setEdges((eds) =>
            eds.map((e) =>
                e.id === edge.id ? { ...e, style: { ...e.style, stroke: mainColor, strokeWidth: 2 } } : e
            )
        );

        setDeleteButtonData({
            top: clientY-30, // Adjust to appear slightly above cursor
            left: clientX-100, // Adjust for better positioning
            edge,
        });
    };

    const handleEdgeMouseLeave = () => {
        setEdges((eds) =>
            eds.map((e) => ({ ...e, style: { ...e.style, stroke: "", strokeWidth: 1 } }))
        );

        setDeleteButtonData(null);
    };

    

    return (
        <>
            <Box width="100%" height="100%" p={4} position="relative">
                <EditNodeDrawer
                    content={editData}
                    handleClose={handleCloseSelect}
                    handleEditNode={handleEditNode}
                    handleDeleteNode={handleDeleteNode}
                />
                {/* <EdgeDeleteButton data={deleteButtonData}/> */}
                <Flex
                    position="absolute"
                    zIndex="1"
                    right="10"
                    top="10"
                    gap={5}
                >
                    <Button
                        p={0}
                        onClick={addNode}
                        borderRadius={"50%"}
                        color="#ffff"
                        bg={mainColor}
                        about="Add Node"
                        
                    >
                        <FaPlus />
                    </Button>
                    <Button bg={mainColor} color={'#ffff'} fontSize={'md'} onClick={handleSubmit}>
                        Set Automation
                    </Button>
                </Flex>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={handleSelect}
                    onConnect={onConnect}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    fitView
                    onEdgeMouseEnter={handleEdgeMouseEnter}
                    onEdgeMouseLeave={handleEdgeMouseLeave}
                >
                    <MiniMap/>
                    <Controls />
                    <Background />
                </ReactFlow>
            </Box>
        </>
    );
};

export default ChatbotFlow;
