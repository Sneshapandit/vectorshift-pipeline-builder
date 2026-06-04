import { StaticNode } from './StaticNode';

export const DatabaseNode = ({ id }) => (
  <StaticNode
    id={id}
    title="Database"
    nodeType="database"
    inputHandles={['query']}
    outputHandles={['result']}
    description="Database Query Node"
  />
);
