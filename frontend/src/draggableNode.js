export const DraggableNode = ({ type, label, tone, Icon }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node tone-${tone || 'blue'}`}
      onDragStart={handleDragStart}
      aria-label={`Drag ${label} node`}
      role="button"
      tabIndex={0}
      draggable
    >
      <span className="draggable-node__mark" aria-hidden="true">
        {Icon && <Icon size={18} strokeWidth={2.1} />}
      </span>
      <span>{label}</span>
    </div>
  );
};
