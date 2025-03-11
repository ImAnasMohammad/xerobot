import React from 'react';
import { getBezierPath } from 'reactflow';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <g>
      <path id={id} d={edgePath} stroke="#fff" strokeWidth="10" fill="none" />
    </g>
  );
};

export default CustomEdge;
