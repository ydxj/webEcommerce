import { useEffect, useRef } from "react";
import "./notfound.css";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const eyesRef = useRef([]);
  const navigate = useNavigate(); // ✅ Corrected typo

  useEffect(() => {
    const handleMouseMove = (e) => {
      eyesRef.current.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const x = Math.cos(angle) * 10;
        const y = Math.sin(angle) * 10;

        gsap.to(eye, { x, y, duration: 0.2 });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.from(".ghost, .text-404, .back-btn", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="notfound-container">
      <div className="ghost">
        <div className="face">
          <div className="eye" ref={(el) => (eyesRef.current[0] = el)}></div>
          <div className="eye" ref={(el) => (eyesRef.current[1] = el)}></div>
        </div>
      </div>
      <h1 className="text-404">404</h1>
      <p className="text-muted">Oops! Page not found.</p>
      <button className="back-btn" onClick={() => navigate('/')}>
        ⟵ Go Home
      </button>
    </div>
  );
}
