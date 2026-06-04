import { DraggableNode } from './draggableNode';
import { TOOLBAR_NODE_TYPES } from './constants/nodes';
import { nodeMeta } from './nodeMeta';

export const PipelineToolbar = () => (
  <div className="toolbar-wrap">
    <div className="toolbar-panel" aria-label="Pipeline node toolbar">
      {TOOLBAR_NODE_TYPES.map((type) => (
        <DraggableNode
          key={type}
          type={type}
          label={nodeMeta[type].label}
          tone={nodeMeta[type].tone}
          Icon={nodeMeta[type].Icon}
        />
      ))}
    </div>
  </div>
);
