import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">AI Workflow Studio</p>
          <h1>VectorShift Pipeline Builder</h1>
          <p>Build and analyze AI workflows visually</p>
        </div>
      </header>

      <PipelineToolbar />
      <PipelineUI />

      <footer className="app-footer">
        <span>VectorShift Pipeline Builder</span>
        <span>ReactFlow | FastAPI | DAG Validation</span>
      </footer>
    </div>
  );
}

export default App;
