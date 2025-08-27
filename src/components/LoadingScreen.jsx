import { useEffect, useState } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start text animation after a brief delay
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 300);

    // Simulate loading progress with smoother increments
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          // Start fade out animation with smoother timing
          setTimeout(() => {
            setFadeOut(true);
            // Complete loading after fade animation
            setTimeout(() => {
              onLoadingComplete();
            }, 1200); // Increased fade time for smoother transition
          }, 1000);
          return 100;
        }
        // Smoother progress increments
        return prev + Math.random() * 8 + 3;
      });
    }, 120); // Faster update interval for smoother progress

    return () => {
      clearTimeout(textTimer);
      clearInterval(progressTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className={`welcome-text ${showText ? 'visible' : ''}`}>
          <h1 className="loading-title">Welcome to</h1>
          <h2 className="loading-subtitle">Anshi Sharma Portfolio</h2>
          <div className="loading-tagline">UI/UX Designer</div>
        </div>
        
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div 
              className="loading-progress-fill" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="loading-percentage">{Math.round(Math.min(progress, 100))}%</div>
        </div>
        
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="loading-decoration decoration-1"></div>
      <div className="loading-decoration decoration-2"></div>
      <div className="loading-decoration decoration-3"></div>
    </div>
  );
};

export default LoadingScreen;
