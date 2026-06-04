import { BaseNode } from './BaseNode';

const toHandleIds = (nodeId, handles) => handles.map((handle) => `${nodeId}-${handle}`);

export const StaticNode = ({
  id,
  title,
  nodeType,
  inputHandles = [],
  outputHandles = [],
  description,
}) => (
  <BaseNode
    title={title}
    nodeType={nodeType}
    inputs={toHandleIds(id, inputHandles)}
    outputs={toHandleIds(id, outputHandles)}
  >
    <div className="node-description">{description}</div>
  </BaseNode>
);

