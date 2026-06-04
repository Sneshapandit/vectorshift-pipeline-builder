import { StaticNode } from './StaticNode';

export const LLMNode = ({ id }) => (
  <StaticNode
    id={id}
    title="LLM"
    nodeType="llm"
    inputHandles={['system', 'prompt']}
    outputHandles={['response']}
    description="This is a LLM."
  />
);
