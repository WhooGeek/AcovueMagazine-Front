import { Link } from "react-router-dom";
import "./ReviewPage.css";

export default function ReviewPage() {
  return (
    <section className="review-pending">
      <h1 className="review-pending-title">REVIEW 페이지는 아직 준비 중입니다</h1>
      <p className="review-pending-description">
        공연 원정 후기와 꿀팁 콘텐츠를 더 완성도 있게 준비하고 있어요.
      </p>
      <div className="review-pending-actions">
        <Link className="review-link primary" to="/">
          홈으로 이동
        </Link>
        <Link className="review-link" to="/community?page=1&limit=10&type=COMMUNITY">
          커뮤니티 보러가기
        </Link>
      </div>
    </section>
  );
}
