import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './NodeField';

export const InputNode = ({ id, data }) => {
  const [currentName, setCurrentName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrentName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      title="Input"
      nodeType="customInput"
      outputs={[`${id}-value`]}
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
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
