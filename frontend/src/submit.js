import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { shallow } from 'zustand/shallow';
import { ANALYSIS_API_URL } from './constants/workflow';
import { useStore } from './store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(ANALYSIS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
        }),
      });

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
      setAnalysisResult({
        num_nodes: nodes.length,
        num_edges: edges.length,
        is_dag: false,
        error: 'Backend connection failed.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [edges, nodes]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(() => {
      setAnalysisResult(null);
      setIsClosing(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (!analysisResult) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return;
      }

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [analysisResult, closeModal]);

  return (
    <>
      <div className="submit-bar">
        <button
          className="primary-action"
          onClick={handleSubmit}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading && <span className="button-spinner" aria-hidden="true" />}
          <span>{isLoading ? 'Analyzing...' : 'Analyze Pipeline'}</span>
        </button>
      </div>

      {analysisResult && (
        <div
          className={`modal-backdrop ${isClosing ? 'modal-backdrop--closing' : ''}`}
          role="presentation"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className={`analysis-modal ${isClosing ? 'analysis-modal--closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="analysis-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="analysis-modal__header">
              <p>Pipeline Analysis</p>
              <h2 id="analysis-modal-title">Pipeline Analysis</h2>
            </div>

            {analysisResult.error && (
              <p className="analysis-modal__error">{analysisResult.error}</p>
            )}

            <div
              className={`analysis-status ${
                analysisResult.is_dag ? 'analysis-status--valid' : 'analysis-status--invalid'
              }`}
            >
              {analysisResult.is_dag ? (
                <CheckCircle2 size={17} strokeWidth={2.3} aria-hidden="true" />
              ) : (
                <XCircle size={17} strokeWidth={2.3} aria-hidden="true" />
              )}
              {analysisResult.is_dag ? 'Valid DAG' : 'Invalid DAG'}
            </div>

            <div className="analysis-metrics">
              <div className="analysis-metric-card">
                <strong>{analysisResult.num_nodes}</strong>
                <span>Nodes</span>
              </div>
              <div className="analysis-metric-card">
                <strong>{analysisResult.num_edges}</strong>
                <span>Connections</span>
              </div>
              <div className="analysis-metric-card analysis-metric-card--wide">
                <strong>{analysisResult.is_dag ? 'Valid DAG' : 'Invalid DAG'}</strong>
                <span>Pipeline Status</span>
              </div>
            </div>

            <div className="analysis-modal__footer">
              <button ref={closeButtonRef} className="modal-close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
