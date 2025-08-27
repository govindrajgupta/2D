import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isEmailModalVisibleAtom, emailAtom } from "../store";

export default function EmailModal() {
  const [isVisible, setIsVisible] = useAtom(isEmailModalVisibleAtom);
  const email = useAtomValue(emailAtom);

  const [onCopyMessage, setOnCopyMessage] = useState("");

  const buttons = [
    {
      id: 0,
      name: "Yes",
      handler: () => {
        navigator.clipboard.writeText(email);
        setOnCopyMessage("Email copied to clipboard!");
      },
    },
    {
      id: 1,
      name: "No",
      handler: () => {
        setIsVisible(false);
      },
    },
  ];

  return (
    isVisible && (
      <div className="modal">
        <div className="modal-content girly-modal">
          <div className="modal-header">
            <span className="modal-emoji">📧</span>
            <h1>Ready to connect? 💌</h1>
            <span className="modal-emoji">✨</span>
          </div>
          <div className="modal-description">
            <p>Would you like to copy my email for easy contact? 💕</p>
            <span className="link-display">{email}</span>
            {onCopyMessage && (
              <p className="copy-success">{onCopyMessage} 🎉</p>
            )}
          </div>
          <div className="modal-btn-container">
            {buttons.map((button) => (
              <button
                key={button.id}
                className={button.name === "Yes" ? "modal-btn girly-btn" : "modal-btn girly-btn close-btn"}
                onClick={button.handler}
              >
                <span className="btn-icon">{button.name === "Yes" ? "📋" : "💖"}</span>
                {button.name === "Yes" ? "Copy email" : "Not now"}
                <span className="btn-sparkle">{button.name === "Yes" ? "✨" : "🌸"}</span>
              </button>
            ))}
          </div>
          <div className="modal-decoration">
            <span className="floating-heart">💕</span>
            <span className="floating-star">⭐</span>
            <span className="floating-butterfly">🦋</span>
          </div>
        </div>
      </div>
    )
  );
}
