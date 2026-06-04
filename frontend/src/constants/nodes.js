export const TOOLBAR_NODE_TYPES = [
  'customInput',
  'llm',
  'customOutput',
  'text',
  'api',
  'database',
  'email',
  'csv',
  'filter',
];

export const DEFAULT_NODE_IDS = {
  customInput: 1,
  text: 1,
  llm: 1,
  customOutput: 1,
};

export const DEMO_NODES = [
  {
    id: 'customInput-1',
    type: 'customInput',
    position: { x: 110, y: 190 },
    data: { id: 'customInput-1', nodeType: 'customInput' },
  },
  {
    id: 'text-1',
    type: 'text',
    position: { x: 450, y: 190 },
    data: { id: 'text-1', nodeType: 'text', text: '{{input}}' },
  },
  {
    id: 'llm-1',
    type: 'llm',
    position: { x: 790, y: 190 },
    data: { id: 'llm-1', nodeType: 'llm' },
  },
  {
    id: 'customOutput-1',
    type: 'customOutput',
    position: { x: 1130, y: 190 },
    data: { id: 'customOutput-1', nodeType: 'customOutput' },
  },
];

export const DEMO_EDGE_CONNECTIONS = [
  {
    id: 'customInput-1-to-text-1',
    source: 'customInput-1',
    sourceHandle: 'customInput-1-value',
    target: 'text-1',
    targetHandle: 'text-1-input',
  },
  {
    id: 'text-1-to-llm-1',
    source: 'text-1',
    sourceHandle: 'text-1-output',
    target: 'llm-1',
    targetHandle: 'llm-1-prompt',
  },
  {
    id: 'llm-1-to-customOutput-1',
    source: 'llm-1',
    sourceHandle: 'llm-1-response',
    target: 'customOutput-1',
    targetHandle: 'customOutput-1-value',
  },
];

