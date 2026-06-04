import { StaticNode } from './StaticNode';

export const CSVNode = ({ id }) => (
  <StaticNode
    id={id}
    title="CSV"
    nodeType="csv"
    outputHandles={['data']}
    description="CSV Import Node"
  />
);
