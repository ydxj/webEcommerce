import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { backendUrl } from "../../env";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const spinnerRef = useRef(null);
  const cardRef = useRef(null);

  const EmailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getPasswordChecks = (password) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  const [passwordChecks, setPasswordChecks] = useState(getPasswordChecks(''));

  useEffect(() => {
    setPasswordChecks(getPasswordChecks(password));
  }, [password]);

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

  useEffect(() => {
    gsap.fromTo(cardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!EmailRegx.test(email)) return setError('Invalid email format.');
    if (password !== confirmPassword) return setError('Passwords do not match.');

    const allValid = Object.values(getPasswordChecks(password)).every(Boolean);
    if (!allValid) return setError('Password must meet all the criteria.');

    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });
      if (res.data.success) {
        window.location.href = '/login';
      } else {
        setError(res.data.message || 'Registration failed. Please try again.');
      }
    } catch {
      setError('An error occurred while registering. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div ref={cardRef} className="card p-4 shadow-lg rounded-4" style={{ maxWidth: 500, width: "100%", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Create an Account</h2>
          <p className="text-muted small">Join us and explore great products!</p>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {password && (
              <ul className="list-unstyled small mt-2">
                <li className={passwordChecks.length ? "text-success" : "text-muted"}>{passwordChecks.length ? '✅' : '❌'} At least 8 characters</li>
                <li className={passwordChecks.uppercase ? "text-success" : "text-muted"}>{passwordChecks.uppercase ? '✅' : '❌'} One uppercase letter</li>
                <li className={passwordChecks.lowercase ? "text-success" : "text-muted"}>{passwordChecks.lowercase ? '✅' : '❌'} One lowercase letter</li>
                <li className={passwordChecks.number ? "text-success" : "text-muted"}>{passwordChecks.number ? '✅' : '❌'} One number</li>
                <li className={passwordChecks.special ? "text-success" : "text-muted"}>{passwordChecks.special ? '✅' : '❌'} One special character</li>
              </ul>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary rounded-pill fw-semibold py-2" disabled={loading}>
              {loading ? (
                <>
                  <span ref={spinnerRef} className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-3 small text-muted">
          Already have an account? <a href="/login" className="text-decoration-none">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
