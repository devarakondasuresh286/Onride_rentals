import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <section className="auth-wrapper">
      <form className="auth-card">
        <h1>Create your account</h1>
        <p>Join Onride Rentals today</p>

        <div className="role-row">
          <span>I want to</span>
          <label>
            <input type="radio" name="role" defaultChecked /> Rent a vehicle
          </label>
          <label>
            <input type="radio" name="role" /> List my vehicle
          </label>
        </div>

        <div className="name-row">
          <div>
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" type="text" placeholder="John" />
          </div>
          <div>
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" type="text" placeholder="Doe" />
          </div>
        </div>

        <label htmlFor="signup-email">Email</label>
        <input id="signup-email" type="email" placeholder="you@example.com" />

        <label htmlFor="signup-password">Password</label>
        <input id="signup-password" type="password" placeholder="Create password" />

        <button type="submit" className="btn btn-primary block">
          Create Account
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
}

export default SignupPage;
