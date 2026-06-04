import { create } from 'zustand';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import {
  DEFAULT_NODE_IDS,
  DEMO_EDGE_CONNECTIONS,
  DEMO_NODES,
} from './constants/nodes';
import {
  DEFAULT_EDGE_OPTIONS,
  EDGE_MARKER,
} from './constants/workflow';

const createWorkflowEdge = (edge) => ({
  ...edge,
  ...DEFAULT_EDGE_OPTIONS,
  markerEnd: EDGE_MARKER,
});

const demoEdges = DEMO_EDGE_CONNECTIONS.map(createWorkflowEdge);

export const useStore = create((set, get) => ({
  nodes: DEMO_NODES,
  edges: demoEdges,
  nodeIDs: DEFAULT_NODE_IDS,

  // Generate unique node ids per node type.
  getNodeID: (type) => {
    const nodeIDs = { ...get().nodeIDs };

    if (nodeIDs[type] === undefined) {
      nodeIDs[type] = 0;
    }

    nodeIDs[type] += 1;
    set({ nodeIDs });

    return `${type}-${nodeIDs[type]}`;
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(createWorkflowEdge(connection), get().edges),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id !== nodeId) {
          return node;
        }

        return {
          ...node,
          data: {
            ...node.data,
            [fieldName]: fieldValue,
          },
        };
      }),
    });
  },
}));
