import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isPhoneModalVisibleAtom, phoneAtom } from "../store";

export default function PhoneModal() {
  const [isVisible, setIsVisible] = useAtom(isPhoneModalVisibleAtom);
  const phone = useAtomValue(phoneAtom);

  const [onCopyMessage, setOnCopyMessage] = useState("");

  const buttons = [
    {
      id: 0,
      name: "Call",
      handler: () => {
        window.open(`tel:${phone}`, "_self");
        setIsVisible(false);
      },
    },
    {
      id: 1,
      name: "Copy",
      handler: () => {
        navigator.clipboard.writeText(phone);
        setOnCopyMessage("Phone number copied to clipboard!");
      },
    },
    {
      id: 2,
      name: "Close",
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
            <span className="modal-emoji">📞</span>
            <h1>Let&apos;s talk! 💕</h1>
            <span className="modal-emoji">✨</span>
          </div>
          <div className="modal-description">
            <p>Ready to connect? You can call me directly or copy my number! 🌟</p>
            <span className="link-display">{phone}</span>
            {onCopyMessage && (
              <p className="copy-success">{onCopyMessage} 🎉</p>
            )}
          </div>
          <div className="modal-btn-container">
            {buttons.map((button) => (
              <button
                key={button.id}
                className={button.name === "Close" ? "modal-btn girly-btn close-btn" : "modal-btn girly-btn"}
                onClick={button.handler}
              >
                <span className="btn-icon">
                  {button.name === "Call" ? "📞" : button.name === "Copy" ? "📋" : "💖"}
                </span>
                {button.name}
                <span className="btn-sparkle">
                  {button.name === "Call" ? "✨" : button.name === "Copy" ? "💫" : "🌸"}
                </span>
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
