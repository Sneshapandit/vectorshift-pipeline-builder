import { MarkerType } from 'reactflow';

export const GRID_SIZE = 20;

export const EDGE_STYLE = {
  stroke: '#4f46e5',
  strokeWidth: 2.5,
};

export const EDGE_MARKER = {
  type: MarkerType.Arrow,
  height: '20px',
  width: '20px',
};

export const DEFAULT_EDGE_OPTIONS = {
  type: 'smoothstep',
  animated: true,
  style: EDGE_STYLE,
};

export const CONNECTION_LINE_STYLE = {
  stroke: '#3b82f6',
  strokeWidth: 2.75,
  strokeDasharray: '6 6',
};

export const FIT_VIEW_OPTIONS = { padding: 0.28 };

export const PRO_OPTIONS = { hideAttribution: true };

export const CANVAS_BACKGROUND = {
  color: '#d7dee8',
  gap: 28,
  size: 1.2,
};

export const MINIMAP_OPTIONS = {
  nodeColor: '#aeb9ca',
  maskColor: 'rgba(248, 250, 252, 0.76)',
};

export const STATUS_LABELS = {
  validDag: '\u2713 Valid DAG',
  cycleDetected: 'Cycle Detected',
};

export const ANALYSIS_API_URL = 'http://127.0.0.1:8000/pipelines/parse';
