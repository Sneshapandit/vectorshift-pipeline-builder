# VectorShift Pipeline Builder

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=111827)
![ReactFlow](https://img.shields.io/badge/ReactFlow-11.8-2563EB)
![Zustand](https://img.shields.io/badge/State-Zustand-111827)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Review%20Ready-16A34A)

A polished AI workflow builder for visually composing, connecting, validating, and analyzing pipeline graphs. The project pairs a React + ReactFlow frontend with a lightweight FastAPI backend that returns graph statistics and DAG validity.

![VectorShift Pipeline Builder](docs/screenshots/pipeline-builder.png)

## Project Overview

VectorShift Pipeline Builder is a frontend technical assessment project evolved into a portfolio-quality workflow editor. Users can drag node types from a toolbar onto a ReactFlow canvas, connect them into directed workflows, inspect live graph statistics, and submit the pipeline for backend analysis.

The application is intentionally scoped and production-minded: graph state is centralized in Zustand, node rendering is abstracted through reusable node primitives, ReactFlow configuration is extracted into constants, and validation logic is separated into utilities.

## Features

- Drag-and-drop workflow creation with ReactFlow.
- Smooth node connections with custom edge styling and directional markers.
- Live workflow statistics for node count, connection count, and DAG status.
- Backend pipeline analysis via FastAPI.
- Custom analysis modal with loading, Escape close, focus management, and error fallback.
- Dynamic Text node variable detection using `{{ variable }}` syntax.
- Reusable node architecture for fast extension.
- Premium SaaS-style UI polish with refined spacing, shadows, hierarchy, minimap, and controls.

## Architecture

The application is organized around a small number of clear responsibilities:

- **ReactFlow canvas**: renders nodes, edges, controls, minimap, drop handling, and connection behavior.
- **Zustand store**: owns graph state, ID generation, node changes, edge changes, and connection creation.
- **Node components**: define node-specific UI while sharing layout, handles, icons, and field styling.
- **Constants**: centralize workflow settings, demo graph data, edge configuration, and labels.
- **Utilities**: isolate pure logic such as DAG validation and text-template parsing.
- **FastAPI backend**: receives submitted graph data and returns analysis results.

## Node Types

| Node | Purpose | Handles |
| --- | --- | --- |
| Input | Defines a workflow input value | Output |
| Text | Builds prompt text and detects `{{ variables }}` | Dynamic inputs, output |
| LLM | Represents a language-model processing step | System input, prompt input, response output |
| Output | Defines the workflow output target | Input |
| API | Represents an external API request | URL input, response output |
| Database | Represents a database query step | Query input, result output |
| Email | Represents an email sending step | Recipient input, message input, status output |
| CSV | Represents CSV import | Data output |
| Filter | Represents data filtering | Data input, filtered output |

## DAG Validation

The project validates directed acyclic graph structure in two places:

- **Frontend**: `src/utils/graph.js` computes live DAG status for immediate feedback in the canvas status bar.
- **Backend**: `backend/main.py` validates the submitted graph and returns `is_dag` as part of the analysis response.

Both implementations use indegree tracking and topological traversal to determine whether every node can be visited without encountering a cycle.

## Pipeline Analysis

Clicking **Analyze Pipeline** sends the current graph to:

```text
POST http://127.0.0.1:8000/pipelines/parse
```

Request body:

```json
{
  "nodes": [],
  "edges": []
}
```

Response shape:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

The frontend presents this response in a custom modal rather than using a browser alert, giving the analysis flow a more professional product feel.

## UI Improvements Made

- Upgraded node cards with stronger hierarchy, clearer spacing, improved shadows, and consistent category accents.
- Refined toolbar into a polished component-library style palette.
- Improved workflow metric cards with larger numbers and clearer labels.
- Enhanced DAG status badge with success and error states.
- Tuned ReactFlow canvas background, minimap, controls, edge styling, and connection preview.
- Added an elegant empty canvas state.
- Replaced browser alerts with an accessible in-app modal.
- Improved typography, spacing, borders, radii, and screenshot readiness across the app.

## Project Structure

```text
frontend_technical_assessment/
  backend/
    main.py

  frontend/
    public/
    docs/
      screenshots/
        pipeline-builder.png
    src/
      constants/
        nodes.js             Demo graph and node ordering constants
        workflow.js          ReactFlow, edge, minimap, status, and API constants
      nodes/
        BaseNode.js          Shared node shell, icons, handles, sizing
        NodeField.js         Reusable node form-field wrapper
        StaticNode.js        Shared abstraction for description-only nodes
        inputNode.js
        outputNode.js
        textNode.js
        llmNode.js
        apiNode.js
        databaseNode.js
        emailNode.js
        csvNode.js
        filterNode.js
      utils/
        graph.js             DAG validation helper
        textTemplates.js     Text variable extraction helper
      App.js                 Application shell
      draggableNode.js       Toolbar drag source
      index.css              Design system and ReactFlow styling
      index.js               React entry point
      nodeMeta.js            Node labels, icons, and color tones
      store.js               Zustand graph store
      submit.js              Analysis request and modal
      toolbar.js             Node palette
      ui.js                  ReactFlow canvas and workflow status
    package.json
```

## Setup Instructions

Requirements:

- Node.js 16+ or 18+
- npm
- Python 3.10+
- FastAPI and Uvicorn for the backend

Run the backend and frontend in separate terminal sessions.

## Backend Setup

From the repository root:

```bash
cd backend
```

Install backend dependencies if needed:

```bash
pip install fastapi uvicorn pydantic
```

Start the API server:

```bash
uvicorn main:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

## Frontend Setup

From the `frontend` directory:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

## Technologies Used

- **React** for component-driven UI.
- **ReactFlow** for graph rendering, node handles, connections, minimap, and controls.
- **Zustand** for lightweight graph state management.
- **Lucide React** for consistent interface icons.
- **FastAPI** for backend pipeline parsing and analysis.
- **Pydantic** for request-body modeling.
- **CSS** for the custom design system and ReactFlow overrides.

## Design Decisions

- **Reusable node shell**: `BaseNode` keeps layout, handle rendering, icon placement, and sizing consistent across all node types.
- **Static node abstraction**: `StaticNode` removes duplicate markup from simple nodes such as API, Database, CSV, Email, Filter, and LLM.
- **Separated constants**: workflow styling, edge options, API URL, demo data, and toolbar order live outside component files for easier review and extension.
- **Pure utility functions**: DAG validation and template parsing are framework-independent and easy to test.
- **Zustand over heavier state tools**: graph state is local to the workflow builder and benefits from a small, direct store.
- **Server confirmation for analysis**: the backend remains the source of truth for submitted pipeline analysis, while frontend validation provides immediate feedback.
- **No unnecessary dependencies**: the UI polish is achieved with existing libraries and CSS rather than adding a component framework.

## Future Improvements

- Add unit tests for DAG validation and text-template variable extraction.
- Add integration tests for drag, connect, and analyze workflows.
- Persist workflows to local storage or a backend database.
- Add node deletion shortcuts and keyboard-first canvas commands.
- Add import/export for workflow JSON.
- Add richer node configuration panels for API, database, and LLM nodes.
- Add backend validation for malformed edges and missing node references.
- Add TypeScript for stronger node and edge contracts.

