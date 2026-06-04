import { useMemo, useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';
import { extractTemplateVariables } from '../utils/textTemplates';

const MIN_TEXT_NODE_WIDTH = 280;
const MAX_TEXT_NODE_WIDTH = 460;
const TEXT_WIDTH_MULTIPLIER = 7;
const MIN_TEXT_NODE_HEIGHT = 120;
const VARIABLE_ROW_HEIGHT = 25;

export const TextNode = ({ id, data }) => {
  const [currentText, setCurrentText] = useState(
    data?.text || '{{input}}'
  );

  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
  };

  // Extract variables from text templates to create dynamic input handles.
  const variables = useMemo(
    () => extractTemplateVariables(currentText),
    [currentText]
  );

  const width = Math.min(
    MAX_TEXT_NODE_WIDTH,
    Math.max(MIN_TEXT_NODE_WIDTH, currentText.length * TEXT_WIDTH_MULTIPLIER)
  );

  const height = Math.max(
    MIN_TEXT_NODE_HEIGHT,
    MIN_TEXT_NODE_HEIGHT + variables.length * VARIABLE_ROW_HEIGHT
  );

  return (
    <BaseNode
      title="Text"
      nodeType="text"
      inputs={variables.map(
        (v) => `${id}-${v}`
      )}
      outputs={[`${id}-output`]}
      width={width}
      height={height}
    >
      <NodeField label="Text">
        <input
          type="text"
          value={currentText}
          onChange={handleTextChange}
        />
      </NodeField>

      <div className="node-meta">
        <span>Variables</span>
        {variables.length === 0
          ? 'None'
          : ` ${variables.join(', ')}`}
      </div>
    </BaseNode>
  );
};
