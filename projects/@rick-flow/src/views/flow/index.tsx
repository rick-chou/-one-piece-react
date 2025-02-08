import { edgeTypes, nodeTypes } from '@rickzhou/react-flow/config';
import { useFlowState } from '@rickzhou/react-flow/hooks/useFlowState';
import { useMock } from '@rickzhou/react-flow/hooks/useMock';
import type { Execution } from '@rickzhou/react-flow/interface';
import { FlowContainer } from '@rickzhou/react-flow/styles';
import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import type { ReactFlowInstance } from 'reactflow';
import ReactFlow, { Background, Controls, ReactFlowProvider } from 'reactflow';

type FlowChartProps = {
  id?: string;
  height?: string | number;
  executionNodes?: Execution['executionNodes'];
};

const FlowChart: React.FC<FlowChartProps> = ({
  id: propsId,
  executionNodes = [],
  height = '100vh',
}) => {
  const reactFlowInstance = useRef<ReactFlowInstance>();
  const { id: urlId } = useParams();
  const id = useMemo(() => propsId ?? urlId, [propsId, urlId]);
  const { nodes, edges } = useFlowState({
    id: id!,
    instance: reactFlowInstance.current!,
    executionNodes,
  });

  const { loading, mockLoadingFn } = useMock();

  useEffect(() => {
    if (urlId) {
      void mockLoadingFn();
    }
  }, [urlId, mockLoadingFn]);

  return (
    <div className="flex overflow-hidden">
      <ReactFlowProvider>
        <FlowContainer $height={height}>
          <ReactFlow
            minZoom={0.1}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodes={nodes}
            edges={edges}
            zoomOnDoubleClick={false}
            onInit={instance => {
              reactFlowInstance.current = instance;
            }}
            deleteKeyCode={null}
            nodesDraggable={false}
            proOptions={{ hideAttribution: true }}
            fitView>
            <Controls showInteractive={false} />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </FlowContainer>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowChart;
