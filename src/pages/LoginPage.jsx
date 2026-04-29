import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <section className="auth-wrapper">
      <form className="auth-card">
        <h1>Welcome back</h1>
        <p>Log in to your Onride account</p>

        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" placeholder="you@example.com" />

        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" placeholder="Enter password" />

        <a href="#" className="forgot-link">
          Forgot password?
        </a>

        <button type="submit" className="btn btn-primary block">
          Log in
        </button>

        <p className="auth-switch">
          Do not have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </section>
  );
}

export default LoginPage;
