import { StaticNode } from './StaticNode';

export const FilterNode = ({ id }) => (
  <StaticNode
    id={id}
    title="Filter"
    nodeType="filter"
    inputHandles={['data']}
    outputHandles={['filtered']}
    description="Filter Data Node"
  />
);
