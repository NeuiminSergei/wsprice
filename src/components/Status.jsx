import Loader from './Loader';

export default function Status({ state, emptyText, children }) {
  if (state.status === 'idle') return null;
  if (state.status === 'loading') return <Loader />;
  if (state.status === 'failed') return <div className="alert alert-danger">{state.error}</div>;
  if (state.items.length === 0) return <div className="alert alert-warning">{emptyText}</div>;
  return children;
}
