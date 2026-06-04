import { StaticNode } from './StaticNode';

export const EmailNode = ({ id }) => (
  <StaticNode
    id={id}
    title="Email"
    nodeType="email"
    inputHandles={['recipient', 'message']}
    outputHandles={['status']}
    description="Email Sender Node"
  />
);
