import "./PageState.css";

export default function PageState({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <section className="page-state">
      <h2 className="page-state-title">{title}</h2>
      {description && <p className="page-state-description">{description}</p>}
      {actionLabel && onAction && (
        <button className="page-state-button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </section>
  );
}
