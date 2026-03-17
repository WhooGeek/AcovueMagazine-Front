import "./LoginRequiredModal.css";
import logoImage from "../../assets/logoImage.png";

export default function LoginRequiredModal({
  open,
  title = "로그인이 필요합니다!",
  description = "이 기능을 사용하려면 먼저 로그인을 해주세요.",
  confirmText = "로그인하러 가기",
  cancelText = "닫기",
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="login-required-modal-overlay">
      <div className="login-required-modal">
        <img
          src={logoImage}
          alt="렛츠젠츠 아이콘"
          className="login-required-modal-icon"
        />
        <p className="login-required-modal-title">{title}</p>
        <p className="login-required-modal-description">{description}</p>

        <div className="login-required-modal-buttons">
          <button className="login-required-modal-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
          <button className="login-required-modal-cancel" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
