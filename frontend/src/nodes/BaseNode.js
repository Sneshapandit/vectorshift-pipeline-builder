import { Handle, Position } from 'reactflow';
import { getNodeMeta } from '../nodeMeta';

const DEFAULT_NODE_WIDTH = 260;
const DEFAULT_NODE_HEIGHT = 120;
const HANDLE_TOP_OFFSET = 52;
const HANDLE_VERTICAL_GAP = 28;

const getHandleTop = (index) => HANDLE_TOP_OFFSET + index * HANDLE_VERTICAL_GAP;

export const BaseNode = ({
  title,
  children,
  inputs = [],
  outputs = [],
  width = DEFAULT_NODE_WIDTH,
  height = DEFAULT_NODE_HEIGHT,
  nodeType,
}) => {
  const { tone, Icon } = getNodeMeta(nodeType, title);

  return (
    <div
      className={`pipeline-node tone-${tone}`}
      style={{
        width,
        minHeight: height,
      }}
    >
      <div className="pipeline-node__header">
        <span className="pipeline-node__icon" aria-hidden="true">
          <Icon size={17} strokeWidth={2.2} />
        </span>
        <span>{title}</span>
      </div>

      {inputs.map((input, index) => (
        <Handle
          key={input}
          type="target"
          position={Position.Left}
          id={input}
          className="pipeline-handle pipeline-handle--target"
          style={{
            top: getHandleTop(index),
          }}
        />
      ))}

      {outputs.map((output, index) => (
        <Handle
          key={output}
          type="source"
          position={Position.Right}
          id={output}
          className="pipeline-handle pipeline-handle--source"
          style={{
            top: getHandleTop(index),
          }}
        />
      ))}

      <div className="pipeline-node__body">{children}</div>
    </div>
  );
};
