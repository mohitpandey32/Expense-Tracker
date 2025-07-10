import { useState } from "react";
import { DollarSign, User, Mail, Lock, TrendingUp, PiggyBank, CreditCard } from "lucide-react";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

   
    onSignup(name);
  };

  return (
    <div className="signup-container">
      <div className="background-decoration">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      <div className="signup-card">
        <div className="signup-header">
          <div className="logo-container">
            <DollarSign className="logo-icon" />
          </div>
          <h2 className="signup-title">ExpenseTracker</h2>
          <p className="signup-subtitle">Start your financial journey today</p>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-container feature-emerald">
              <TrendingUp className="feature-icon" />
            </div>
            <p className="feature-text">Track Expenses</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-container feature-teal">
              <PiggyBank className="feature-icon" />
            </div>
            <p className="feature-text">Save Money</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-container feature-cyan">
              <CreditCard className="feature-icon" />
            </div>
            <p className="feature-text">Manage Budget</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <div className="input-container">
              <User className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleForm}
                className="form-input"
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleForm}
                className="form-input"
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleForm}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        <div className="signup-footer">
          <p className="footer-text">
            Already have an account?{" "}
            <button className="signin-link">Sign In</button>
          </p>
        </div>
      </div>

      <div className="trust-indicators">
        <p className="trust-text">Trusted by thousands of users</p>
        <div className="trust-badges">
          <div className="trust-badge">
            <div className="trust-dot trust-emerald"></div>
            <span className="trust-label">Secure</span>
          </div>
          <div className="trust-badge">
            <div className="trust-dot trust-teal"></div>
            <span className="trust-label">Private</span>
          </div>
          <div className="trust-badge">
            <div className="trust-dot trust-cyan"></div>
            <span className="trust-label">Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
}
