import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { backendUrl } from "../../env";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const spinnerRef = useRef(null);

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

  // Animate the spinner when loading
  useEffect(() => {
    if (loading && spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        repeat: -1,
        ease: "linear",
        duration: 1
      });
    } else {
      gsap.killTweensOf(spinnerRef.current);
      gsap.set(spinnerRef.current, { rotation: 0 });
    }
  }, [loading]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
                <h2 className="card-title mb-4 text-center">Login</h2>
              
                {error && (
                    <div className="alert alert-danger" role="alert">
                    {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
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
                    </div>

                    <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (
                        <>
                            <span
                                ref={spinnerRef}
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                                style={{ display: 'inline-block', marginRight: '8px' }}
                            ></span>
                            Logging in...
                        </>
                        ) : (
                        'Login'
                        )}
                    </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mb-0">Don't have an account? <a href="/register">Register here</a></p>
                </div>
                <div className="text-center mt-3">
                    <p className="mb-0">Forgot your password? <a href="/reset-password">Reset it here</a></p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
