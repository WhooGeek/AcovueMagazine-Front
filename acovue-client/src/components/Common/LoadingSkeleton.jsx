import "./LoadingSkeleton.css";

export default function LoadingSkeleton({ variant = "list", count = 4 }) {
  if (variant === "detail") {
    return (
      <section className="skeleton-wrap">
        <div className="skeleton-detail-title skeleton-shimmer" />
        <div className="skeleton-detail-meta skeleton-shimmer" />
        <div className="skeleton-detail-content skeleton-shimmer" />
        <div className="skeleton-detail-content short skeleton-shimmer" />
      </section>
    );
  }

  return (
    <section className="skeleton-wrap">
      {Array.from({ length: count }).map((_, idx) => (
        <article className="skeleton-item" key={idx}>
          <div className="skeleton-thumb skeleton-shimmer" />
          <div className="skeleton-lines">
            <div className="skeleton-line lg skeleton-shimmer" />
            <div className="skeleton-line md skeleton-shimmer" />
            <div className="skeleton-line sm skeleton-shimmer" />
          </div>
        </article>
      ))}
    </section>
  );
}
