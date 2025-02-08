import { edgeTypes, nodeTypes, presetNode } from '@rickzhou/react-flow/config';
import { useAction } from '@rickzhou/react-flow/hooks/useAction';
import { useFlowState } from '@rickzhou/react-flow/hooks/useFlowState';
import { useFlowchart } from '@rickzhou/react-flow/hooks/useFlowchart';
import { useMock } from '@rickzhou/react-flow/hooks/useMock';
import { useModalOpen } from '@rickzhou/react-flow/hooks/useModalOpen';
import { useNavigate } from '@rickzhou/react-flow/hooks/useNavigate';
import type {
  FlowChartType,
  NodeDataType,
} from '@rickzhou/react-flow/interface';
import { Action, NodeType } from '@rickzhou/react-flow/interface';
import { OpenTypeConfig } from '@rickzhou/react-flow/store/slice/modalOpenSlice';
import {
  FlowContainer,
  FlowContainerClassname,
  FlowNodeClassname,
  FlowNodeDragoverClassname,
} from '@rickzhou/react-flow/styles';
import {
  isTree,
  transformData,
  transformDataFromChart,
} from '@rickzhou/react-flow/utils';
import {
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  message,
} from 'antd';
import { isEmpty } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Edge, ReactFlowInstance } from 'reactflow';
import ReactFlow, { Background, Controls, ReactFlowProvider } from 'reactflow';
import FlowChart from '../flow';
import FlowHome from '../home';
import Sidebar from './sidebar';

const FlowEdit = () => {
  const { id } = useParams();
  const [instance, setInstance] = useState<ReactFlowInstance>();
  const [nodeEditDrawerOpen, setNodeEditDrawerOpen] = useState(false);
  const [edgeEditDrawerOpen, setEdgeEditDrawerOpen] = useState(false);
  const currentDragoverDom = useRef<HTMLDivElement>();
  const [editNode, setCurrentEditNode] = useState<(typeof nodes)[number]>();
  const [currentEditEdge, setCurrentEditEdge] = useState<Edge>();
  const [editNodeForm] = Form.useForm();
  const [editEdgeForm] = Form.useForm();
  const [editable, setEditable] = useState(true);
  const nodeType = Form.useWatch<NodeDataType['nodeType']>('nodeType', {
    form: editNodeForm,
  });
  const navigate = useNavigate();
  const { addChart } = useFlowchart();
  const { action } = useAction();
  const [selectedId, setSelectedId] = useState(editNode?.data.chartId);
  const { mockLoadingFn, loading } = useMock();
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    addNode,
  } = useFlowState({
    id: id!,
    instance: instance!,
    editable: true,
    delay: 1000,
  });
  const { open, onShow, onHidden } = useModalOpen(
    OpenTypeConfig.FlowChartSelectOpen,
  );

  useEffect(() => {
    if (action === Action.edit || action === Action.copy) {
      void mockLoadingFn();
    }
  }, [action, mockLoadingFn]);

  const isSingleTree = () => isTree(instance!.getNodes(), instance!.getEdges());

  const onSave = async (params: FlowChartType) => {
    if (!isSingleTree()) {
      return message.warning('Please connect all nodes');
    }

    const nodes = transformDataFromChart(
      instance!.getNodes(),
      instance!.getEdges(),
    );

    const id = addChart({
      ...params,
      nodes,
    });

    if (action !== Action.edit) {
      navigate(`${import.meta.env.BASE_URL}edit/${id}?action=${Action.edit}`, {
        state: Date.now(),
      });
    }
  };

  const onNodeChange = () => {
    if (editNode) {
      const _nodes = [...instance!.getNodes()].map(node => {
        if (`${node.id}` === `${editNode.id}`) {
          node = {
            ...editNode,
            data: {
              ...editNode?.data,
              ...editNodeForm.getFieldsValue(),
            },
          };
        }

        return node;
      });
      setNodes(transformData(_nodes) as typeof nodes);
      setNodeEditDrawerOpen(false);
    }
  };

  const onEdgeChange = () => {
    const _edges = instance!.getEdges();
    _edges.forEach(_edge => {
      if (_edge.id === currentEditEdge?.id) {
        _edge.label = editEdgeForm.getFieldValue('branchLabel');
      }
    });
    setEdges(_edges);

    const _nodes = instance!.getNodes();
    _nodes.forEach(_node => {
      if (_node.id === currentEditEdge?.target) {
        _node.data.branchLabel = editEdgeForm.getFieldValue('branchLabel');
      }
    });
    setNodes(_nodes);
    setEdgeEditDrawerOpen(false);
    editEdgeForm.resetFields();
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const nodeId = currentDragoverDom.current?.dataset.nodeId;

      if (nodeId ?? isEmpty(nodes)) {
        const type = event.dataTransfer.getData('application/reactflow');
        if (presetNode.some(i => i.type === type)) {
          if (
            isEmpty(nodes) ||
            isTree(instance!.getNodes(), instance!.getEdges())
          ) {
            addNode(Number(nodeId), type as NodeType);
          } else {
            await message.warning('Please connect all nodes');
          }
        }

        currentDragoverDom.current?.classList.remove(FlowNodeDragoverClassname);
        currentDragoverDom.current = undefined;
      }
    },
    [addNode, instance, nodes],
  );

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    const domTarget = event.target as HTMLDivElement;
    if (domTarget.classList.contains(FlowContainerClassname)) {
      currentDragoverDom.current?.classList.remove(FlowNodeDragoverClassname);
      currentDragoverDom.current = undefined;
    }

    if (domTarget.classList.contains(FlowNodeClassname)) {
      domTarget.classList.add(FlowNodeDragoverClassname);
      currentDragoverDom.current = domTarget;
    }
  };

  return (
    <div className="flex overflow-hidden">
      <ReactFlowProvider>
        <FlowContainer $height={'100vh'}>
          <ReactFlow
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            zoomOnDoubleClick={false}
            onEdgeDoubleClick={(_, edge) => {
              editEdgeForm.setFieldsValue({ branchLabel: edge.label });
              setCurrentEditEdge(edge);
              setEdgeEditDrawerOpen(true);
            }}
            onNodeDoubleClick={(_, node) => {
              editNodeForm.setFieldsValue(node.data);
              setCurrentEditNode(node);
              setNodeEditDrawerOpen(true);
            }}
            onInit={setInstance}
            deleteKeyCode={null}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            nodesDraggable={false}
            proOptions={{ hideAttribution: true }}
            fitView>
            <Controls showInteractive={false} />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </FlowContainer>

        <Sidebar editable={editable} onSave={onSave} />
      </ReactFlowProvider>

      <Drawer
        title={'Node Edit'}
        width={500}
        open={nodeEditDrawerOpen}
        onClose={() => {
          setNodeEditDrawerOpen(false);
        }}
        closeIcon={null}
        maskClosable
        extra={
          <Button type="primary" onClick={onNodeChange}>
            Save
          </Button>
        }>
        <div>
          <Form labelCol={{ span: 4 }} form={editNodeForm}>
            <Form.Item label="Label" name="label">
              <Input placeholder="node label" />
            </Form.Item>
            <Form.Item label="Type" name="nodeType">
              <Radio.Group>
                <Space direction="vertical">
                  {presetNode.map(i => {
                    return (
                      <Radio value={i.type} key={i.type} className="capitalize">
                        {i.type}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Flow" name="chartId">
              <Button onClick={onShow} disabled={nodeType !== NodeType.flow}>
                Link
              </Button>
            </Form.Item>
          </Form>

          {nodeType === NodeType.flow && Boolean(editNode?.data.chartId) && (
            <FlowChart id={editNode!.data.chartId} height={'50vh'} />
          )}
        </div>
      </Drawer>

      <Drawer
        title={'Edge Edit'}
        width={500}
        open={edgeEditDrawerOpen}
        onClose={() => {
          setEdgeEditDrawerOpen(false);
        }}
        closeIcon={null}
        maskClosable
        extra={
          <Button type="primary" onClick={onEdgeChange}>
            Save
          </Button>
        }>
        <Form labelCol={{ span: 5 }} form={editEdgeForm}>
          <Form.Item label="Branch label" name="branchLabel">
            <Input placeholder="branch label" />
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        zIndex={9999}
        closable={false}
        width={'80%'}
        centered
        open={open}
        bodyStyle={{ height: '80vh', overflow: 'hidden' }}
        onCancel={onHidden}
        maskClosable
        footer={null}>
        <FlowHome
          selectable
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onSave={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setCurrentEditNode(i => {
              return {
                ...i,
                data: { ...i?.data, chartId: selectedId },
              };
            });
            editNodeForm.setFieldValue('chartId', selectedId);
            onHidden();
          }}
        />
      </Modal>
    </div>
  );
};

export default FlowEdit;
