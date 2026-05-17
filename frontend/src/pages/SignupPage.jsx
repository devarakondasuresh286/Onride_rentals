import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <section className="signup-shell">
      <div className="signup-card">
        <h1>Create your account</h1>
        <p>Join Onride Rentals today</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            First Name
            <input type="text" placeholder="John" />
          </label>
          <label>
            Last Name
            <input type="text" placeholder="Doe" />
          </label>
          <label className="full">
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label className="full">
            Password
            <input type="password" placeholder="******" />
          </label>
          <button className="book-btn full" type="submit">
            Create Account
          </button>
        </form>
        <p className="compact-top">
          Already have an account? <button className="text-link" onClick={() => navigate("/login")}>Log in</button>
        </p>
      </div>
    </section>
  );
}

export default SignupPage;
