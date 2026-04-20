import Button from "../components/Button";

function LoginPage() {
  return (
    <section className="auth-wrapper">
      <form className="auth-card">
        <h1>Login</h1>
        <p>Basic authentication UI started in Week 3.</p>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" placeholder="you@example.com" />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" placeholder="Enter password" />
        <Button type="submit">Sign In</Button>
      </form>
    </section>
  );
}

export default LoginPage;
