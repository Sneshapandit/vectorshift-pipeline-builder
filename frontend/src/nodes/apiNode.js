import { StaticNode } from './StaticNode';

export const APINode = ({ id }) => (
  <StaticNode
    id={id}
    title="API"
    nodeType="api"
    inputHandles={['url']}
    outputHandles={['response']}
    description="API Request Node"
  />
);
