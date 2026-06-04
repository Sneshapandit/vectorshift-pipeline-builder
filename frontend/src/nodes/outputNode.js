import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const OutputNode = ({ id, data }) => {
  const [currentName, setCurrentName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrentName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      title="Output"
      nodeType="customOutput"
      inputs={[`${id}-value`]}
    >
      <NodeField label="Name">
        <input
          type="text"
          value={currentName}
          onChange={handleNameChange}
        />
      </NodeField>

      <NodeField label="Type">
        <select
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
