import { useAtom, useAtomValue } from "jotai";
import {
  isSocialModalVisibleAtom,
  selectedLinkAtom,
  selectedLinkDescriptionAtom,
} from "../store";

export default function SocialModal() {
  const [isVisible, setIsVisible] = useAtom(isSocialModalVisibleAtom);
  const selectedLink = useAtomValue(selectedLinkAtom);
  const selectedLinkDescription = useAtomValue(selectedLinkDescriptionAtom);

  const buttons = [
    {
      id: 0,
      name: "Yes",
      handler: () => {
        window.open(selectedLink, "_blank");
        setIsVisible(false);
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
            <span className="modal-emoji">🌐</span>
            <h1>Ready to explore? ✨</h1>
            <span className="modal-emoji">💫</span>
          </div>
          <div className="modal-description">
            <p>Let&apos;s visit this amazing link together! 🚀</p>
            <span className="link-display">{selectedLink}</span>
            <p className="link-description">{selectedLinkDescription}</p>
          </div>
          <div className="modal-btn-container">
            {buttons.map((button) => (
              <button
                key={button.id}
                className={button.name === "Yes" ? "modal-btn girly-btn" : "modal-btn girly-btn close-btn"}
                onClick={button.handler}
              >
                <span className="btn-icon">{button.name === "Yes" ? "🚀" : "💖"}</span>
                {button.name === "Yes" ? "Yes, let&apos;s go!" : "Maybe later"}
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
