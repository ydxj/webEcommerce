import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { backendUrl } from "../../env";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const spinnerRef = useRef(null);
  const cardRef = useRef(null);

  const EmailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!EmailRegx.test(email)) {
      setError('Invalid email format.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password
      });

      if (response.data.auth) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred while logging in. Please try again.');
    }

    setLoading(false);
  };

  // Spinner animation
  useEffect(() => {
    if (loading && spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        repeat: -1,
        ease: "linear",
        duration: 1,
      });
    } else {
      gsap.killTweensOf(spinnerRef.current);
      gsap.set(spinnerRef.current, { rotation: 0 });
    }
  }, [loading]);

  // Card animation on mount
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div ref={cardRef} className="card shadow-lg p-4 rounded-4" style={{ maxWidth: 420, width: "100%", background: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="text-muted">Please log in to your account</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary rounded-pill fw-semibold py-2" disabled={loading}>
              {loading ? (
                <>
                  <span
                    ref={spinnerRef}
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-3 small text-muted">
          <p className="mb-1">
            Don't have an account? <a href="/register" className="text-decoration-none">Register here</a>
          </p>
          <p>
            Forgot password? <a href="/reset-password" className="text-decoration-none">Reset it here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
