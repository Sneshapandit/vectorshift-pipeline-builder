import { useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { Sparkles } from 'lucide-react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import {
  CANVAS_BACKGROUND,
  CONNECTION_LINE_STYLE,
  DEFAULT_EDGE_OPTIONS,
  FIT_VIEW_OPTIONS,
  GRID_SIZE,
  MINIMAP_OPTIONS,
  PRO_OPTIONS,
  STATUS_LABELS,
} from './constants/workflow';
import { isDag } from './utils/graph';
import { SubmitButton } from './submit';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { EmailNode } from './nodes/emailNode';
import { CSVNode } from './nodes/csvNode';
import { FilterNode } from './nodes/filterNode';

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  database: DatabaseNode,
  email: EmailNode,
  csv: CSVNode,
  filter: FilterNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);
  const pipelineIsDag = useMemo(() => isDag(nodes, edges), [nodes, edges]);

  const getInitNodeData = (nodeId, type) => ({
    id: nodeId,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const dragData = event?.dataTransfer?.getData('application/reactflow');

      if (!dragData || !reactFlowInstance || !reactFlowWrapper.current) {
        return;
      }

      const { nodeType } = JSON.parse(dragData);

      if (!nodeType) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const nodeId = getNodeID(nodeType);

      addNode({
        id: nodeId,
        type: nodeType,
        position,
        data: getInitNodeData(nodeId, nodeType),
      });
    },
    [addNode, getNodeID, reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <section className="canvas-shell">
      <div className="workflow-status-bar" aria-label="Workflow statistics">
        <div className="status-pill">
          <strong>{nodes.length}</strong>
          <span>Nodes</span>
        </div>
        <div className="status-pill">
          <strong>{edges.length}</strong>
          <span>Connections</span>
        </div>
        <div className={`status-pill status-pill--${pipelineIsDag ? 'success' : 'danger'}`}>
          <strong>
            {pipelineIsDag ? STATUS_LABELS.validDag : STATUS_LABELS.cycleDetected}
          </strong>
          <span>Pipeline Status</span>
        </div>
        <SubmitButton />
      </div>
      <div ref={reactFlowWrapper} className="canvas-panel">
        {nodes.length === 0 && (
          <div className="empty-canvas-hint">
            <span className="empty-canvas-hint__icon" aria-hidden="true">
              <Sparkles size={22} strokeWidth={2.1} />
            </span>
            <strong>Drag a node from the toolbar to begin building a workflow</strong>
          </div>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={PRO_OPTIONS}
          defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
          snapGrid={[GRID_SIZE, GRID_SIZE]}
          connectionLineType="smoothstep"
          connectionLineStyle={CONNECTION_LINE_STYLE}
          fitView
          fitViewOptions={FIT_VIEW_OPTIONS}
        >
          <Background {...CANVAS_BACKGROUND} />
          <Controls className="flow-controls" />
          <MiniMap
            className="flow-minimap"
            nodeColor={MINIMAP_OPTIONS.nodeColor}
            maskColor={MINIMAP_OPTIONS.maskColor}
            pannable
            zoomable
          />
        </ReactFlow>
      </div>
    </section>
  );
};
