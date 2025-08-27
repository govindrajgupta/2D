import { useAtomValue, useAtom } from "jotai";
import { isProjectModalVisibleAtom, chosenProjectDataAtom } from "../store";

export default function ProjectModal() {
  const projectData = useAtomValue(chosenProjectDataAtom);
  const [isVisible, setIsVisible] = useAtom(isProjectModalVisibleAtom);

  return (
    isVisible && (
      <div className="modal">
        <div className="modal-content girly-modal">
          <div className="modal-header">
            <span className="modal-emoji">💼</span>
            <h1>{projectData.title}</h1>
            <span className="modal-emoji">✨</span>
          </div>
          <div className="modal-description">
            <p>Explore this amazing project and see the magic behind it! 🌟</p>
          </div>
          <div className="modal-btn-container">
            {projectData.links.map((linkData) => (
              <button
                key={linkData.id}
                className={"modal-btn girly-btn"}
                onClick={() => {
                  window.open(linkData.link, "_blank");
                }}
              >
                <span className="btn-icon">🔗</span>
                {linkData.name}
                <span className="btn-sparkle">✨</span>
              </button>
            ))}
            <button
              className={"modal-btn girly-btn close-btn"}
              onClick={() => {
                setIsVisible(false);
              }}
            >
              <span className="btn-icon">💖</span>
              Close
              <span className="btn-sparkle">🌸</span>
            </button>
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
