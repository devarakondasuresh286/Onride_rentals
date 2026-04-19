import Button from "../components/Button";

function SignupPage() {
  return (
    <section className="auth-wrapper">
      <form className="auth-card">
        <h1>Signup</h1>
        <p>Basic signup layout for user onboarding flow.</p>
        <label htmlFor="name">Full Name</label>
        <input id="name" type="text" placeholder="Your name" />
        <label htmlFor="signup-email">Email</label>
        <input id="signup-email" type="email" placeholder="you@example.com" />
        <label htmlFor="signup-password">Password</label>
        <input id="signup-password" type="password" placeholder="Create password" />
        <Button type="submit">Create Account</Button>
      </form>
    </section>
  );
}

export default SignupPage;
