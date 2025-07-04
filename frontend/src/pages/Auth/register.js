import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { backendUrl } from "../../env";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const spinnerRef = useRef(null);

  const EmailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password condition checks
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

  // GSAP spinner animation
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!EmailRegx.test(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const checks = getPasswordChecks(password);
    const allValid = Object.values(checks).every(Boolean);
    if (!allValid) {
      setError('Password must meet all the criteria.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password
      });

      if (response.data.success) {
        window.location.href = '/login';
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while registering. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Register</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                {password && (
                  <ul className="mt-2 list-unstyled small">
                    <li className={passwordChecks.length ? 'text-success' : 'text-muted'}>
                      {passwordChecks.length ? '✅' : '❌'} At least 8 characters
                    </li>
                    <li className={passwordChecks.uppercase ? 'text-success' : 'text-muted'}>
                      {passwordChecks.uppercase ? '✅' : '❌'} One uppercase letter
                    </li>
                    <li className={passwordChecks.lowercase ? 'text-success' : 'text-muted'}>
                      {passwordChecks.lowercase ? '✅' : '❌'} One lowercase letter
                    </li>
                    <li className={passwordChecks.number ? 'text-success' : 'text-muted'}>
                      {passwordChecks.number ? '✅' : '❌'} One number
                    </li>
                    <li className={passwordChecks.special ? 'text-success' : 'text-muted'}>
                      {passwordChecks.special ? '✅' : '❌'} One special character
                    </li>
                  </ul>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span
                          ref={spinnerRef}
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Registering...
                      </>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
